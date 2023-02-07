import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form } from "../Utils/Styles/Global.style";
import FormInput from "../Components/FormInput";
import {
  PageContainer,
  RegisterCallToAction,
  RegisterPageFormContainer,
  RegisterPageTextContainer,
} from "../Utils/Styles/Register.style";
import { useMutation } from "@tanstack/react-query";
import { config } from "../helper/axios.config";

const RegisterPage = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  const mutation = useMutation((Info) => {
    return axios.post(
      "http://localhost:5000/api/v1/auth/register",
      Info,
      config
    );
  });

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password } = userInfo;
    const registerNewUser = { username, email, password };

    try {
      mutation.mutate(registerNewUser);
      setUserInfo({ username: "", email: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageContainer>
      <RegisterPageTextContainer>
        <h1>SneekChat</h1>
        <p>Join Our simple and fun chat app made for friends and all</p>
      </RegisterPageTextContainer>

      <RegisterPageFormContainer>
        <Form onSubmit={onSubmit}>
          <FormInput
            label="Username"
            type="text"
            name="username"
            value={userInfo.username}
            handleChange={handleChange}
          />
          <FormInput
            label="Email"
            type="email"
            name="email"
            value={userInfo.email}
            handleChange={handleChange}
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            value={userInfo.password}
            handleChange={handleChange}
          />

          <button style={{ marginTop: "2em", borderRadius: "2em" }}>
            Sign Up
          </button>

          <RegisterCallToAction>
            Already have an account? <Link to="/login">Sign In Here</Link>
          </RegisterCallToAction>
        </Form>
      </RegisterPageFormContainer>
    </PageContainer>
  );
};

export default RegisterPage;
