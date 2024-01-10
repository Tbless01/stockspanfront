import React from 'react';
import '../../TopNav/Style/TopNav.css'

const TopNav = () => {
  return (
    <div className="LandingTopNavs">
    <span class="StockSpanname" onClick={() => { window.location.href="/"}}>StockSpan</span>
    </div>
  );
};

export default TopNav;
