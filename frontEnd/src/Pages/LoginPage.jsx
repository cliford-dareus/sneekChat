import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../Components/FormInput";
import { Form } from "../Utils/Styles/Global.style";
import { useNavigate } from "react-router-dom";
import {
  PageContainer,
  RegisterCallToAction,
  RegisterPageFormContainer,
  RegisterPageTextContainer,
} from "../Utils/Styles/Register.style";
import { useMutation } from "@tanstack/react-query";
import { config } from "../helper/axios.config";
import { connectSocket } from "../Utils/socket";

const LoginPage = () => {
  const Navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });

  const mutation = useMutation(
    (info) => {
      return axios.post(
        "http://localhost:5000/api/v1/auth/login",
        info,
        config
      );
    },
    {
      onSuccess: (data) => {
        localStorage.setItem("user", JSON.stringify(data.data.user));
        console.log(data.data.user.username);
        connectSocket(data?.data?.user);
        Navigate("/");
      },
    }
  );

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = userInfo;
    const logInUser = { username, password };

    try {
      mutation.mutate(logInUser);

      setUserInfo({ username: "", password: "" });
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
            label="Password"
            type="password"
            name="password"
            value={userInfo.password}
            handleChange={handleChange}
          />

          <button style={{ marginTop: "2em", borderRadius: "2em" }}>
            Log In
          </button>

          <RegisterCallToAction>
            Already have an account? <Link to="/register">Sign In Here</Link>
          </RegisterCallToAction>
        </Form>
      </RegisterPageFormContainer>
    </PageContainer>
  );
};

export default LoginPage;
