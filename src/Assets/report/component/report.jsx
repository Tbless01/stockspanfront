import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Style/report.css";

const Report = () => {
  const [problemDetails, setProblemDetails] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success("Problem submitted successfully!");
    setProblemDetails(""); 
  };

  return (
    <div className="report-problem-container">
      <h2>Report a Problem</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Please describe the problem..."
          value={problemDetails}
          onChange={(e) => setProblemDetails(e.target.value)}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      <ToastContainer /> {""}
    </div>
  );
};

export default Report;
