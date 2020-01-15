import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel, Form } from "react-bootstrap";
import "./Login.css";

export default function Login({ headerText, postURL, ...props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="Login">
      <h2 id="title">{headerText}</h2>
      <Form action={postURL} method="post" >
        <FormGroup controlId="email" bsSize="large">
          <FormLabel>Username </FormLabel>
          <FormControl
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
            name="username"
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            name="password"
          />
        </FormGroup>
        <Button block bsSize="large" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}