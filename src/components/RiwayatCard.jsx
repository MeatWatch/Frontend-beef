import React, { useState } from "react";
import { FiEye, FiTrash2, FiClock } from "react-icons/fi";

const RiwayatCard = ({ item, onViewDetails, onDelete }) => {
  const [showReminder, setShowReminder] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [reminderTime, setReminderTime] = useState(""); // Added reminderTime state

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
        {/* Desktop Layout (horizontal) */}
        <div className="d-none d-md-flex">
          <div className="flex-shrink-0" style={{ width: "250px" }}>
            <img
              src={item.image_url || "/placeholder-meat.jpg"}
              className="img-fluid h-100"
              alt={item.meat_type}
              style={{
                objectFit: "cover",
                borderTopLeftRadius: "0.25rem",
                borderBottomLeftRadius: "0.25rem",
              }}
            />
          </div>
          <div className="card-body d-flex flex-column justify-content-between">
            <div>
              <h5 className="card-title">
                {item.meat_type} -{" "}
                <span className={getResultClass(item.result)}>
                  {item.result}
                </span>
              </h5>
              <p className="card-text text-muted small mb-2">
                {formatDate(item.analyzed_at)}
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

            <div className="d-flex justify-content-between gap-2">
              <button
                onClick={() => onViewDetails(item)}
                className="btn btn-sm btn-outline-primary d-flex align-items-center justify-content-center flex-grow-1"
              >
                <FiEye className="me-1" /> Detail
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center flex-grow-1"
              >
                <FiTrash2 className="me-1" /> Hapus
              </button>
              <button
                onClick={() => {
                  setSelectedItem(item);
                  setShowReminder(true);
                }}
                className="btn btn-sm btn-outline-warning d-flex align-items-center justify-content-center flex-grow-1"
              >
                <FiClock className="me-1" /> Reminder
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Layout (vertical) */}
        <div className="d-md-none">
          <img
            src={item.image_url || "/placeholder-meat.jpg"}
            className="card-img-top"
            alt={item.meat_type}
            style={{ height: "180px", objectFit: "cover" }}
          />
          <div className="card-body">
            <h5 className="card-title">
              {item.meat_type} -{" "}
              <span className={getResultClass(item.result)}>{item.result}</span>
            </h5>
            <p className="card-text text-muted small mb-2">
              {formatDate(item.analyzed_at)}
            </p>

            <div className="d-flex align-items-center mb-3">
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

            <div className="d-flex justify-content-between gap-2">
              <button
                onClick={() => onViewDetails(item)}
                className="btn btn-sm btn-outline-primary d-flex align-items-center justify-content-center flex-grow-1"
              >
                <FiEye className="me-1" /> Detail
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center flex-grow-1"
              >
                <FiTrash2 className="me-1" /> Hapus
              </button>
              <button
                onClick={() => {
                  setSelectedItem(item);
                  setShowReminder(true);
                }}
                className="btn btn-sm btn-outline-warning d-flex align-items-center justify-content-center flex-grow-1"
              >
                <FiClock className="me-1" /> Reminder
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reminder Modal */}
      {showReminder && (
        <div
          className="modal"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.5)",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1050,
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
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
                  onClick={handleSetReminder} // Fixed: removed the arrow function
                >
                  Set Reminder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Helper functions for styling
const getResultClass = (result) => {
  switch (result.toLowerCase()) {
    case "fresh":
      return "text-success";
    case "slightly spoiled":
      return "text-warning";
    case "spoiled":
      return "text-danger";
    default:
      return "text-primary";
  }
};

const getConfidenceClass = (confidence) => {
  if (confidence > 0.8) return "bg-success";
  if (confidence > 0.5) return "bg-warning";
  return "bg-danger";
};

export default RiwayatCard;
