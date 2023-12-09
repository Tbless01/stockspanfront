import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import '../../ProductAdded/Style/ProductAdded.css';
import SiteNameDashboard from "../../SiteNameDashboard/Component/SiteNameDashboard.jsx";

export const ProductAdded = () => {
  const location = useLocation(); // Use the useLocation hook to access location.state
  const productName = location.state?.productName; // Extract 'productName' from location.state

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!productName) {
      // Check if productName is undefined
      console.error('Product name is missing in location.state');
      return;
    }

    axios
      .get(`/product/getAddedProducts/${productName}`)
      .then((response) => {
        const productData = response.data;
        setProduct(productData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [productName]);

  return (
    <div>
      <SiteNameDashboard></SiteNameDashboard>
      <h2>Product Successfully Added</h2>
      {/* {product ? (
        <div>
          <p>Name: {product.name}</p>
          <p>Price: {product.price}</p>
          <p>Stock: {product.stock}</p>
          <p>Description: {product.description}</p>
        </div>
      ) : (
        <p>Product information loaded...</p>
      )} */}
      <button onClick={() => window.location.href = '/Dashboard'}>
        Back to Add Dashboard
      </button>
      <button onClick={() => window.location.href = '/AddProduct'}>
        Add another product
      </button>
      <ToastContainer />
    </div>
  );
};
