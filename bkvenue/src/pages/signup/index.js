import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";

import Background from "../../assets/images/background.png";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (passwordConfirm !== password) {
      return setError("Passwords are not matching");
    }

    try {
      setLoading(true);
      navigate("/");
    } catch (e) {
      setError("Failed to create an account. Please try again");
    }
    setLoading(false);
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundRepeat: "none",
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <div
        className="p-4 border min-w- bg-light rounded-3 shadow"
        style={{ minWidth: "468px", fontSize: "24px" }}
      >
        <h2 className="text-center fs-2 fw-bolder py-2">ĐĂNG KÝ</h2>
        <Form onSubmit={handleSubmit}>
          {error && (
            <Alert variant="danger" className="py-2">
              {error}
            </Alert>
          )}
          <Form.Group className="d-flex flex-column align-items-start mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              style={{ border: "2px solid #000000", fontSize: "28px" }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="d-flex flex-column align-items-start mb-3" controlId="formPassword">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              value={password}
              style={{ border: "2px solid #000000", fontSize: "28px" }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="d-flex flex-column align-items-start mb-3" controlId="formPasswordConfirm">
            <Form.Label>Xác nhận mật khẩu</Form.Label>
            <Form.Control
              type="password"
              value={passwordConfirm}
              style={{ border: "2px solid #000000", fontSize: "28px" }}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </Form.Group>
          <Button
            type="submit"
            className="w-100 my-2 py-3 fw-bold fs-4 border-0"
            style={{ backgroundColor: "#A02F2F" }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#6F2020")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#A02F2F")}
            disabled={loading}
          >
            {loading ? "Loading..." : "ĐĂNG KÝ"}
          </Button>
        </Form>
        <div className="w-100 text-center mt-3">
          Đã có tài khoản?{" "}
          <Link
            to="/login"
            className="text-primary"
            style={{ textDecoration: "none" }}
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Signup;
