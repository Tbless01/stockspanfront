import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import '../Style/UpdateProfile.css';
import SiteNameDashboard from "../../SiteNameDashboard/Component/SiteNameDashboard.jsx";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';

export const UpdateProfile = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const cloudName = 'diqrpselr';

  const handleImageUpload = async (e) => {
    setLoading(true); 

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'myproductimage');

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
          },
        }
      );
      const imageUrl = response.data.secure_url;
      setImage(imageUrl);
    } catch (error) {
      console.error('Error uploading image: ', error);
    } finally {
      setLoading(false); 
    }
  };

  const saveImage = async () => {
    const emailAddress = localStorage.getItem('emailAddress');

    console.log('user profile email ' + emailAddress);
    try {
      setLoading(true); 

      await axios.put(`/user/profilePixUpdate/${emailAddress}`, {
        imageUrl: image,
      });
      window.location.href = "/DashBoard";
      console.log('Profile picture updated successfully.');
    } catch (error) {
      console.error('Error updating product image: ', error);
    } finally {
      setLoading(false); 
    }
  };

  const cancelUpload = () => {
    setImage(null);
  };





  return (
    <>
    <SiteNameDashboard></SiteNameDashboard>
    <div className="outerContainer">
    <div className="container">
    <p2 className="headingImageText">Upload lovely picture of you! </p2>
    <div className="bodyImageText">Change your profile picture</div>
    <div className="container">
      <p1 className="imageText">upload now!</p1>
      
      <input type="file" onChange={handleImageUpload} className="input-file" />
      {loading ? (
        <div className="loading-container">
          <p className="loading-message">Uploading...</p>
          <p className="upload-progress">{uploadProgress}%</p>
        </div>
      ) : (
        image && (
          <div>
            <img src={image} alt="Uploaded" className="uploaded-image" />










<Box sx={{ '& button': { m: 0.5 } }}>
      <div>
        <Button variant="outlined" size="small" onClick={saveImage}>
          Save
        </Button>
        <Button variant="outlined" size="medium" onClick={cancelUpload}>
          Cancel
        </Button>
      </div>
    </Box>


            {/* <div>
              <button onClick={saveImage}>Save Image</button>
              <button onClick={cancelUpload}>Cancel</button>
            </div> */}
          </div>
        )
      )}
    </div></div>
    </div>
    </>
  );
};

