import React from "react";
import "../Style/LandingPage.css";
import TopNav from "../../TopNav/Component/TopNav";
import inventoryImage from "../../Assets/image_inventory_management.jpg";
export const LandingPage = () => {
  return (
    <>
      <TopNav/>
      <div className="LandingPage">
        <div className="LandingPageMainContainer">
          <div className="BlueBox">
            <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500&display=swap" rel="stylesheet"></link>
            <h1 className="LandingPageBigText">Elevate Your Sales</h1>
            <img src={inventoryImage} alt="Inventory" className="InventoryImage" /> 
            <h2 className="LandingPageBigText2">
              Transform your inventory management into a seamless and efficient process to maximize your sales potential.
            </h2>
            <a href="/SignUp" className="LandingPageBlackButton">Get Started</a>
          </div>
        </div>
      </div>
    </>
  );
};
