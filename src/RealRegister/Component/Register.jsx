import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../RealRegister/Style/Register.css";
import axios from "../../../src/api/axios";
import SiteName from "../../SiteName/Component/SiteName";

export const Register = () => {
  const [genderType, setGenderType] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "genderType") {
      setGenderType(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
    if (e.target.name === "confirmPass") {
      setConfirmPass(e.target.value);
    }
    if (e.target.name === "firstName") {
      setFirstName(e.target.value);
    }
    if (e.target.name === "lastName") {
      setLastName(e.target.value);
    }
    if (e.target.name === "phoneNumber") {
      setPhoneNumber(e.target.value);
    }
  };

  const emailAddress = localStorage.getItem("emailAddress");

  const data = {
    emailAddress: emailAddress,
    genderType: genderType,
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    password: password,
    confirmPass: confirmPass,
  };

  console.log(data);

  const saveToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };

  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };

  const registerUser = async () => {
    if (password === confirmPass) {
      try {
        const response = await axios.post("/auth/register", data);
        const jwtToken = response.data.data;
        toast.success("Registration successful");
        window.location.href = "/dashboard";
      } catch (error) {
        toast.error("Registration Failed!!!\nInvalid Credentials");
        console.error("Error:", error);
      }
    } else {
      toast.error("Password and confirmation password do not match");
    }
  };

  const isDisabled = genderType && password && confirmPass;

  return (
    <>
    <SiteName></SiteName>
    <div className="LandingPage DarkBackground">
      <div className="RegisterSemiMain">
        <div className="real3">
          <p className="RealT">Enter first name</p>
          <input
            type="text"
            name="firstName"
            className="Real"
            value={firstName}
            placeholder="First Name"
            onChange={handleChange}
          />
        </div>
        <div className="real3">
          <p className="RealT">Enter last name</p>
          <input
            type="text"
            name="lastName"
            className="Real"
            value={lastName}
            placeholder="Last Name"
            onChange={handleChange}
          />
        </div>
        <div className="real3">
          <p className="RealT">Enter Phone Number</p>
          <input
            type="text"
            name="phoneNumber"
            className="Real"
            value={phoneNumber}
            placeholder="Phone Number"
            onChange={handleChange}
          />
        </div>
        <label htmlFor="genderType">Select Gender:</label>
        <select
          id="genderType"
          name="genderType"
          value={genderType}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </select>

        <div className="real3">
          <p className="RealT">Enter Password</p>
          <input
            type="password"
            name="password"
            className="Real"
            value={password}
            placeholder="Password"
            onChange={handleChange}
          />
        </div>
        <div className="real3">
          <p className="RealT">Confirm Password</p>
          <input
            type="password"
            name="confirmPass"
            className="Real"
            value={confirmPass}
            placeholder="Confirm Password"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="RealContinue" onClick={registerUser} disabled={!isDisabled}>
          Get started
        </button>
        <ToastContainer />
      </div>
      </div>
    </>
  );
};





// import React, { useState, useEffect } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "../../RealRegister/Style/Register.css";
// import axios from "../../../src/api/axios";

// export const Register = () => {
//   const [genderType, setGenderType] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPass, setConfirmPass] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [jwtToken, setJwtToken] = useState(""); // State to store the JWT token

//   const handleChange = (e) => {
//     if (e.target.name === "gender") {
//       setGenderType(e.target.value);
//     }
//     if (e.target.name === "password") {
//       setPassword(e.target.value);
//     }
//     if (e.target.name === "confirmPass") {
//       setConfirmPass(e.target.value);
//     }
//     if (e.target.name === "firstName") {
//       setFirstName(e.target.value);
//     }
//     if (e.target.name === "lastName") {
//       setLastName(e.target.value);
//     }
//     if (e.target.name === "phoneNumber") {
//       setPhoneNumber(e.target.value);
//     }
//   };

//   useEffect(() => {
//     // When the component mounts, check if a token is stored in local storage
//     const token = getToken();
//     if (token) {
//       setJwtToken(token);
//     }
//   }, []);

//   const emailAddress = localStorage.getItem("emailAddress");

//   const data = {
//     emailAddress: emailAddress,
//     genderType: genderType,
//     firstName: firstName,
//     lastName: lastName,
//     phoneNumber: phoneNumber,
//     password: password,
//     confirmPass: confirmPass,
//   };

//   console.log(data);

//   const saveToken = (token) => {
//     setJwtToken(token); // Save the token in the component's state
//     localStorage.setItem("jwtToken", token); // Optionally, save it in local storage
//   };

//   const getToken = () => {
//     return jwtToken; // Get the stored token from the state
//   };

//   const registerUser = async () => {
//     if (password === confirmPass) {
//       try {
//         const response = await axios.post("/auth/register", data);
//         const jwtToken = response.data.token; // Assuming the server sends a token
//         saveToken(jwtToken); // Save the token
//         toast.success("Registration successful");
//       } catch (error) {
//         toast.error("Registration Failed!!!\nInvalid Credentials");
//         console.error("Error:", error);
//       }
//     } else {
//       toast.error("Password and confirmation password do not match");
//     }
//   };

//   const isDisabled = genderType && password && confirmPass;

//   return (
//     <>
//       <div className="RegisterSemiMain">
//         <div className="real3">
//           <p className="RealT">Enter first name</p>
//           <input
//             type="text"
//             name="firstName"
//             className="Real"
//             value={firstName}
//             placeholder="First Name"
//             onChange={handleChange}
//           />
//         </div>
//         <div className="real3">
//           <p className="RealT">Enter last name</p>
//           <input
//             type="text"
//             name="lastName"
//             className="Real"
//             value={lastName}
//             placeholder="Last Name"
//             onChange={handleChange}
//           />
//         </div>
//         <div className="real3">
//           <p className="RealT">Enter Phone Number</p>
//           <input
//             type="text"
//             name="phoneNumber"
//             className="Real"
//             value={phoneNumber}
//             placeholder="Phone Number"
//             onChange={handleChange}
//           />
//         </div>
//         <label htmlFor="genderType">Select Gender:</label>
//         <select
//           id="genderType"
//           name="gender"
//           value={genderType}
//           onChange={handleChange}
//         >
//           <option value="">Select</option>
//           <option value="MALE">Male</option>
//           <option value="FEMALE">Female</option>
//         </select>

//         <div className="real3">
//           <p className="RealT">Enter Password</p>
//           <input
//             type="password"
//             name="password"
//             className="Real"
//             value={password}
//             placeholder="Password"
//             onChange={handleChange}
//           />
//         </div>
//         <div className="real3">
//           <p className="RealT">Enter Password again</p>
//           <input
//             type="password"
//             name="confirmPass"
//             className="Real"
//             value={confirmPass}
//             placeholder="Confirm Password"
//             onChange={handleChange}
//           />
//         </div>

//         <button type="submit" className="RealContinue" onClick={registerUser} disabled={!isDisabled}>
//           Get started
//         </button>
//         <ToastContainer />
//       </div>
//     </>
//   );
// };
