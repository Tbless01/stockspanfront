import React from 'react';
import '../../TopNav/Style/TopNav.css'

const TopNav = () => {
  return (
    <div className="LandingPageTopNav">
    <div className="LandingPageTopNavText">
    <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet"></link>
    <span class="site-name" onClick={() => { window.location.href="/"}}>StockSpan</span>
    </div>
  </div>
  );
};

export default TopNav;
