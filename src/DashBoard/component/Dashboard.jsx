import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import "../../DashBoard/Style/Dashboard.css";
import SiteNameDashboard from "../../SiteNameDashboard/Component/SiteNameDashboard.jsx";

export const Dashboard = () => {
  const [showChildModal, setShowChildModal] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [displayMessage, setDisplayMessage] = useState("");
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`/user/getUserDetails/${localStorage.getItem('emailAddress')}`);

      if (response.status === 200) {
        setFirstName(response.data.firstName);
      } else {
        console.error('Error fetching user details');
      }
    } catch (error) {
      console.error('API request failed', error);
    }
  };

  const openChildModal = () => {
    setShowChildModal(true);
    setShowSidebar(false);
  };

  const closeChildModal = () => {
    setShowChildModal(false);
    setShowSidebar(true);
  };

  const handleLogout = () => {
    setShowLogoutConfirmation(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("emailAddress")
    window.location.href = "/";
  };

  const cancelLogout = () => {
    setShowLogoutConfirmation(false);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <SiteNameDashboard></SiteNameDashboard>
      <div className="Dashboard">
        {showSidebar && (
          <div className="aside">
            <div className="dp"></div>
            <div className="realLi">
              <li onClick={() => { window.location.href = "/UpdateProfile"; }}>Update profile</li>
              <li onClick={() => { window.location.href = "/OrderHistory"; }}>Check order(s)</li>
              <li onClick={handleLogout}>Logout</li>
              <li onClick={() => { window.location.href = "/report"; }}>Report A problem</li>
            </div>
          </div>
        )}

        <div className="boarder1">
          <div className="boarder2">
            <div className="board">
              <div className="boardInner1">
                <button className="addButton" onClick={() => { window.location.href = "/AddProduct"; }}>
                  Add a product
                </button>
              </div>
              <div className="boardInner1">
                <button className="addButton" onClick={() => { window.location.href = "/ProductListByEmail"; }}>
                  List of my Products
                </button>
              </div>
            </div>
          </div>

          <div className="board">
            <div className="boardInner">
              <button className="addButton" onClick={() => { window.location.href = "/ProductsAvailableForOrderExceptOwners"; }}>
                Search for available products
              </button>
            </div>
            {/* <div className="boardInner">
              <button className="addButton" onClick={() => { window.location.href = "/UserCardPage"; }}>Add Debit Card</button>
            </div> */}
          </div>

          <div className="unleash">
            <div className="Unleash">
              <link href="https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;700&display=swap" rel="stylesheet"></link>
             <div className="hellothere">Hello there, </div><span className="hi"> Welcome {firstName} </span> <br /> Savor the extraordinary capabilities of <span className="spanname"> StockSpan</span> , where innovation
              seamlessly intertwines with efficiency, unlocking a world of
              possibilities in your inventory management odyssey. Immerse yourself
              in the magic of our powerful tools, transforming everyday tasks
              into a symphony of seamless operations. Embark on this delightful
              adventure, as <span className="spanname"> StockSpan</span>  weaves its enchanting touch, turning your
              inventory management journey into a captivating tale of success and
              prosperity.
            </div>
          </div>
        </div>

        {showLogoutConfirmation && (
          <div className="notification">
            <h3>Are you sure you want to log out?</h3>
            <div className="confirmationButtons">
              <button className="yesButton" onClick={confirmLogout}>
                Yes
              </button>
              <button className="noButton" onClick={cancelLogout}>
                No
              </button>
            </div>
          </div>
        )}

        {!showSidebar && (
          <div className="sidebarToggle" onClick={toggleSidebar}>
            ❮
          </div>
        )}
      </div>
    </>
  );
};
