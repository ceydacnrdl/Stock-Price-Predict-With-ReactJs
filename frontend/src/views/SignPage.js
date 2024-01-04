import trade1 from "../assets/16367269_rm373batch4-07.jpg";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function SignPage() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();

    // Boş alan kontrolü
    if (!values.email.trim() || !values.password.trim()) {
      alert("Email and password are required.");
      return;
    }

    axios
      .post("/login", values)
      .then((res) => {
        console.log(res);

        if (res.data.Status === "Success") {
          navigate("/dashboard");
        } else {
          alert("Error");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <img className="w-full h-auto max-w-full" src={trade1} alt="Trade 1" />
      <div className="absolute bg-gray-800 bg-opacity-50 p-6 rounded-md shadow-md">
        <Form>
          <h1 className="text-white text-center text-2xl font-medium font-'Space Grotesk' leading-[28.80px] relative">
            e-portfolio
          </h1>
          <FormGroup>
            <Label for="exampleEmail" className="text-white">
              Email
            </Label>
            <Input
              id="exampleEmail"
              name="email"
              placeholder="Email"
              type="email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className="bg-transparent text-white border-b-2 border-white"
            />
          </FormGroup>{" "}
          <FormGroup>
            <Label for="examplePassword" className="text-white">
              Password
            </Label>
            <Input
              id="examplePassword"
              name="password"
              placeholder="Password"
              type="password"
              autoComplete="current-password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              className="bg-transparent text-white border-b-2 border-white"
            />
          </FormGroup>{" "}
          <div className="flex justify-between mt-4">
            {" "}
            <a onClick={handleSubmit} color="primary" href="/dashboard">
              Submit
            </a>
            <Link color="primary" to="/register">
              SignUp
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
