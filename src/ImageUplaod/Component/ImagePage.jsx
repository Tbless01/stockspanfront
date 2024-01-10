import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import '../Style/ImagePage.css';
import SiteNameDashboard from "../../SiteNameDashboard/Component/SiteNameDashboard.jsx";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export const ImagePage = () => {
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
    const productId = localStorage.getItem('productId');

    console.log('product id ' + productId);
    try {
      setLoading(true); 

      await axios.put(`/product/upload-image/${productId}`, {
        imageUrl: image,
      });
      window.location.href = "/ProductListByEmail";
      console.log('Product image updated successfully.');
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
    <p2 className="headingImageText">Bring your product to life! </p2>
    <div className="bodyImageText">Add clear and attractive images that grab attention and increase your chances of making a sale. Elevate your online presence with stunning visuals</div>
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

