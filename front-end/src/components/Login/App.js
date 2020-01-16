import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel, Form } from "react-bootstrap";
import "./Login.css";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "react-apollo";
import LoginMutation from "./LoginMutation";

export default function Login({ headerText, onSubmit, postURL, ...props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [addTodo, { data, error }] = useMutation(GET_GREETING);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const a = 'Steve'
    const b = 'pass'

    const response = await fetch('api/graphql/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `{username:"${a}",password:"${b}"}`,
      }),
    })
      .then(response => {
        return response.json()
      })
      .catch((reason) => {
        console.log(reason)
      })


    console.log(response)
  }

  return (
    <div className="Login">
      <h2 id="title">{headerText}</h2>
      <Form action={postURL} method="post" onSubmit={handleSubmit}>
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
      <LoginMutation />
    </div>
  );
}


const GET_GREETING = gql`
mutation AddUser($input: UserInputType!){
  addUser(data: $input){
    Name
    Password
  }
}
`;

