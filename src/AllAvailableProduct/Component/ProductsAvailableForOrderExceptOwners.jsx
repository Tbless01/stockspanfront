import React, { useState, useEffect } from 'react';
import axios from '../../api/axios.js';
import SiteNameDashboard from '../../SiteNameDashboard/Component/SiteNameDashboard.jsx';
import '../Style/ProductsAvailableForOrder.css';

export const ProductsAvailableForOrderExceptOwners = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emailAddress, setEmailAddress] = useState('');

  useEffect(() => {
    const storedEmailAddress = localStorage.getItem('emailAddress');
    setEmailAddress(storedEmailAddress);

    if (storedEmailAddress) {
      const fetchProducts = async () => {
        try {
          const response = await axios.get(`/product/availableExceptOwnersProduct/${storedEmailAddress}`);
          if (response.status === 200) {
            setProducts(response.data);
          } else {
            console.error('Error fetching products');
          }
        } catch (error) {
          console.error('API request failed', error);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }
  }, []);

  const handlePlaceOrderClick = (productId) => {
    localStorage.setItem('selectedProductId', productId);  // Save the selected product ID
    window.location.href = '/PlaceOrderPage';  // Use window.location.href for navigation
  };

  return (
    <>
      <SiteNameDashboard />
      <div className="space"></div>
      <div className="topmost">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="product-list-container">
            {products.length === 0 ? (
              <p>No available products at the moment.</p>
            ) : (
              products.map((product) => (
                <div key={product.id} className="product-item">
                  <strong className="label">Name:</strong> <span className="mytext">{product.name}</span> <br />
                  <strong className="label">Price:</strong> <span className="mytext"> ₦{product.price}</span><br />
                  <strong className="label">Stock:</strong> <span className="mytext"> {product.stock} in stock</span><br />
                  <strong className="label">Description:</strong> <span className="mytext"> {product.description}</span> <br />
                  <button
                    className="place-order-button"
                    onClick={() => handlePlaceOrderClick(product.id)}  // Pass the product ID
                  >
                    Buy Product
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};
