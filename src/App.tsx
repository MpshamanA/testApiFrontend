import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [users, setUsers] = useState(Array());
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setUsers(data[0].name));
    // .then((data) => console.log(data));
  });
  return (
    <div className="App">
      <h1>FRONT</h1>
      {users}
    </div>
  );
}

export default App;
