import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Title() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:8081")
      .then((res) => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.name);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      })
      .then((err) => console.log(err));
  }, []);

  return (
    <div>{auth ? <h2>Hoşgeldin {name}</h2> : <h2>Maalesef {message}</h2>}</div>
  );
}
