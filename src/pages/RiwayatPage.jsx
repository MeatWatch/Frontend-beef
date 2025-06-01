import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner, Modal, Button } from "react-bootstrap";
import RiwayatCard from "../components/RiwayatCard";
import axios from "axios";

const RiwayatPage = () => {
  const [classifications, setClassifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedClassification, setSelectedClassification] = useState(null);

  const navigate = useNavigate();

  // Helper: parse safe date
  const parseDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? new Date() : date;
    } catch {
      return new Date();
    }
  };

  useEffect(() => {
    const fetchClassifications = async () => {
      try {
        setIsLoading(true);

        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        if (!user || !token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          "http://localhost:3000/classifications/history",
          {
            params: { user_id: user.user_id },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const validData = response.data.data.map((item) => ({
          ...item,
          created_at: parseDate(item.created_at),
        }));
        console.log(response.data);

        setClassifications(validData);
      } catch (err) {
        console.error("Failed to load classifications:", err);

        if (err.response?.status === 401) {
          alert("Session expired. Please login again.");
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        setError(
          err.response?.data?.message ||
            "Failed to load data. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchClassifications();
  }, [navigate]);

  const handleViewDetails = useCallback((classification) => {
    setSelectedClassification(classification);
  }, []);

  const handleDelete = useCallback(
    async (id) => {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this classification?"
      );
      if (!confirmDelete) return;

      try {
        // Uncomment this for actual delete
        /*
        await axios.delete(`http://localhost:3000/classifications/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        */

        setClassifications(classifications.filter((item) => item.id !== id));
      } catch (err) {
        console.error("Delete failed:", err);
        alert(
          err.response?.data?.message || "Failed to delete. Please try again."
        );
      }
    },
    [classifications]
  );

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return date.toLocaleDateString("id-ID", options);
  };

  return (
    <div className="min-h-screen py-4 pt-5 bg-light">
      <div className="pt-5">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            Classification History
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            List of meat classification results
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
        ) : classifications.length > 0 ? (
          <div className="p-4 space-y-6">
            {classifications
              .sort((a, b) => b.created_at - a.created_at)
              .map((classification) => (
                <RiwayatCard
                  key={classification.classifyId}
                  item={{
                    ...classification,
                    analyzed_at: formatDate(classification.created_at),
                  }}
                  onViewDetails={handleViewDetails}
                  onDelete={handleDelete}
                />
              ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-blue-50 text-blue-700 p-6 rounded-xl inline-block">
              <p className="text-lg">No classification results yet.</p>
              <p className="mt-2 text-sm">
                Start scanning your meat to see results here.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-10">
        <button onClick={() => navigate("/scan")} className="btn btn-danger">
          ← Back to Scan
        </button>
      </div>

      {/* Detail Modal */}
      <Modal
        show={!!selectedClassification}
        onHide={() => setSelectedClassification(null)}
        centered
        size="lg"
        dialogClassName="modal-dialog-scrollable custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Classification Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedClassification && (
            <>
              <p>
                <strong>Meat Type:</strong> {selectedClassification.meat_type}
              </p>
              <p>
                <strong>Result:</strong> {selectedClassification.status}
              </p>
              <p>
                <strong>Confidence Level:</strong>{" "}
                {(selectedClassification.confidence * 100).toFixed(2)}%
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {formatDate(selectedClassification.created_at)}
              </p>
              <hr />
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setSelectedClassification(null)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RiwayatPage;
