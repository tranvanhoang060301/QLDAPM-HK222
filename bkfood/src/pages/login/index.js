import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";

import Background from "../../assets/images/background.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      console.log("logged in");
      navigate("/profile");
    } catch (e) {
      setError("Log In failed. Please check your email and password");
    }
    setLoading(false);
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{backgroundImage: `url(${Background})`, backgroundRepeat: "none", backgroundSize: "cover", height: '100vh'}}>
      <div className="p-4 border min-w- bg-light rounded-3 shadow" style={{ minWidth: '468px', fontSize: "24px"}}>
        <h2 className="text-center fs-2 fw-bolder py-2">Đăng nhập</h2>
        <Form onSubmit={handleSubmit}>
          {error !== "" && <Alert variant="danger">{error}</Alert>}
          <Form.Group className="mb-3" controlId="email">
            <Form.Label className="font-medium">Email</Form.Label>
            <Form.Control
                type="email"
                style={{ border: '2px solid #000000', fontSize: "28px" }}
                required            
                onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label className="font-medium">Mật khẩu</Form.Label>
            <Form.Control
                type="password"
                style={{ border: '2px solid #000000', fontSize: "28px" }}
                required   
                onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button
            type="submit"
            className="w-100 my-2 py-3 fw-bold fs-4"
            style={{ backgroundColor: "#A02F2F" }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#6F2020"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#A02F2F"}
            disabled={loading}
            disabled={loading}
          >
            {loading ? "Loading..." : "ĐĂNG NHẬP"}
          </Button>
        </Form>
        <div className="w-100 text-center mt-3">
            Chưa có tài khoản?{" "}
            <Link to="/signup" className="text-primary" style={{ textDecoration: 'none' }}>
            Đăng Ký
            </Link>
        </div>
      </div>
    </Container>
  );
};

export default Login;
