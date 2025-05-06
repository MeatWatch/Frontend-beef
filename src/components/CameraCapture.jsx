import { Container, Row, Col, Spinner } from "react-bootstrap";
import React, { useRef, useEffect, useState, useCallback } from "react";

const CameraCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null); // Menambahkan ref untuk input file
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [capturedImage, setCapturedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fileImage, setFileImage] = useState(null);
  const [submittedImage, setSubmittedImage] = useState(null);

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
      };
      reader.readAsDataURL(file);
    } else {
      alert("Silakan pilih file gambar.");
    }
  };

  const handleDeleteImage = () => {
    setCapturedImage(null);
    setFileImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset input file
    }
  };

  const handleSubmitImage = () => {
    const imageToSubmit = capturedImage || fileImage;
    if (!imageToSubmit) {
      alert("Tidak ada gambar yang dipilih atau diambil.");
      return;
    }

    // Contoh kirim ke server (gunakan fetch atau axios jika perlu)
    // Simpan ke state dulu sebagai simulasi submit
    setSubmittedImage(imageToSubmit);

    console.log("Gambar dikirim:", imageToSubmit);
    alert("Gambar berhasil dikirim!");
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
              }}
            />
          </div>
        </Col>

        <Col className="text-center mb-4 animate__animated animate__fadeInUp animate__delay-1s">
          <Row className="gx-3 gy-2 justify-content-center">
            <Col xs={12} sm={6} md={4} lg={3}>
              <button
                onClick={takePicture}
                className="btn btn-danger w-100"
                disabled={!isCameraActive}
              >
                Ambil Gambar
              </button>
            </Col>

            <Col xs={12} sm={6} md={4} lg={3}>
              <button onClick={toggleCamera} className="btn btn-danger w-100">
                {isCameraActive ? "Matikan Kamera" : "Nyalakan Kamera"}
              </button>
            </Col>

            <Col xs={12} sm={6} md={4} lg={3}>
              <label className="btn btn-danger w-100 mb-0">
                Unggah Gambar
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />
              </label>
            </Col>

            {/* {(capturedImage || fileImage) && (
              <Col xs={12} sm={6} md={4} lg={3}>
                <button
                  onClick={handleSubmitImage}
                  className="btn btn-success w-100"
                >
                  Submit Gambar
                </button>
              </Col>
            )} */}
          </Row>
        </Col>

        <canvas
          ref={canvasRef}
          style={{ display: "none" }}
          width={640}
          height={480}
        />

        {(capturedImage || fileImage) && (
          <Col md={12} className="text-center">
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
        {(capturedImage || fileImage) && (
          <Col>
            <button
              onClick={handleSubmitImage}
              className="btn btn-success w-100"
            >
              Submit Gambar
            </button>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default CameraCapture;
