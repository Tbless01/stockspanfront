import React, { useState, useEffect } from "react";
import axios from "../../../src/api/axios";
import "../../SignUP/Style/SignUp.css";
import { ToastContainer, toast } from "react-toastify";
import TopNav from "../../TopNav/Component/TopNav";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export const SignuP = () => {
  const [registrationData, setRegistrationData] = useState({
    emailAddress: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    // genderType: "",
  });

  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [loading, setLoading] = useState(false);
  const isDisabled = !(registrationData.emailAddress && registrationData.firstName && registrationData.lastName && registrationData.password && registrationData.confirmPassword && registrationData.phoneNumber);


  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        handleFormSubmit(e);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "confirmPassword") {
      setPasswordMismatch(registrationData.password !== value);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (passwordMismatch) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/register/user", registrationData);
      if (response.data.isSuccessful === true || response.status === 200) {
        toast.success("Registration successful! Check your email to verify your account", {
          autoClose: 3000,
        });
        // Optionally, you can redirect the user to another page
        // window.location.href = "/some-other-page";
      } 
      console.log(" status code "+response.status);
      if (response.status === 500) {
        toast.error("No internet connection. Please check your network.");
      }else {
        toast.error(response.data.data || "Registration failed. Please try again.");
      }
    } catch (error) {
      if (error.message === "Registration failed. Please check your internet connection and try again." || error.message === "Bad network conditions. Please try again.") {
        toast.error("No internet connection. Please check your network.");
      } else {
        // toast.error("User with this email already exists");
        toast.error("Error: " + error.message);
      }

      console.error("AxiosError:", error);
      console.error("Network Error Details: ", error.request);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TopNav />
      <div className="LandingPage">
        <div className="SignUPMainContainer">
          <div className="SignUPSemiMainContainer">
            <p>Sign up to get started</p>
            {passwordMismatch && <div className="password-mismatch">Passwords do not match</div>}
            <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 0.8, width: '40ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField 
      id="outlined-basic" 
      label="Email" variant="outlined" 
      minLength={11}
      name="emailAddress"
      onChange={handleInputChange}
      required/>
            <TextField 
      id="outlined-basic" 
      label="First Name" variant="outlined" 
      name="firstName"
      onChange={handleInputChange}
      required/>
            <TextField 
      id="outlined-basic" 
      label="Last Name" variant="outlined" 
      name="lastName"
      onChange={handleInputChange}
      required/>
            <TextField 
      id="outlined-basic" 
      label="Phone Number" variant="outlined" 
      name="phoneNumber"
      onChange={handleInputChange}
      required/>
            <TextField 
      id="outlined-basic" 
      label="Password" variant="outlined" 
      type="password"
      name="password"
      onChange={handleInputChange}
      required/>
                  <TextField 
      id="outlined-basic" 
      label="Confirm Password" variant="outlined" 
      type="password"
      name="confirmPassword"
      onChange={handleInputChange}
      required/>
      {/* <TextField id="filled-basic" label="Filled" variant="filled" />
      <TextField id="standard-basic" label="Standard" variant="standard" /> */}
    </Box>
            {/* <input
              type="email"
              id="emailInput"
              className="SignUpEmail"
              placeholder="Email"
              minLength={11}
              name="emailAddress"
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              id="firstNameInput"
              className="SignUpField"
              placeholder="First Name"
              name="firstName"
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              id="lastNameInput"
              className="SignUpField"
              placeholder="Last Name"
              name="lastName"
              onChange={handleInputChange}
              required
            />
            <select
              id="genderInput"
              className="SignUpField"
              placeholder="Gender"
              name="genderType"
              onChange={handleInputChange}
              required
            >
              <option value="" disabled selected hidden>
                Select Gender
              </option>
              <option value="male">MALE</option>
              <option value="female">FEMALE</option>
            </select>
            <input
              type="text"
              id="phoneNumberInput"
              className="SignUpField"
              placeholder="Phone Number"
              name="phoneNumber"
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              id="passwordInput"
              className="SignUpField"
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              id="confirmPasswordInput"
              className="SignUpField"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleInputChange}
              required
            /> */}
 <Stack className="upshift" spacing={1} direction="row">
  <form onSubmit={handleFormSubmit}>
    <Button type="submit" variant="contained" disabled={isDisabled}>
      {loading ? "Loading..." : "Register"}
    </Button>
  </form>
</Stack>
            {/* <form className="upshift" onSubmit={handleFormSubmit}>
              <button className="SignUpEmail1" type="submit" disabled={loading}>
                {loading ? "Loading..." : "Continue"}
              </button>
            </form> */}
            <p className="upshift">
              {" "}
              Already have an account? Login <a href="/LogIn">here</a>
            </p>
          </div>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};
