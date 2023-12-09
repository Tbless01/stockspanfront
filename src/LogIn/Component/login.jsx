import React, { useState } from "react";
import axios from "../../../src/api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../LogIn/Style/login.css";
import SiteName from "../../SiteName/Component/SiteName";

export const Login = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "emailAddress") {
      setEmailAddress(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const userLogin = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post("/auth/login", {
        emailAddress: emailAddress,
        password: password,
      });

      if (response.data.successful === true) {
        // Store the email address in local storage
        
        localStorage.setItem("emailAddress", emailAddress);
        window.location.href = "/dashboard";
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SiteName />
      <div className="LoginMainContainer">
        <div className="LoginSemiMain">
          Enter Email Address
          <input
            type="email"
            id="emailInput"
            className="LoginEmail"
            placeholder="email@gmail.com"
            minLength={11}
            name="emailAddress"
            onChange={handleChange}
          />
          Enter Password
          <input
            type="password"
            placeholder="Enter your password"
            className="LoginEmail"
            name="password"
            onChange={handleChange}
          />
          <button
            type="button"
            className="LoginEmail1"
            onClick={userLogin}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
