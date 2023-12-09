// import React, { useState, useEffect } from 'react';
// import axios from '../../api/axios';
// import '../Style/PlaceOrderPage.css';
// import SiteNameDashboard from '../../SiteNameDashboard/Component/SiteNameDashboard.jsx';

// export const PlaceOrderPage = () => {
//   const [orderDetails, setOrderDetails] = useState({
//     customerName: '',
//     emailAddress: '',
//     phoneNumber: '',
//     orderId: '',
//     product: {
//       name: '',
//       id: '',
//     },
//     orderQuantity: 0,
//     dateOrdered: '',
//   });

//   useEffect(() => {
//     fetchUserDetails();
//     fetchProductDetails();
//   }, []);

//   const fetchUserDetails = async () => {
//     try {
//       const response = await axios.get(`/user/getUserDetails/${localStorage.getItem('emailAddress')}`);
//       if (response.status === 200) {
//         const { firstName, lastName, emailAddress, phoneNumber } = response.data;
//         setOrderDetails((prevDetails) => ({
//           ...prevDetails,
//           customerName: `${firstName} ${lastName}`,
//           emailAddress,
//           phoneNumber,
//         }));
//       } else {
//         console.error('Error fetching user details');
//       }
//     } catch (error) {
//       console.error('API request failed', error);
//     }
//   };

//   const fetchProductDetails = async () => {
//     try {
//       const productId = localStorage.getItem('selectedProductId');
//       const productResponse = await axios.get(`/product/getAddedProduct/${productId}`);
      
//       if (productResponse.status === 200) {
//         const selectedProduct = productResponse.data;

//         setOrderDetails((prevDetails) => ({
//           ...prevDetails,
//           product: {
//             name: selectedProduct.name,
//             id: selectedProduct.id,
//           },
//           orderId: selectedProduct.id,
//         }));
//       } else {
//         console.error('Error fetching product details');
//       }
//     } catch (error) {
//       console.error('API request failed', error);
//     }
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setOrderDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//     if (name === 'orderQuantity') {
//       localStorage.setItem('orderQuantity', value);
//     }
//   };

//   const placeOrder = async () => {
//     if (orderDetails.orderQuantity <= 0) {
//       alert('Kindly input the number of products to purchase.');
//       return;
//     }

//     try {
//       const productId = localStorage.getItem('selectedProductId');
//       const productResponse = await axios.get(`/product/getAddedProduct/${productId}`);
      
//       if (productResponse.status === 200) {
//         const selectedProduct = productResponse.data;

//         if (orderDetails.orderQuantity > selectedProduct.stock) {
//           alert(`Available number of product in stock is ${selectedProduct.stock}. Please adjust the order quantity.`);
//           return;
//         }

//         console.log('Order placed successfully:', orderDetails);
//         window.location.href = `/ReviewOrderPage`;
//       } else {
//         console.error('Error fetching product details');
//       }
//     } catch (error) {
//       console.error('API request failed', error);
//     }
//   };

//   return (
//     <>
//       <SiteNameDashboard />
//       <div className="place-order-container">
//         <h2>Place an Order</h2>

//         <div className="order-details">
//           <label>Customer Name: {orderDetails.customerName}</label>
//           <label>Email Address: {orderDetails.emailAddress}</label>
//           <label>Phone Number: {orderDetails.phoneNumber}</label>

//           <label>Product Name: {orderDetails.product.name}</label>

//           <label>
//             Order Quantity:
//             <input
//               type="number"
//               name="orderQuantity"
//               value={orderDetails.orderQuantity}
//               onChange={handleInputChange}
//             />
//           </label>

//           <button className="place-order-button" onClick={placeOrder}>
//             Proceed
//           </button>
//           <button className="place-order-button" onClick={() => { window.location.href = "/ProductsAvailableForOrderExceptOwners"; }}>
//             Back to products list
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };



// import React, { useState, useEffect } from 'react';
// import axios from '../../api/axios';
// import '../Style/PlaceOrderPage.css';
// import SiteNameDashboard from '../../SiteNameDashboard/Component/SiteNameDashboard.jsx';

// export const PlaceOrderPage = () => {
//   const [orderDetails, setOrderDetails] = useState({
//     customerName: '',
//     emailAddress: '',
//     phoneNumber: '',
//     orderId: '',
//     product: {
//       name: '',
//       id: '',
//     },
//     orderQuantity: 0,
//     dateOrdered: '',
//   });

//   useEffect(() => {
//     fetchUserDetails();
//     fetchProductDetails();
//   }, []);

//   const fetchUserDetails = async () => {
//     try {
//       const response = await axios.get(`/user/getUserDetails/${localStorage.getItem('emailAddress')}`);
//       if (response.status === 200) {
//         const { firstName, lastName, emailAddress, phoneNumber } = response.data;
//         setOrderDetails((prevDetails) => ({
//           ...prevDetails,
//           customerName: `${firstName} ${lastName}`,
//           emailAddress,
//           phoneNumber,
//         }));
//       } else {
//         console.error('Error fetching user details');
//       }
//     } catch (error) {
//       console.error('API request failed', error);
//     }
//   };

//   const fetchProductDetails = async () => {
//     try {
//       const productId = localStorage.getItem('selectedProductId');
//       const productResponse = await axios.get(`/product/getAddedProduct/${productId}`);
      
//       if (productResponse.status === 200) {
//         const selectedProduct = productResponse.data;

//         setOrderDetails((prevDetails) => ({
//           ...prevDetails,
//           product: {
//             name: selectedProduct.name,
//             id: selectedProduct.id,
//           },
//           orderId: selectedProduct.id,
//         }));
//       } else {
//         console.error('Error fetching product details');
//       }
//     } catch (error) {
//       console.error('API request failed', error);
//     }
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setOrderDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//     if (name === 'orderQuantity') {
//       localStorage.setItem('orderQuantity', value);
//     }
//   };

//   const placeOrder = async () => {
//     if (orderDetails.orderQuantity <= 0) {
//       alert('Kindly input the number of products to purchase.');
//       return;
//     }

//     try {
//       const userEmail = localStorage.getItem('emailAddress');
//       const productId = localStorage.getItem('selectedProductId');
//       const productResponse = await axios.get(`/product/getAddedProduct/${productId}`);
      
//       if (productResponse.status === 200) {
//         const selectedProduct = productResponse.data;

//         if (orderDetails.orderQuantity > selectedProduct.stock) {
//           alert(`Available number of product in stock is ${selectedProduct.stock}. Please adjust the order quantity.`);
//           return;
//         }

//         // Make a POST request to place the order
//         const response = await axios.post(`/order/placeOrder/${userEmail}`, {
//           customerName: orderDetails.customerName,
//           emailAddress: orderDetails.emailAddress,
//           phoneNumber: orderDetails.phoneNumber,
//           orderId: orderDetails.orderId,
//           product: {
//             name: orderDetails.product.name,
//             id: orderDetails.product.id,
//           },
//           orderQuantity: orderDetails.orderQuantity,
//         });

//         if (response.status === 200) {
//           console.log('Order placed successfully:', response.data);
//           window.location.href = `/ReviewOrderPage`;
//         } else {
//           console.error('Error placing order');
//         }
//       } else {
//         console.error('Error fetching product details');
//       }
//     } catch (error) {
//       console.error('API request failed', error);
//     }
//     window.location.href = "/MakePaymentPage";
//   };

//   return (
//     <>
//       <SiteNameDashboard />
//       <div className="place-order-container">
//         <h2>Place an Order</h2>

        
//          <div className="order-details">
//            <label>Customer Name: {orderDetails.customerName}</label>
//            <label>Email Address: {orderDetails.emailAddress}</label>
//            <label>Phone Number: {orderDetails.phoneNumber}</label>
//            <label>Product Name: {orderDetails.product.name}</label>

//            <label>
//              Order Quantity:
//              <input
//               type="number"
//               name="orderQuantity"
//               value={orderDetails.orderQuantity}
//                onChange={handleInputChange}
//             />
//           </label>
          
//           <button className="place-order-button" onClick={placeOrder}>
//             Proceed
//           </button>
//           <button className="place-order-button" onClick={() => { window.location.href = "/ProductsAvailableForOrderExceptOwners"; }}>
//             Back to products list
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };




// import React, { useState, useEffect } from 'react';
// import axios from '../../api/axios';
// import '../Style/PlaceOrderPage.css';
// import SiteNameDashboard from '../../SiteNameDashboard/Component/SiteNameDashboard.jsx';

// export const PlaceOrderPage = () => {
//   const [orderDetails, setOrderDetails] = useState({
//     customerName: '',
//     emailAddress: '',
//     phoneNumber: '',
//     orderId: '',
//     product: {
//       name: '',
//       id: '',
//     },
//     orderQuantity: 0,
//     dateOrdered: '',
//   });

//   useEffect(() => {
//     fetchUserDetails();
//     fetchProductDetails();
//   }, []);

//   const fetchUserDetails = async () => {
//     try {
//       const response = await axios.get(`/user/getUserDetails/${localStorage.getItem('emailAddress')}`);
//       if (response.status === 200) {
//         const { firstName, lastName, emailAddress, phoneNumber } = response.data;
//         setOrderDetails((prevDetails) => ({
//           ...prevDetails,
//           customerName: `${firstName} ${lastName}`,
//           emailAddress,
//           phoneNumber,
//         }));
//       } else {
//         console.error('Error fetching user details');
//       }
//     } catch (error) {
//       console.error('API request failed', error);
//     }
//   };

//   const fetchProductDetails = async () => {
//     try {
//       const productId = localStorage.getItem('selectedProductId');
//       const productResponse = await axios.get(`/product/getAddedProduct/${productId}`);
      
//       if (productResponse.status === 200) {
//         const selectedProduct = productResponse.data;

//         setOrderDetails((prevDetails) => ({
//           ...prevDetails,
//           product: {
//             name: selectedProduct.name,
//             id: selectedProduct.id,
//           },
//           orderId: selectedProduct.id,
//         }));
//       } else {
//         console.error('Error fetching product details');
//       }
//     } catch (error) {
//       console.error('API request failed', error);
//     }
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setOrderDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//     if (name === 'orderQuantity') {
//       localStorage.setItem('orderQuantity', value);
//     }
//   };

//   const placeOrder = async () => {
//     if (orderDetails.orderQuantity <= 0) {
//       alert('Kindly input the number of products to purchase.');
//       return;
//     }
      

//     try {
//       const userEmail = localStorage.getItem('emailAddress');
//       const productId = localStorage.getItem('selectedProductId');
//       const productResponse = await axios.get(`/product/getAddedProduct/${productId}`);
      
//       if (productResponse.status === 200) {
//         const selectedProduct = productResponse.data;

//         if (orderDetails.orderQuantity > selectedProduct.stock) {
//           alert(`Available number of product in stock is ${selectedProduct.stock}. Please adjust the order quantity.`);
//           return;
//         }
//         const userConfirmation = window.confirm("Are you sure you want to proceed to payment?");
//         if (userConfirmation) {
//           const response = await axios.post(`/order/placeOrder/${userEmail}`, {
//             customerName: orderDetails.customerName,
//             emailAddress: orderDetails.emailAddress,
//             phoneNumber: orderDetails.phoneNumber,
//             product: {
//               name: orderDetails.product.name,
//               id: orderDetails.product.id,
//             },
//             orderQuantity: orderDetails.orderQuantity,
//           });
//           console.log('Order placed successfully:', orderDetails);
         
//         window.location.href = `/ReviewOrderPage`;
        
//         }
//         else window.localStorage.href = "/PlaceOrderPage";

//       } else {
//         console.error('Error fetching product details');
//       }
//     } catch (error) {
//       console.error('API request failed', error);
//     }






//   };

//   return (
//     <>
//       <SiteNameDashboard />
//       <div className="place-order-container">
//         <h2>Place an Order</h2>

//         <div className="order-details">
//           <label>Customer Name: {orderDetails.customerName}</label>
//           <label>Email Address: {orderDetails.emailAddress}</label>
//           {/* <label>Phone Number: {orderDetails.phoneNumber}</label> */}
//           <label>Product Name: {orderDetails.product.name}</label>

//           <label>
//             Order Quantity:
//             <input
//               type="number"
//               name="orderQuantity"
//               value={orderDetails.orderQuantity}
//               onChange={handleInputChange}
//             />
//           </label>

//           <button className="place-order-button" onClick={placeOrder}>
//             Proceed
//           </button>
//           <button className="place-order-button" onClick={() => { window.location.href = "/ProductsAvailableForOrderExceptOwners"; }}>
//             Back to products list
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };











import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import '../Style/PlaceOrderPage.css';
import SiteNameDashboard from '../../SiteNameDashboard/Component/SiteNameDashboard.jsx';

export const PlaceOrderPage = () => {
  const [orderDetails, setOrderDetails] = useState({
    customerName: '',
    emailAddress: '',
    phoneNumber: '',
    uniqueId: '',
    product: {
      name: '',
      id: '',
    },
    orderQuantity: 0,
    dateOrdered: '',
  });

  useEffect(() => {
    fetchUserDetails();
    fetchProductDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`/user/getUserDetails/${localStorage.getItem('emailAddress')}`);
      if (response.status === 200) {
        const { firstName, lastName, emailAddress, phoneNumber } = response.data;
        setOrderDetails((prevDetails) => ({
          ...prevDetails,
          customerName: `${firstName} ${lastName}`,
          emailAddress,
          phoneNumber,
        }));
      } else {
        console.error('Error fetching user details');
      }
    } catch (error) {
      console.error('API request failed', error);
    }
  };

  const fetchProductDetails = async () => {
    try {
      const productId = localStorage.getItem('selectedProductId');
      const productResponse = await axios.get(`/product/getAddedProduct/${productId}`);
      
      if (productResponse.status === 200) {
        const selectedProduct = productResponse.data;

        setOrderDetails((prevDetails) => ({
          ...prevDetails,
          product: {
            name: selectedProduct.name,
            id: selectedProduct.id,
          },
          uniqueId: selectedProduct.id,
        }));
      } else {
        console.error('Error fetching product details');
      }
    } catch (error) {
      console.error('API request failed', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
    if (name === 'orderQuantity') {
      localStorage.setItem('orderQuantity', value);
    }
  };

  const placeOrder = async () => {
    if (orderDetails.orderQuantity <= 0 || orderDetails.orderQuantity < 1) {
      alert('Kindly input the number of products to purchase.');
      return;
    }

    try {
      const userEmail = localStorage.getItem('emailAddress');
      const productId = localStorage.getItem('selectedProductId');
      const productResponse = await axios.get(`/product/getAddedProduct/${productId}`);
      
      if (productResponse.status === 200) {
        const selectedProduct = productResponse.data;

        if (orderDetails.orderQuantity > selectedProduct.stock) {
          alert(`Available number of product in stock is ${selectedProduct.stock}. Please adjust the order quantity.`);
          return;
        }
          const response = await axios.post(`/order/placeOrder/${userEmail}`, {
          customerName: orderDetails.customerName,
          emailAddress: orderDetails.emailAddress,
          phoneNumber: orderDetails.phoneNumber,
          product: {
            name: orderDetails.product.name,
            id: orderDetails.product.id,
          },
          orderQuantity: orderDetails.orderQuantity,
        });

        if (response.status === 200) {
          localStorage.setItem('uniqueId', response.data.uniqueId);
          if (selectedProduct.stock === 0 ) await axios.delete(`/product/deleteWhenZero/${productId}`);
          console.log('Order placed successfully:', response.data);
          window.location.href = `/ReviewOrderPage`;
        } else {
          console.error('Error placing order');
        }
      } else {
        console.error('Error fetching product details');
      }
    } catch (error) {
      console.error('API request failed', error);
    }

    window.location.href = "/ReviewOrderPage";
  };

  return (
    <>
      <SiteNameDashboard />
      <div className="place-order-container">
        <h2>Place an Order</h2>

        <div className="order-details">
          <label>Customer Name: {orderDetails.customerName}</label>
          <label>Email Address: {orderDetails.emailAddress}</label>
          <label>Product Name: {orderDetails.product.name}</label>

          <label>
            Order Quantity:
            <input
              type="number"
              name="orderQuantity"
              value={orderDetails.orderQuantity}
              onChange={handleInputChange}
            />
          </label>

          <button className="place-order-button" onClick={placeOrder}>
            Proceed
          </button>
          <button className="place-order-button" onClick={() => { window.location.href = "/ProductsAvailableForOrderExceptOwners"; }}>
            Back to products list
          </button>
        </div>
      </div>
    </>
  );
};
