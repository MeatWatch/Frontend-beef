import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotificationAlert = ({ onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 50000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  const navigate = useNavigate();

  return (
    <div className="notification-alert-bottom-right">
      <div className="notification-content">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h4 className="m-0">Disclaimer</h4>
          <button
            className="notification-close"
            onClick={() => {
              setVisible(false);
              onClose();
            }}
          >
            <i className="fa fa-times"></i>
          </button>
        </div>
        <p className="mb-2">
          Akurasi deteksi dipengaruhi oleh gambar dan pencahayaan. Gunakan
          sebagai referensi awal, dan pastikan untuk memverifikasi kondisi
          daging secara manual.
        </p>
        <button
          className="notification-button"
          onClick={() => navigate("/testimonial")}
        >
          Pelajari Lebih Lanjut!
        </button>
      </div>
    </div>
  );
};

export default NotificationAlert;
