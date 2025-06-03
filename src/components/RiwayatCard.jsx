import React, { useState } from "react";
import { FiEye } from "react-icons/fi";

const RiwayatCard = ({ item, onViewDetails, onDelete }) => {
  const [showReminder, setShowReminder] = useState(false);
  const [reminderTime, setReminderTime] = useState("");

  const formatDate = (date) => {
    const adjustedDate = new Date(date);
    adjustedDate.setHours(adjustedDate.getHours() - 7);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };

    return adjustedDate.toLocaleDateString("id-ID", options);
  };

  return (
    <>
      <div className="card shadow-sm mb-4">
        <div className="row g-0">
          <div className="col-md-3">
            <img
              src={
                item.classifyId && item.image_beef
                  ? `https://backend-meatwatch-production.up.railway.app/${item.image_beef.replace(
                      /\\/g,
                      "/"
                    )}`
                  : "/placeholder-meat.jpg"
              }
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
                  <span className={getResultClass(item.status)}>
                    {item.status}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Helper Functions
const getResultClass = (status) => {
  const normalizedStatus = status?.toLowerCase?.();
  if (normalizedStatus === "segar") return "text-success";
  if (normalizedStatus === "tidak segar") return "text-danger";
  return "text-muted";
};

const getConfidenceClass = (confidence) => {
  if (confidence > 0.8) return "bg-success";
  if (confidence > 0.5) return "bg-warning";
  return "bg-danger";
};

export default RiwayatCard;
