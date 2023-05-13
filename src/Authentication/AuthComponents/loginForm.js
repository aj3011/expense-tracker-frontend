import React, { useRef, useState, useContext } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import AuthContext from "../Context/authContext";
import { Link, useNavigate } from "react-router-dom";
import styles from "./loginForm.module.css";

export default function LoginForm() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      console.log("I am gere");
      setError("");
      setLoading(true);

      await login(emailRef.current.value, passwordRef.current.value);

      setLoading(false);
    } catch (e) {
      setError("Failed to log in");
    }

    navigate("/", { replace: "true" });
  }

  return (
    <div>
      <Card
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh"
        }}
      >
        <h1 className={styles.header}>Welcome To ExpensIO</h1>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
        <div style={{ marginBottom: 350 }} className="w-100 text-center">
          Need an account? <Link to="/signUp">Sign Up</Link>
        </div>
      </Card>
    </div>
  );
}
