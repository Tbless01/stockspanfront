import React, { useState } from "react";
import axios from "../../../src/api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../LogIn/Style/login.css";
import TopNav from "../../TopNav/Component/TopNav";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";

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
  const isDisabled = !(emailAddress && password);

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
      <TopNav />
      <div className="LoginMainContainer">
        <div className="LoginSemiMain">
          <div className="signin"> Sign In</div><br></br>
          <div className="welcomeback">Welcome Back! <br></br>Enter your login details to access your account</div>
          <Box className="nextline"
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="standard-basic"
        label="Email"
        variant="standard"
        minLength={11}
        name="emailAddress"
        onChange={handleChange} />
        
      <TextField
       id="standard-basic"
       label="Password" 
       variant="standard"
       type="password"
       className="LoginEmail"
       name="password"
       onChange={handleChange} />
    </Box>


          {/* <input
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
          /> */}
          
 <Stack className="upshift" spacing={1} direction="row">
          <Button
          variant="outlined" 
            type="button"
            className="Login"
            onClick={userLogin}
            disabled={isDisabled}
            // disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
</Stack>
        
          <div className="noAccount">If you don't have an account <u onClick={() => window.location.href = '/SignUp'} className="regButton">Register</u></div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
