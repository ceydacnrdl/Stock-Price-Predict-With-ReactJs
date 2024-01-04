import React from "react";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Title() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("/")
      .then((res) => {
        console.log(res);

        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.name);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      })
      .then((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {auth ? (
        <div>
          <h2>hoşgeldin {name}</h2>
        </div>
      ) : (
        <div>
          {" "}
          <h3>asdfghjk</h3>
        </div>
      )}
    </div>
  );
}
