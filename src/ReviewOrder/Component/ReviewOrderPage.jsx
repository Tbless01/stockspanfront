import React, { useEffect, useState } from 'react';
import axios from '../../api/axios.js';
import SiteNameDashboard from '../../SiteNameDashboard/Component/SiteNameDashboard.jsx';
import '../Style/ReviewOrderPage.css';

const ReviewOrderPage = () => {
  const [orderDetails, setOrderDetails] = useState({
    customerName: '',
    productName: '',
    productPrice: 0,
    orderQuantity: 0,
  });

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const userEmail = localStorage.getItem('emailAddress');
        console.log('User Email:', userEmail);

        // Retrieve customer details
        const customerResponse = await axios.get(`/user/getUserDetails/${userEmail}`);
        console.log('Customer Response:', customerResponse);

        const { firstName, lastName } = customerResponse.data;

        // Retrieve product details
        const productId = localStorage.getItem('selectedProductId');
        console.log('Product ID:', productId);

        const productResponse = await axios.get(`/product/getAddedProduct/${productId}`);
        console.log('Product Response:', productResponse);

        if (customerResponse.status === 200 && productResponse.status === 200) {
          const selectedProduct = productResponse.data;

          // Update state with order details
          setOrderDetails({
            customerName: `${firstName} ${lastName}`,
            productName: selectedProduct.name,
            productPrice: parseFloat(selectedProduct.price),
            orderQuantity: parseInt(localStorage.getItem('orderQuantity')),
          });
         
          const totalOrderAmount = parseFloat(selectedProduct.price) * parseInt(localStorage.getItem('orderQuantity'));
          localStorage.setItem('totalOrderAmount', totalOrderAmount.toString());
        } else {
          console.error('Error fetching customer or product details');
        }
      } catch (error) {
        console.error('API request failed', error);
      }
    };

    fetchOrderDetails();


  }, []);
  const id = localStorage.getItem('id');

  const handleMakePayment = () => {
    window.location.href = '/MakePaymentPage';
  };

  return (
    <>
      <SiteNameDashboard />
      <div className="review-order-container">
        <h2>Review Your Order</h2>

        <div className="order-details">
          <label>Customer Name: {orderDetails.customerName}</label>
          <label>Product Name: {orderDetails.productName}</label>
          <label>Product Price: ₦{orderDetails.productPrice}</label>
          <label>Order Quantity: {orderDetails.orderQuantity}</label>
          <label>Order Id: {localStorage.getItem("uniqueId")}</label>

          <button className="make-payment-button" onClick={handleMakePayment}>
            Proceed to Payment
          </button>
          <button className="make-payment-button" onClick={() => { window.location.href = "/PlaceOrderPage"; }}>
            Back
          </button>
        </div>
      </div>
    </>
  );
};

export default ReviewOrderPage;
