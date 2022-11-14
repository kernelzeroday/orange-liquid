//import basic react components
import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

//import login component
import Login from "components/Login";

//App function is the main function that is called when the page is loaded
function App() {
  //set up the user count message with useState
  const [message, setMessage] = useState();
  const [otherMessage, setOtherMessage] = useState();
  //use message to set up the user count message with useEffect
  useEffect(() => {
    //call rust api to get the user count
    fetch("/api/users")
      //convert the response to json
      .then((res) => res.json())
      //set the message to the user count
      .then((res) => setMessage(`Hello with ${res.length} users`))
      //if there is an error, write it to the console
      .catch(console.error);
  }, [setMessage]);

  useEffect(() => {
    //call rust api to get the user count
    fetch("/api/other")
      //convert the response to json
      .then((res) => res.json())
      //set the message to the user count
      .then((res) => setOtherMessage(`Hello with ${res.length} users`))
      //if there is an error, write it to the console
      .catch(console.error);
  }, [setOtherMessage]);




  //return the application content
  return (
    //app div container
    <div className="App">
      {/* header */}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{message || "Loading..."}</p>
        <p>{otherMessage || "Loading..."}</p>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
