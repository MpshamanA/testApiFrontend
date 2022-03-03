import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

type Users = {
  name: string;
  position: string;
};

function App() {
  const [users, setUsers] = useState<Users[]>();
  const [inputName, setInputName] = useState<string>("");

  const handleChage = (e: any): void => {
    setInputName(e.target.value);
  };

  useEffect(() => {
    let unmount = false;
    if (!unmount) {
      console.log("useEffect1が実行されました");
      fetch("/api")
        .then((res) => res.json())
        .then((data) => setUsers(data));
    }
    return () => {
      unmount = true;
    };
  }, []);

  const testApi = () => {
    axios
      .post("/api", { name: inputName, position: "福岡" })
      .then((res) => {
        const test = res.data;
        console.log(test);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="App">
      <h1>FRONT</h1>
      <input type="text" value={inputName} onChange={handleChage} />
      <div>
        {users &&
          users.map((user: Users) => (
            <div key={user.name}>
              {user.name}：{user.position}
            </div>
          ))}
        <button onClick={testApi}>API</button>
      </div>
    </div>
  );
}

export default App;
