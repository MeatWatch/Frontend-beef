import { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { Button, Form, Alert } from "react-bootstrap";

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    no_telp: user?.no_telp || "",
    address: user?.address || "",
    avatar: user?.profile_picture || "", // Simpan hanya nama file
    avatarFile: null, // Untuk file baru
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

    // Validasi lebih ketat
    if (!file.type.startsWith("image/")) {
      setError("Hanya file gambar yang diperbolehkan");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Ukuran gambar maksimal 2MB");
      return;
    }

    setIsUploading(true);

    try {
      // Gunakan File object langsung tanpa konversi ke data URL
      setFormData((prev) => ({
        ...prev,
        avatar: file,
        avatarPreview: URL.createObjectURL(file),
      }));
    } catch (err) {
      setError("Gagal memproses gambar");
      console.error("Error processing image:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      avatar: "", // hapus file avatar
      avatarPreview: getDefaultAvatar(), // ganti ke default avatar
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await updateUser(formData);
      if (result.success) {
        setSuccess("Profil berhasil diperbarui!");
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Update error details:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Gagal memperbarui profil");
    }
  };

  const getDefaultAvatar = () =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      formData.username || user?.username || ""
    )}&background=dc3545&color=fff&size=120`;

  const getAvatarUrl = () => {
    if (isEditing && formData.avatarPreview) {
      return formData.avatarPreview; // preview file atau default avatar kalau di-remove
    }
    if (formData.avatar && isEditing && typeof formData.avatar === "string") {
      return `https://backend-meatwatch-production.up.railway.app/images/users/${formData.avatar}`;
    }
    if (user?.profile_picture) {
      return `https://backend-meatwatch-production.up.railway.app/images/users/${user.profile_picture}`;
    }
    return getDefaultAvatar();
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
                    src={getAvatarUrl()}
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
                  name="no_telp"
                  value={formData.no_telp}
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
                    user?.avatar || user?.profile_picture
                      ? `https://backend-meatwatch-production.up.railway.app/images/users/${user.profile_picture}`
                      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user?.username || ""
                        )}&background=dc3545&color=fff&size=120`
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
                    <strong>Phone:</strong> {user?.no_telp || "-"}
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
                    {new Date(user?.created_at).toLocaleDateString()}
                  </p>
                  <p className="mb-0">
                    <strong>Last updated:</strong>{" "}
                    {new Date(user?.updated_at).toLocaleDateString()}
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
