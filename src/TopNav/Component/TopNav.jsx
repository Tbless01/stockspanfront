import React from 'react';
import '../Style/TopNav.css'

const TopNav = () => {
  return (
    <div className="LandingPageTopNav">
    <div className="LandingPageTopNavText">
    <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet"></link>
    <span class="site-name" onClick={() => { window.location.href="/"}}>StockSpan</span>
      <ul>
      <li onClick={() => { window.location.href = "/SignUp" }}>Sign Up</li>
      <li onClick={() => { window.location.href = "/LogIn" }}>Log In</li>
      <li>Contact</li>
      <li onClick={() => { window.location.href = "/AboutUs" }}>About Us</li>
      </ul>
    </div>
  </div>
  );
};

export default TopNav;
