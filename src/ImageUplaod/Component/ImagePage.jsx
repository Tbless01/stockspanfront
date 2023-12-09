import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import '../Style/ImagePage.css';
import SiteNameDashboard from "../../SiteNameDashboard/Component/SiteNameDashboard.jsx";

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
            <div>
              <button onClick={saveImage}>Save Image</button>
              <button onClick={cancelUpload}>Cancel</button>
            </div>
          </div>
        )
      )}
    </div></div>
    </div>
    </>
  );
};

// // ImagePage.jsx

// import React, { useState, useCallback } from 'react';
// import axios from '../../api/axios';
// import Cropper from 'react-easy-crop';
// import { getCroppedImg } from '../Component/ImageUtils'; // Ensure the correct path
// import '../Style/ImagePage.css';

// export const ImagePage = () => {
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedArea, setCroppedArea] = useState(null);
//   const [croppedImage, setCroppedImage] = useState(null); // Added missing state
//   const [productId, setProductId] = useState(null); // Add productId state

//   const cloudName = 'diqrpselr';

//   const maxCropWidth = 200; // Set your desired maximum crop width
//   const maxCropHeight = 150; // Set your desired maximum crop height

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', 'myproductimage');

//     try {
//       const response = await axios.post(
//         `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
//         formData
//       );
//       const imageUrl = response.data.secure_url;
//       setImage(imageUrl);
//     } catch (error) {
//       console.error('Error uploading image: ', error);
//     }
//   };

//   const handleCropChange = useCallback((newCrop) => {
//     setCrop(newCrop);
//   }, []);

//   const handleZoomChange = useCallback((newZoom) => {
//     setZoom(newZoom);
//   }, []);

//   const handleCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
//     setCroppedArea(croppedAreaPixels);
//   }, []);

//   const handleSaveCroppedImage = async () => {
//     try {
//       const croppedImg = await getCroppedImg(image, croppedArea);
//       setCroppedImage(croppedImg);
//       console.log('Cropped Image:', croppedImg);
//     } catch (error) {
//       console.error('Error cropping image: ', error);
//     }
//   };

//   const saveImage = async () => {
//     setLoading(true);

//     const imageUrl = croppedImage || image;

//     try {
//       await axios.put(`/product/upload-image/${productId}`, {
//         imageUrl,
//       });

//       console.log('Product image updated successfully.');
//     } catch (error) {
//       console.error('Error updating product image: ', error);
//     } finally {
//       setLoading(false);
//       // Reset cropped image state after saving
//       setCroppedImage(null);
//     }
//   };

//   const cancelUpload = () => {
//     setImage(null);
//     // Reset cropped image state after canceling
//     setCroppedImage(null);
//   };

//   return (
//     <div className="container">
//       <input type="file" onChange={handleImageUpload} className="input-file" />
//       {loading ? (
//         <p className="loading-message">Uploading...</p>
//       ) : (
//         image && (
//           <div>
//             <Cropper
//               image={image}
//               crop={crop}
//               zoom={zoom}
//               aspect={4 / 3}
//               onCropChange={handleCropChange}
//               onZoomChange={handleZoomChange}
//               onCropComplete={handleCropComplete}
//               restrictPosition={false}
//               maxZoom={3} // You can adjust this value based on your needs
//               maxCropWidth={maxCropWidth}
//               maxCropHeight={maxCropHeight}
//             />
//             <div>
//               <button onClick={handleSaveCroppedImage}>Save Cropped Image</button>
//               <button onClick={saveImage}>Save Image</button>
//               <button onClick={cancelUpload}>Cancel</button>
//             </div>
//           </div>
//         )
//       )}
//     </div>
//   );
// };
