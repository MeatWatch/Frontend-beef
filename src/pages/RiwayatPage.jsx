import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner, Modal, Button } from "react-bootstrap";
import RiwayatCard from "../components/RiwayatCard";
import { mockApi } from "../api/mockApi";

const RiwayatPage = () => {
  const [classifications, setClassifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedClassification, setSelectedClassification] = useState(null);

  const navigate = useNavigate();

  // Helper function to safely parse dates
  const parseDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? new Date() : date; // Return current date if invalid
    } catch {
      return new Date(); // Return current date if parsing fails
    }
  };

  useEffect(() => {
    const fetchClassifications = async () => {
      try {
        setIsLoading(true);
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.user_id || 1;

        // LOCAL MODE
        let data = await mockApi.getUserClassifications(userId);

        // Ensure dates are valid
        data = data.map((item) => ({
          ...item,
          created_at: parseDate(
            item.created_at || item.analyzed_at || new Date()
          ),
        }));

        setClassifications(data);

        // SERVER MODE - Uncomment when ready
        /*
        const response = await axios.get("http://localhost:3001/api/classifications", {
          params: { user_id: userId },
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        const validData = response.data.map(item => ({
          ...item,
          created_at: parseDate(item.created_at)
        }));
        setClassifications(validData);
        */
      } catch (err) {
        console.error("Failed to load classifications:", err);
        setError(
          err.response?.data?.message ||
            "Failed to load data. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchClassifications();
  }, []);

  const handleViewDetails = (classification) => {
    setSelectedClassification(classification);
  };

  const handleDelete = async (id) => {
    try {
      // LOCAL MODE
      setClassifications(classifications.filter((item) => item.id !== id));

      // SERVER MODE
      /*
      await axios.delete(`http://localhost:3001/api/classifications/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setClassifications(classifications.filter(item => item.id !== id));
      */
    } catch (err) {
      console.error("Delete failed:", err);
      alert(
        err.response?.data?.message || "Failed to delete. Please try again."
      );
    }
  };

  // Format date for display
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
                  key={classification.id}
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

      {/* Classification Detail Modal */}
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
                <strong>Result:</strong> {selectedClassification.result}
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
              {/* {selectedClassification.image_url && (
                // <div className="mt-3">
                //   <p>
                //     <strong>Image:</strong>
                //   </p>
                //   <img
                //     src={selectedClassification.image_url}
                //     alt="Classification"
                //     style={{
                //       maxWidth: "300px",
                //       width: "100%",
                //       borderRadius: "8px",
                //       display: "inline-block",
                //     }}
                //   />
                // </div>
              )} */}
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
