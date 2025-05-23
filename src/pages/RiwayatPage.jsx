import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Tambahkan ini
// import axios from "axios";  // <-- Uncomment when using real server
import { Spinner, Modal, Button } from "react-bootstrap";
import RiwayatCard from "../components/RiwayatCard";

import { mockApi } from "../api/mockApi";

const RiwayatPage = () => {
  const [riwayat, setRiwayat] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const navigate = useNavigate(); // <-- Inisialisasi navigate

  useEffect(() => {
    const fetchRiwayat = async () => {
      try {
        setIsLoading(true);

        // ==============================================
        // LOCAL MODE - Using mock data
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.user_id || 1;
        const data = await mockApi.getClassificationHistory(userId);
        setRiwayat(data);
        // ==============================================

        // ==============================================
        // SERVER MODE - Uncomment when using real server
        /*
        const response = await axios.get("http://localhost:3001/api/history", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setRiwayat(response.data);
        */
        // ==============================================
      } catch (err) {
        console.error("Failed to load history:", err);
        setError(
          err.response?.data?.message ||
            "Failed to load history data. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchRiwayat();
  }, []);

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    console.log("Viewing details for:", item);
    // Here you can implement a modal or navigation to detail page
  };

  const handleDelete = async (id) => {
    try {
      // ==============================================
      // LOCAL MODE - Just remove from state
      setRiwayat(riwayat.filter((item) => item.id !== id));
      // ==============================================

      // ==============================================
      // SERVER MODE - Uncomment when using real server
      /*
      await axios.delete(`http://localhost:3001/api/history/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setRiwayat(riwayat.filter((item) => item.id !== id));
      */
      // ==============================================
    } catch (err) {
      console.error("Failed to delete history:", err);
      alert(
        err.response?.data?.message ||
          "Failed to delete history. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen py-4 pt-5 bg-light animate__animated animate__fadeInUp animate__delay-0.5s">
      {" "}
      {/* Added pt-20 for navbar spacing */}
      <div className="pt-5">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 animate__animated animate__fadeInUp animate__delay-1s">
            Scan History
          </h1>
          <p className="mt-2 text-lg text-gray-600 animate__animated animate__fadeInUp animate__delay-1s">
            List of meat freshness inspection results
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <div className="bg-red-50 text-red-700 p-4 rounded-lg inline-block">
              {error}
            </div>
          </div>
        ) : riwayat.length > 0 ? (
          <div className="p-4 space-y-6 ">
            {" "}
            {/* Changed container to space-y-6 for better spacing */}
            {riwayat
              .sort((a, b) => new Date(b.analyzed_at) - new Date(a.analyzed_at))
              .map((item) => (
                <RiwayatCard
                  key={item.id}
                  item={item}
                  onViewDetails={handleViewDetails}
                  onDelete={handleDelete}
                />
              ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-blue-50 text-blue-700 p-6 rounded-xl inline-block">
              <p className="text-lg">No scan history yet.</p>
              <p className="mt-2 text-sm">
                Start scanning your meat to see history here.
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center mt-10 ">
        <button onClick={() => navigate("/scan")} className="btn btn-danger">
          ← Back to Scan
        </button>
      </div>
      {/* detail */}
      <Modal
        show={!!selectedItem}
        onHide={() => setSelectedItem(null)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Detail Pemeriksaan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <>
              <p>
                <strong>Jenis Daging:</strong> {selectedItem.meat_type}
              </p>
              <p>
                <strong>Hasil:</strong> {selectedItem.result}
              </p>
              <p>
                <strong>Tingkat Keyakinan:</strong>{" "}
                {(selectedItem.confidence * 100).toFixed(2)}%
              </p>
              <p>
                <strong>Tanggal Analisis:</strong>{" "}
                {new Date(selectedItem.analyzed_at).toLocaleString("id-ID")}
              </p>
              <hr />
              <p>
                <strong>Warna:</strong> {selectedItem.details?.color || "-"}
              </p>
              <p>
                <strong>Tekstur:</strong> {selectedItem.details?.texture || "-"}
              </p>
              <p>
                <strong>Bau:</strong> {selectedItem.details?.smell || "-"}
              </p>
              <p>
                <strong>pH Level:</strong>{" "}
                {selectedItem.details?.ph_level || "-"}
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedItem(null)}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RiwayatPage;
