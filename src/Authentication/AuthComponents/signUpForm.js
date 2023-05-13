import React, { useContext, useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import AuthContext from "../Context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { MenuItem, TextField } from "@material-ui/core";
import { currencies } from "../../constants/currencies";

const SignUpForm = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const navigate = useNavigate();
  const { signUp } = useContext(AuthContext);

  function currencySelectionHandler(e) {
    setCurrency(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordConfirmRef.current.value !== passwordRef.current.value) {
      return setError("Passwords do not match!");
    }

    try {
      setError("");
      setLoading(true);
      await signUp(
        emailRef.current.value,
        passwordRef.current.value,
        firstNameRef.current.value,
        lastNameRef.current.value,
        currency
      );
      setLoading(false);
      //localStorage.setItem("isLoggedIn", true);
    } catch (err) {
      setError("Failed to create an account");
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
        <h1 style={{ marginTop: 80 }}>Welcome To ExpensIO</h1>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="fName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" ref={firstNameRef} required />
            </Form.Group>
            <Form.Group id="lName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" ref={lastNameRef} required />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ display: "block", marginTop: 20 }}>
                Choose Currency Type
              </Form.Label>
              <TextField
                id="outlined-select-currency"
                select
                defaultValue="$"
                onChange={currencySelectionHandler}
              >
                {currencies.map(c => (
                  <MenuItem key={c.name_plural} value={c.symbol}>
                    {`${c.symbol} : ${c.name}`}
                  </MenuItem>
                ))}
              </TextField>
            </Form.Group>
            <Button
              disabled={loading}
              className="w-100"
              style={{ marginTop: 40 }}
              type="submit"
            >
              Sign Up
            </Button>
          </Form>
        </Card.Body>
        <div style={{ marginBottom: 100 }} className="w-100 text-center">
          Already have an account ? <Link to="/login">Login</Link>
        </div>
      </Card>
    </div>
  );
};

export default SignUpForm;
