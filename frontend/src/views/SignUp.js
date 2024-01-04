import React, { useState } from "react";
import trade1 from "../assets/16367269_rm373batch4-07.jpg";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    console.log("handle da");
    event.preventDefault();
    axios
      .post("/register", values)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.error(err); // Hata durumunda hatayı console'da göster
      });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <img className="w-full h-auto max-w-full" src={trade1} alt="Trade 1" />
      <div className="absolute bg-gray-800 bg-opacity-50 p-6 rounded-md shadow-md">
        <Form className="flex flex-col">
          <FormGroup className="mb-4">
            <Label for="firstName" className="text-white">
              First Name
            </Label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="First Name"
              type="text"
              className="bg-transparent text-white border-b-2 border-white"
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </FormGroup>
          <FormGroup className="mb-4">
            <Label for="lastName" className="text-white">
              Last Name
            </Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              type="text"
              className="bg-transparent text-white border-b-2 border-white"
              onChange={(e) =>
                setValues({ ...values, lastname: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup className="mb-4">
            <Label for="username" className="text-white">
              Username
            </Label>
            <Input
              id="username"
              name="username"
              placeholder="Username"
              autocomplete="username"
              type="email"
              className="bg-transparent text-white border-b-2 border-white"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </FormGroup>
          <FormGroup className="mb-4">
            <Label for="password" className="text-white">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              autoComplete="current-password"
              className="bg-transparent text-white border-b-2 border-white"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
            <div className="flex items-center justify-center mt-6">
              <a onClick={handleSubmit} className="btn btn-primary">
                Sign Up
              </a>
            </div>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
}
