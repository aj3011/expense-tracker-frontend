import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import Authcontext from "../Context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MenuItem, TextField } from "@material-ui/core";
import { currencies } from "../../constants/currencies";
import { db } from "../firebase";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail, lastLoggedInUser } =
    useContext(Authcontext);
  const [presentUser, setPresentUser] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn"))
  );
  const [error, setError] = useState("");
  const [currency, setCurrency] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function currencySelectionHandler(e) {
    setCurrency(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== presentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    if (currency) {
      promises.push(
        db.collection("users").doc(presentUser.uid).update({
          currency
        })
      );
    }

    Promise.all(promises)
      .then(() => {})
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });

    navigate("/");
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
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit} style={{ width: "90vw" }}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={presentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label style={{ display: "block", marginTop: 10 }}>
                Update Currency (Leave blank to keep the same)
              </Form.Label>
              <TextField
                id="outlined-select-currency"
                select
                defaultValue=""
                onChange={currencySelectionHandler}
              >
                {currencies.map(c => (
                  <MenuItem key={c.name_plural} value={c.symbol}>
                    {`${c.symbol} : ${c.name}`}
                  </MenuItem>
                ))}
              </TextField>
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Update
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            <Link to="/">Cancel</Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
