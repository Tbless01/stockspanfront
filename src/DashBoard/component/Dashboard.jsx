import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import "../../DashBoard/Style/Dashboard.css";
import SiteNameDashboard from "../../SiteNameDashboard/Component/SiteNameDashboard";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

export const Dashboard = () => {
  const [showChildModal, setShowChildModal] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [displayMessage, setDisplayMessage] = useState("");
  const [firstName, setFirstName] = useState("");

  const images = [
    {
      url:    "https://costco97.com/wp-content/uploads/2022/01/Avalanche-Ladies-Ultimate-Thermal-Sock-1526058-400x300.jpg",    
      title: 'Shop Now',
      width: '40%',
    },
  
    {
      url: "https://th.bing.com/th/id/R.7af2f143c8b6370f0c30a6b2ee05a8fb?rik=FDwnV7l7dOih0w&pid=ImgRaw&r=0",
      title: 'Add Product',
      width: '30%',
    },
    
    {

      url: "https://th.bing.com/th/id/OIP.Jd6lspiA8FuIEaIsdVVm3AHaEK?rs=1&pid=ImgDetMain",
      // url: "https://hip2save.com/wp-content/uploads/2020/06/Women%E2%80%99s-Tranquility-Skort-2.jpg?resize=1024%2C768&strip=all",
      title: 'My Store',
      width: '30%',
    },
  ];
  
  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('sm')]: {
      width: '100% !important', 
      height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
      zIndex: 1,
      '& .MuiImageBackdrop-root': {
        opacity: 0.15,
      },
      '& .MuiImageMarked-root': {
        opacity: 0,
      },
      '& .MuiTypography-root': {
        border: '4px solid currentColor',
      },
    },
  }));
  
  const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  });
  
  const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  }));
  
  const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  }));
  
  const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  }));
  const handleImageClick = (title) => {
    if (title === 'Add Product') {
      window.location.href = '/AddProduct';
    } else if (title === 'Shop Now') {
      window.location.href = '/ProductsAvailableForOrderExceptOwners';
    } else if (title === 'My Store') {
      window.location.href = '/ProductListByEmail';
    }
  };



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

  // const confirmLogout = () => {
  //   localStorage.removeItem("jwtToken");
  //   localStorage.removeItem("emailAddress")
  //   window.location.href = "/";
  // };

  // const cancelLogout = () => {
  //   setShowLogoutConfirmation(false);
  // };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <SiteNameDashboard />
      <div className="Dashboard">
        

      
        {/* {showSidebar && (
          <div className="aside">
            <div className="dp"></div>
            <div className="realLi">
              <li onClick={() => { window.location.href = "/UpdateProfile"; }}>Update profile</li>
              <li onClick={() => { window.location.href = "/OrderHistory"; }}>Check order(s)</li>
              <li onClick={handleLogout}>Logout</li>
              <li onClick={() => { window.location.href = "/report"; }}>Report A problem</li>
            </div>
          </div>
        )} */}
        <div className="boarder1">






        <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
      {images.map((image) => (
        <ImageButton
          focusRipple
          key={image.title}
          style={{
            width: image.width,
          }}
          onClick={() => handleImageClick(image.title)}
        >
          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Box>





{/*           
          <div className="boarder2">
            <div className="board">
              <div className="boardInner1">
                <button className="addButton" onClick={() => { window.location.href = "/AddProduct"; }}>
                  Add a product
                </button>
              </div>
              <div className="boardInner1">
                <button className="addButton" onClick={() => { window.location.href = "/ProductListByEmail"; }}>
                  List of my Store
                </button>
              </div>
            </div>
          </div>

          <div className="board">
            <div className="boardInner">
              <button className="addButton" onClick={() => { window.location.href = "/StoreAvailableForOrderExceptOwners"; }}>
                Search for available Store
              </button>
            </div>
          </div> */}






          <div className="unleash">
            <div className="Unleash">
              <link href="https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;700&display=swap" rel="stylesheet"></link>
             <div className="hellothere">Hello there, </div><span className="hi"> Welcome {firstName} </span> <br />  <div className="savor"> Savor the extraordinary capabilities of <span className="spanname"> StockSpan</span> , where innovation
              seamlessly intertwines with efficiency, unlocking a world of
              possibilities in your inventory management odyssey. Immerse yourself
              in the magic of our powerful tools, transforming everyday tasks
              into a symphony of seamless operations. Embark on this delightful
              adventure, as <span className="spanname"> StockSpan</span>  weaves its enchanting touch, turning your
              inventory management journey into a captivating tale of success and
              prosperity.
              <div class="welcome-container">
               <h1 class="welcome-text">Welcome to the best Sales and Inventory Mangement Site</h1>
              </div>

            </div>  
              {/* <div class="welcome-container">
               <h1 class="welcome-text">Welcome to the Inventory Site</h1>
              </div> */}
            </div>
          </div>
        </div>

        {/* {showLogoutConfirmation && (
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
        )} */}

        {!showSidebar && (
          <div className="sidebarToggle" onClick={toggleSidebar}>
            ❮
          </div>
        )}
      </div>
    </>
  );
};
