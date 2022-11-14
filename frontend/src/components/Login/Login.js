//import buttons and forums from react for login page
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
//import the login function from the api
import { login } from "api";
//import the useAuth hook
import { useAuth } from "context/auth";
//import the useHistory hook
import { useHistory } from "react-router-dom";
//import the login css
import "./Login.css";
//Login function
function Login() {
    //set up the email and password state variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //set up the error state variable
    const [error, setError] = useState("");
    //set up the auth and setAuth functions
    const { setAuthTokens } = useAuth();
    //set up the history variable
    const history = useHistory();
    //handle the form submission
    function handleSubmit(e) {
        //prevent the default form submission
        e.preventDefault();
        //call the login function from the api
        login(email, password)
        //if the login is successful
        .then((res) => {
            //set the auth tokens
            setAuthTokens(res);
            //redirect to the home page
            history.push("/");
        })
        //if there is an error
        .catch((err) => {
            //set the error message
            setError(err.message);
        });
    }
    //return the login form
    return (
        <div className="Login">
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            </Form.Group>
            <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
            />
            </Form.Group>
            <Button block type="submit">
            Login
            </Button>
            {error && <p>{error}</p>}
        </Form>
        </div>
    );
    }
    //export the login function
    export default Login;
    