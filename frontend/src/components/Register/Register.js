//import the buttons and forums from react for register page
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
//import the register function from the api
import { register } from "api";
//import the useHistory hook
import { useHistory } from "react-router-dom";
//import the register css
import "./Register.css";
//Register function
function Register() {
    //set up the email and password state variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //set up the error state variable
    const [error, setError] = useState("");
    //set up the history variable
    const history = useHistory();
    //handle the form submission
    function handleSubmit(e) {
        //prevent the default form submission
        e.preventDefault();
        //call the register function from the api
        register(email, password)
        //if the register is successful
        .then((res) => {
            //redirect to the login page
            history.push("/login");
        })
        //if there is an error
        .catch((err) => {
            //set the error message
            setError(err.message);
        });
    }
    //return the register form
    return (
        <div className="Register">
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
            Register
            </Button>
        </Form>
        </div>
    );
}
//export the register function
export default Register;
