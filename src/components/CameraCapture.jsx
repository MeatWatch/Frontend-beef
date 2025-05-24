import { Container, Row, Col, Spinner, Form } from "react-bootstrap";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { mockApi } from "../api/mockApi"; // Import mock API functions

const CameraCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [capturedImage, setCapturedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fileImage, setFileImage] = useState(null);
  const [submittedImage, setSubmittedImage] = useState(null);
  const [meatType, setMeatType] = useState("beef");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [classificationResult, setClassificationResult] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const startCamera = useCallback(async () => {
    try {
      const isValidDevice = devices.some(
        (device) => device.deviceId === selectedDeviceId
      );
      if (!isValidDevice) {
        console.warn("Perangkat kamera tidak tersedia.");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { ideal: selectedDeviceId } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
    } catch (err) {
      console.error("Gagal mengakses kamera:", err.name, err.message);
      alert(
        "Tidak dapat mengakses kamera. Pastikan izin diberikan dan kamera tersedia."
      );
    }
  }, [selectedDeviceId, devices]);

  const stopCamera = useCallback(() => {
    const stream = streamRef.current;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      streamRef.current = null;
      setIsCameraActive(false);
    }
  }, []);

  useEffect(() => {
    const getVideoDevices = async () => {
      try {
        const mediaDevices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = mediaDevices.filter(
          (device) => device.kind === "videoinput"
        );
        setDevices(videoDevices);
        setIsLoading(false);
        if (videoDevices.length > 0) {
          setSelectedDeviceId(videoDevices[0].deviceId);
        }
      } catch (err) {
        console.error("Gagal mengambil daftar perangkat:", err);
      }
    };

    getVideoDevices();
  }, []);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const toggleCamera = () => {
    if (isCameraActive) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  const takePicture = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (canvas && context && videoRef.current) {
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/png");
      setCapturedImage(imageData);
      setFileImage(null); // Clear file image if exists
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDeviceChange = (newDeviceId) => {
    if (isCameraActive) {
      stopCamera();
      setSelectedDeviceId(newDeviceId);
      setTimeout(() => {
        startCamera();
      }, 500);
    } else {
      setSelectedDeviceId(newDeviceId);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileImage(reader.result);
        setCapturedImage(null); // Clear camera image if exists
      };
      reader.readAsDataURL(file);
    } else {
      alert("Silakan pilih file gambar.");
    }
  };

  const handleDeleteImage = () => {
    setCapturedImage(null);
    setFileImage(null);
    setClassificationResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // const handleSubmitImage = async () => {
  //   const imageToSubmit = capturedImage || fileImage;
  //   if (!imageToSubmit) {
  //     alert("Tidak ada gambar yang dipilih atau diambil.");
  //     return;
  //   }

  //   if (!meatType) {
  //     alert("Silakan pilih jenis daging terlebih dahulu.");
  //     return;
  //   }

  //   setIsSubmitting(true);
  //   setError(null);

  //   try {
  //     // Convert data URL to blob
  //     const blob = await fetch(imageToSubmit).then((r) => r.blob());
  //     const formData = new FormData();
  //     formData.append("image", blob, "meat-image.jpg");
  //     formData.append("meat_type", meatType);
  //     formData.append("user_id", 1); // Replace with actual user ID from auth

  //     const response = await axios.post(
  //       "http://localhost:3001/upload-classification",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     setClassificationResult(response.data);
  //     setSubmittedImage(imageToSubmit);
  //     console.log("Classification result:", response.data);
  //   } catch (err) {
  //     console.error("Error submitting image:", err);
  //     setError("Gagal mengklasifikasikan gambar. Silakan coba lagi.");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleSubmitImage = async () => {
    const imageToSubmit = capturedImage || fileImage;
    if (!imageToSubmit) {
      alert("Tidak ada gambar yang dipilih atau diambil.");
      return;
    }

    if (!meatType) {
      alert("Silakan pilih jenis daging terlebih dahulu.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // ======================================================
      // LOCAL MOCK MODE - comment this block when using server
      // Convert data URL to blob for consistent interface
      const blob = await fetch(imageToSubmit).then((r) => r.blob());
      const formData = new FormData();
      formData.append("image", blob, "meat-image.jpg");
      formData.append("meat_type", meatType);
      formData.append("user_id", 1);

      // Use mock API instead of real API call
      const mockResult = await mockApi.classifyMeat(formData);
      setClassificationResult(mockResult);
      setSubmittedImage(imageToSubmit);
      console.log("Mock classification result:", mockResult);
      // ======================================================

      // ======================================================
      // SERVER MODE - uncomment this block when using real server
      /*
      // Convert data URL to blob
      const blob = await fetch(imageToSubmit).then((r) => r.blob());
      const formData = new FormData();
      formData.append("image", blob, "meat-image.jpg");
      formData.append("meat_type", meatType);
      formData.append("user_id", 1); // Replace with actual user ID from auth

      const response = await axios.post(
        "http://localhost:3001/upload-classification",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setClassificationResult(response.data);
      setSubmittedImage(imageToSubmit);
      console.log("Classification result:", response.data);
      */
      // ======================================================
    } catch (err) {
      console.error("Error submitting image:", err);
      setError("Gagal mengklasifikasikan gambar. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="py-4 mt-4">
      <Row>
        <Col
          md={12}
          className="mb-3 text-center animate__animated animate__fadeInUp animate__delay-1s"
        >
          <label
            htmlFor="cameraSelect"
            className="form-label fw-bold mb-2 d-block"
          >
            Pilih Kamera:
          </label>
          {isLoading ? (
            <Spinner animation="border" variant="primary" />
          ) : devices.length === 0 ? (
            <p>Tidak ada kamera yang terdeteksi.</p>
          ) : (
            <select
              id="cameraSelect"
              className="form-select w-auto d-inline-block text-center"
              onChange={(e) => handleDeviceChange(e.target.value)}
              value={selectedDeviceId}
            >
              {devices.map((device, index) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || `Kamera ${index + 1}`}
                </option>
              ))}
            </select>
          )}
        </Col>

        <Col
          md={12}
          className="mb-3 text-center animate__animated animate__fadeInUp animate__delay-1s"
        >
          <div
            style={{
              width: "100%",
              maxWidth: "640px",
              height: "480px",
              margin: "auto",
              overflow: "hidden",
              position: "relative",
              backgroundColor: "#000",
            }}
          >
            {!isCameraActive && !(capturedImage || fileImage) && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "white",
                }}
              >
                Kamera tidak aktif atau belum ada gambar
              </div>
            )}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={{
                width: "100%",
                height: "auto",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: isCameraActive ? "block" : "none",
              }}
            />
          </div>
        </Col>

        {(capturedImage || fileImage) && (
          <Col md={12} className="text-center mb-3">
            <h5>Hasil Gambar:</h5>
            <img
              src={capturedImage || fileImage}
              alt="Captured"
              style={{
                width: "100%",
                maxWidth: "640px",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={handleDeleteImage}
            />
            <p className="mt-2">Klik gambar untuk menghapusnya.</p>
          </Col>
        )}

        <Col md={12} className="mb-3">
          <Form.Group controlId="meatTypeSelect">
            <Form.Label>Pilih Jenis Daging:</Form.Label>
            <Form.Select
              value={meatType}
              onChange={(e) => setMeatType(e.target.value)}
              disabled={isSubmitting}
            >
              <option value="beef">Daging Sapi</option>
              <option value="chicken">Daging Ayam</option>
              <option value="fish">Daging Ikan</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col className="text-center mb-4 animate__animated animate__fadeInUp animate__delay-1s">
          <Row className="gx-3 gy-2 justify-content-center">
            <Col xs={12} sm={6} md={4} lg={3}>
              <button
                onClick={takePicture}
                className="btn btn-danger w-100"
                disabled={!isCameraActive || isSubmitting}
              >
                Ambil Gambar
              </button>
            </Col>

            <Col xs={12} sm={6} md={4} lg={3}>
              <button
                onClick={toggleCamera}
                className="btn btn-danger w-100"
                disabled={isSubmitting}
              >
                {isCameraActive ? "Matikan Kamera" : "Nyalakan Kamera"}
              </button>
            </Col>

            <Col xs={12} sm={6} md={4} lg={3}>
              <label
                className="btn btn-danger w-100 mb-0"
                style={{ cursor: isSubmitting ? "not-allowed" : "pointer" }}
              >
                Unggah Gambar
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                  disabled={isSubmitting}
                />
              </label>
            </Col>

            {(capturedImage || fileImage) && (
              <Col xs={12} sm={6} md={4} lg={3}>
                <button
                  onClick={handleSubmitImage}
                  className="btn btn-danger w-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      <span className="ms-2">Memproses...</span>
                    </>
                  ) : (
                    "Analisis Gambar"
                  )}
                </button>
              </Col>
            )}
          </Row>
        </Col>

        {error && (
          <Col md={12} className="text-center text-danger mb-3">
            {error}
          </Col>
        )}

        {classificationResult && (
          <Col md={12} className="text-center mb-4">
            <div
              className={`p-3 border rounded ${
                classificationResult.analysis.result === "Fresh"
                  ? "bg-light"
                  : "bg-danger bg-opacity-10"
              }`}
            >
              <h4>Hasil Analisis:</h4>
              <p className="fs-5">
                Status:{" "}
                <strong
                  className={
                    classificationResult.analysis.result === "Fresh"
                      ? "text-success"
                      : "text-danger"
                  }
                >
                  {classificationResult.analysis.result}
                </strong>
              </p>
              <p className="fs-5">
                Tingkat Kepercayaan:{" "}
                <strong>
                  {(classificationResult.analysis.confidence * 100).toFixed(2)}%
                </strong>
              </p>
              <p className="fs-6">{classificationResult.analysis.message}</p>
              <img
                src={
                  classificationResult.analysis.result === "Fresh"
                    ? "/image/success.png"
                    : "/image/warning.png"
                }
                alt={
                  classificationResult.analysis.result === "Fresh"
                    ? "Fresh meat"
                    : "Not fresh meat"
                }
                style={{ maxWidth: "300px", marginTop: "15px" }}
              />
              {classificationResult.analysis.result !== "Fresh" && (
                <div className="mt-3 alert alert-danger">
                  <strong>Peringatan!</strong> Daging terindikasi tidak segar,
                  disarankan untuk tidak dikonsumsi.
                </div>
              )}
            </div>
            <div className="pt-5">
              "Disclaimer: Hasil deteksi dapat bervariasi tergantung pada
              kualitas gambar, pencahayaan, sudut pengambilan foto, serta faktor
              lingkungan lainnya. Oleh karena itu, hasil klasifikasi mungkin
              tidak selalu akurat. Gunakan hasil deteksi ini sebagai referensi
              awal dan tetap periksa kondisi daging secara langsung sebelum
              digunakan."
            </div>
            <button
              className="btn btn-danger mt-3"
              onClick={() => navigate("/riwayat")}
              style={{ marginRight: "10px" }}
            >
              Lihat Riwayat
            </button>
            <button
              className="btn btn-danger mt-3"
              onClick={() => navigate("/testimonial")}
            >
              Pelajari Lebih Lanjut
            </button>
          </Col>
        )}

        <canvas
          ref={canvasRef}
          style={{ display: "none" }}
          width={640}
          height={480}
        />
      </Row>
    </Container>
  );
};

export default CameraCapture;
