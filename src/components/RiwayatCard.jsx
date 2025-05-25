import React, { useState } from "react";
import { FiEye, FiTrash2, FiClock } from "react-icons/fi";

const RiwayatCard = ({ item, onViewDetails, onDelete }) => {
  const [showReminder, setShowReminder] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [reminderTime, setReminderTime] = useState("");

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const handleSetReminder = () => {
    if (!reminderTime) {
      alert("Please select a reminder time");
      return;
    }
    console.log(
      `Setting reminder for ${selectedItem.meat_type} at ${reminderTime}`
    );
    setShowReminder(false);
    setReminderTime("");
  };

  return (
    <>
      <div className="card shadow-sm mb-4">
        {/* Combined Layout using Bootstrap responsive classes */}
        <div className="row g-0">
          <div className="col-md-3">
            <img
              src={item.image_url || "/placeholder-meat.jpg"}
              className="img-fluid rounded-start h-100"
              alt={item.meat_type}
              style={{
                objectFit: "cover",
                minHeight: "180px",
                maxHeight: "200px",
                width: "100%",
              }}
            />
          </div>
          <div className="col-md-9">
            <div className="card-body h-100 d-flex flex-column">
              <div>
                <h5 className="card-title">
                  {item.meat_type} -{" "}
                  <span className={getResultClass(item.result)}>
                    {item.result}
                  </span>
                </h5>
                <p className="card-text text-muted small mb-2">
                  {formatDate(item.created_at)}
                </p>

                <div className="d-flex align-items-center mb-2">
                  <div
                    className="progress flex-grow-1 me-2"
                    style={{ height: "8px" }}
                  >
                    <div
                      className={`progress-bar ${getConfidenceClass(
                        item.confidence
                      )}`}
                      role="progressbar"
                      style={{ width: `${item.confidence * 100}%` }}
                    ></div>
                  </div>
                  <small className="text-muted" style={{ minWidth: "40px" }}>
                    {(item.confidence * 100).toFixed(0)}%
                  </small>
                </div>
              </div>

              <div className="mt-auto">
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button
                    onClick={() => onViewDetails(item)}
                    className="btn btn-sm btn-outline-primary"
                  >
                    <FiEye className="me-1" /> Detail
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="btn btn-sm btn-outline-danger"
                  >
                    <FiTrash2 className="me-1" /> Hapus
                  </button>
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setShowReminder(true);
                    }}
                    className="btn btn-sm btn-outline-warning"
                  >
                    <FiClock className="me-1" /> Reminder
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reminder Modal - Using Bootstrap Modal */}
      <div
        className={`modal fade ${showReminder ? "show d-block" : ""}`}
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                <FiClock className="me-2" />
                Set Reminder for {selectedItem?.meat_type}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  setShowReminder(false);
                  setReminderTime("");
                }}
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Reminder Time</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  min={new Date().toISOString().slice(0, 16)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setShowReminder(false);
                  setReminderTime("");
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSetReminder}
              >
                Set Reminder
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Helper functions remain the same
const getResultClass = (result) => {
  if (result.toLowerCase() === "fresh") {
    return "text-success"; // Hijau
  } else {
    return "text-danger"; // Merah
  }
};

const getConfidenceClass = (confidence) => {
  if (confidence > 0.8) return "bg-success";
  if (confidence > 0.5) return "bg-warning";
  return "bg-danger";
};

export default RiwayatCard;
