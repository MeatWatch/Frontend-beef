import { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { Button, Form, Alert } from "react-bootstrap";

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    avatar: user?.avatar || "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Basic validation
    if (!file.type.match("image.*")) {
      setError("Please select an image file");
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Image size should be less than 2MB");
      setTimeout(() => setError(""), 3000);
      return;
    }

    setIsUploading(true);

    try {
      // In a real app, you would upload the image to your server here
      // For demonstration, we'll use a mock upload that returns a data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, avatar: reader.result }));
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError("Failed to upload image");
      setIsUploading(false);
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, avatar: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(formData);
      setSuccess("Profile updated successfully!");
      setError("");
      setIsEditing(false);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="min-h-screen py-4 pt-5 bg-light">
      <div className="container pt-5" style={{ maxWidth: "600px" }}>
        <div className="bg-white p-4 pt-5 rounded shadow-sm">
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          {isEditing ? (
            <Form onSubmit={handleSubmit}>
              <div className="text-center mb-4">
                <div className="position-relative d-inline-block">
                  <img
                    src={
                      formData.avatar ||
                      "https://ui-avatars.com/api/?name=" +
                        encodeURIComponent(user?.username || "") +
                        "&background=dc3545&color=fff&size=120"
                    }
                    alt="Profile"
                    className="rounded-circle mb-3"
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                      border: "3px solid #dc3545",
                    }}
                  />
                  {isUploading && (
                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50 rounded-circle">
                      <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Uploading...</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="d-flex gap-2 justify-content-center">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => fileInputRef.current.click()}
                    disabled={isUploading}
                  >
                    Change Photo
                  </Button>
                  {formData.avatar && (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={handleRemoveImage}
                      disabled={isUploading}
                    >
                      Remove
                    </Button>
                  )}
                </div>

                <Form.Control
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="d-none"
                />
              </div>

              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  autoComplete="username"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  autoComplete="street-address"
                />
              </Form.Group>

              <div className="d-flex gap-2 justify-content-end">
                <Button
                  variant="outline-secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button variant="danger" type="submit" disabled={isUploading}>
                  {isUploading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </Form>
          ) : (
            <div className="text-center">
              <div className="position-relative d-inline-block">
                <img
                  src={
                    user?.avatar ||
                    "https://ui-avatars.com/api/?name=" +
                      encodeURIComponent(user?.username || "") +
                      "&background=dc3545&color=fff&size=120"
                  }
                  alt="Profile"
                  className="rounded-circle mb-3"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    border: "3px solid #dc3545",
                  }}
                />
              </div>

              <h3 className="mb-1">{user?.username}</h3>
              <p className="text-muted mb-4">{user?.email}</p>

              <div className="text-start mb-4">
                <h5 className="text-center text-danger mb-3">
                  Contact Information
                </h5>
                <div className="text-center ps-3">
                  <p className="mb-2">
                    <strong>Phone:</strong> {user?.phone || "-"}
                  </p>
                  <p className="mb-0">
                    <strong>Address:</strong> {user?.address || "-"}
                  </p>
                </div>
              </div>

              <div className="text-start mb-4">
                <h5 className="text-center text-danger mb-3">Account Status</h5>
                <div className="text-center ps-3">
                  <p className="mb-2">
                    <strong>Member since:</strong>{" "}
                    {new Date(user?.createdAt).toLocaleDateString()}
                  </p>
                  <p className="mb-0">
                    <strong>Last updated:</strong>{" "}
                    {new Date(user?.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <Button
                variant="outline-danger"
                onClick={() => setIsEditing(true)}
                className="px-4"
              >
                Edit Profile
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
