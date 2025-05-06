import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

const AuthForm = ({ type, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email dan password harus diisi");
      return;
    }
    if (type === "register" && !name) {
      setError("Nama harus diisi");
      return;
    }
    onSubmit({ email, password, name });
  };

  return (
    <div
      className="auth-form p-4 rounded shadow"
      style={{ maxWidth: "400px", margin: "0 auto" }}
    >
      <h2 className="text-center mb-4">
        {type === "login" ? "Login" : "Register"}
      </h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        {type === "register" && (
          <Form.Group className="mb-3">
            <Form.Label>Nama Lengkap</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukkan nama"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
        )}

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Masukkan email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="danger" type="submit" className="w-100">
          {type === "login" ? "Login" : "Register"}
        </Button>
      </Form>

      <div className="mt-3 text-center">
        {type === "login" ? (
          <p>
            Belum punya akun? <a href="/register">Daftar disini</a>
          </p>
        ) : (
          <p>
            Sudah punya akun? <a href="/login">Login disini</a>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
