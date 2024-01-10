    import React, { useState, useEffect } from "react";
    import '../Style/SiteNameDashboard.css'
    import axios from '../../api/axios';

    import AppBar from '@mui/material/AppBar';
    import Box from '@mui/material/Box';
    import Toolbar from '@mui/material/Toolbar';
    import IconButton from '@mui/material/IconButton';
    import Typography from '@mui/material/Typography';
    import Menu from '@mui/material/Menu';
    import MenuIcon from '@mui/icons-material/Menu';
    import Container from '@mui/material/Container';
    import Avatar from '@mui/material/Avatar';
    import Button from '@mui/material/Button';
    import Tooltip from '@mui/material/Tooltip';
    import MenuItem from '@mui/material/MenuItem';
    import AdbIcon from '@mui/icons-material/Adb';
    import Stack from '@mui/material/Stack';


    const TopNav = () => {

      const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
      const [userImage, setUserImage] = useState('');
      const [emailAddress, setEmailAddress] = useState('');
      



  useEffect(() => {
    const storedEmail = localStorage.getItem('emailAddress');
    if (storedEmail) {
      setEmailAddress(storedEmail);
      fetchUserDetails(storedEmail);
    }
  }, []);

  const fetchUserDetails = async (storedEmail) => {
    try {
      const response = await axios.get(`/user/getUserDetails/${storedEmail}`);
      const imageUrl = response.data.imageUrl;
      if (imageUrl) {
        setUserImage(imageUrl);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

    
      
    const pages = ['Sign Up', 'Login','Contact', 'About Us'];
    const settings = ['Profile', 'My Orders', 'Dashboard', 'Logout'];

        const [anchorElNav, setAnchorElNav] = React.useState(null);
        const [anchorElUser, setAnchorElUser] = React.useState(null);
      
        const handleOpenNavMenu = (event) => {
          setAnchorElNav(event.currentTarget);
        };
        const handleOpenUserMenu = (event) => {
          setAnchorElUser(event.currentTarget);
        };
      
        const handleCloseNavMenu = () => {
          setAnchorElNav(null);
        };
      
        const handleCloseUserMenu = () => {
          setAnchorElUser(null);
        };
        const handleRedirect = (route) => {
          if (route === 'Sign Up') {
            window.location.href = '/SignUp';
          }
          else if (route === 'Login') {
            window.location.href = '/Login';
          } 
          else if (route === 'Contact') {
            window.location.href = '/ContactUs';
          } else {
            window.location.href = `/${route}`;
          }
        };


        const confirmLogout = () => {
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("emailAddress")
          window.location.href = "/";
        };
      
        const cancelLogout = () => {
          setShowLogoutConfirmation(false);
          // window.location.href = '/Dashboard';
        };
        
        const handleSettings = (setting) => {
          if (setting === 'Logout') {
            setShowLogoutConfirmation(true);
          }
          else if (setting === 'Profile'){
            window.location.href = '/UpdateProfile';
          }
          else if (setting === 'Dashboard'){
            window.location.href = '/Dashboard';
          }
            else if (setting === 'My Orders'){
              window.location.href = '/OrderHistory';
            }
        };
      

      return (
        <>
        <div className="LandingTopNav">
        <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/Dashboard"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                fontSize: '2rem',
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              STOCKSPAN
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} 
                  onClick={() => handleRedirect(page.replace(' ', ''))}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              STOCKSPAN
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handleRedirect(page.replace(' ', ''))}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="" src={userImage}  sx={{ width: 70, height: 70 }}/>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting,index) => (
                  <MenuItem key={index} onClick={() => handleSettings(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>


        {/* <div className="LandingTopNav">


          
          <span class="StockSpanname" onClick={() => { window.location.href="/"}}>StockSpan</span>
          <ul className="Landing">
          <li onClick={() => { window.location.href = "/SignUp" }}>Sign Up</li>
          <li onClick={() => { window.location.href = "/LogIn" }}>Log In</li>
          <li>Contact</li>
          <li onClick={() => { window.location.href = "/AboutUs" }}>About Us</li>
          </ul> */}


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




      </div>
      {showLogoutConfirmation && (
              <div className="notification">
                <h3>Are you sure you want to log out?</h3>
                <Stack spacing={2} direction="row">
          <Button variant="outlined" onClick={confirmLogout}>Yes</Button>
          <Button variant="outlined" onClick={cancelLogout}>No</Button>
        </Stack>
              </div>
            )}
      </>
      );
    };

    export default TopNav;
