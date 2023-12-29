import React, { useState, useEffect } from "react";
import "../../Authentication/Style/Authentication.css";
import axios from "../../../src/api/axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopNav from "../../TopNav/Component/TopNav";

export const Authentication = () => {
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(() => {
    // Retrieve countdown value from sessionStorage or set default (900 seconds)
    const storedCountdown = sessionStorage.getItem("countdown");
    return storedCountdown ? parseInt(storedCountdown, 10) : 900;
  });
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    // Start the countdown when the component mounts
    if (countdown > 0) {
      setTimer(
        setInterval(() => {
          setCountdown((prevCountdown) => {
            const newCountdown = prevCountdown - 1;
            // Save countdown value to sessionStorage
            sessionStorage.setItem("countdown", newCountdown.toString());
            return newCountdown;
          });
        }, 1000)
      );
    } else {
      // Clear the timer if the countdown reaches zero
      clearInterval(timer);
    }

    // Clear the timer when the component unmounts
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [countdown, timer]);

  function handleChange(e) {
    setOtp(e.target.value);
  }

  const confirmOtp = async () => {
    try {
      const response = await axios.post(`/verifyEmail/sendOtp/confirmOtp?otp=${encodeURIComponent(otp)}`);
      if (response.data.successful === true) {
        toast.success("An OTP has been sent to your email");
        window.location.href = "/Register";
      } else {
        toast.error("Invalid OTP");
      }
    } catch (error) {
      toast.error("Network unavailable");
      console.error("AxiosError:", error);
      console.error("Network Error Details: ", error.request);
    }
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <>
      <TopNav />
      <div className="LandingPage DarkBackground">
        <div className="AuthenticationMainContainer">
          <div className="AuthenticationSemiMain">
            Enter OTP
            <input
              type="digit"
              id="emailInput"
              className="AuthenticationEmail"
              minLength={11}
              name="otp"
              onChange={handleChange}
            />
            <div className="AuthenticationEmail1" onClick={confirmOtp}>
              Verify
            </div>
            <div className="CountdownTimer">
              Time remaining: {formatTime(countdown)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
