import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./App.css";

type Users = {
  name: string;
  position: string;
};

function App() {
  const [users, setUsers] = useState<Users[]>();
  // const [inputName, setInputName] = useState<string>("");
  // const [inputPosition, setInputPosition] = useState<string>("");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Users>();

  // const handleChageNmame = (e: any): void => {
  //   setInputName(e.target.value);
  // };
  // const handleChagePosition = (e: any): void => {
  //   setInputPosition(e.target.value);
  // };

  useEffect(() => {
    let unmount = false;
    if (!unmount) {
      fetch("/api")
        .then((res) => res.json())
        .then((data) => setUsers(data));
    }
    return () => {
      unmount = true;
    };
  }, []);

  const testApi = (data: Users) => {
    const { name, position } = data;
    axios
      .post("/api", { name: name, position: position })
      .then((res) => {
        const test = res.data;
        console.log(test);
      })
      .catch((e) => {
        console.log(e);
      });
    // setInputName("");
  };

  return (
    <div className="App">
      <h1>FRONT</h1>
      <form action="post" onSubmit={handleSubmit(testApi)}>
        <input
          type="text"
          placeholder="name"
          // defaultvalue={inputName}
          // onChange={handleChageNmame}
          {...register("name", {
            required: true,
          })}
        />
        <input
          type="text"
          placeholder="position"
          // value={inputPosition}
          // onChange={handleChagePosition}
          {...register("position", {
            required: true,
          })}
        />
        <button type="submit">データ送信</button>
      </form>
      <div>
        {users &&
          users.map((user: Users) => (
            <div key={user.name}>
              {user.name}：{user.position}
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
