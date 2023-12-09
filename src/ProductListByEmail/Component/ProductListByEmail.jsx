import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import '../Style/ProductListByEmail.css';
import SiteNameDashboard from '../../SiteNameDashboard/Component/SiteNameDashboard.jsx';

export const ProductListByEmail = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const savedEmail = localStorage.getItem('emailAddress');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/product/availableByEmail/${savedEmail}`);

        if (response.status === 200) {
          setProducts(response.data);
        } else {
          console.error('Error fetching products:', response.status);
        }
      } catch (error) {
        console.error('API request failed:', error);
      }
    };

    fetchProducts();
  }, [savedEmail]);

  const handleDeleteProduct = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this product?');

    if (isConfirmed) {
      try {
        const response = await axios.delete(`/product/delete/${id}`);

        if (response.status === 200) {
          const updatedProducts = products.filter((product) => product.id !== id);
          setProducts(updatedProducts);
        } else {
          console.error('Error deleting product:', response.status);
        }
      } catch (error) {
        console.error('API request failed:', error);
      }
    }
  };

  const handleEditProduct = (productId) => {
    window.location.href = `/UpdateProduct/${productId}`;
  };

  const handleImageClick = (product) => {
    setSelectedProduct(product);
  };
  

  return (
    <>
      <SiteNameDashboard className="site-name-dashboard" />
      <div className="space"></div>
      <div className="topmost">
        <div className="product-list-container">
          {products.length === 0 ? (
            <div className="empty-list-message">
              <p>Your product list is currently empty. Time to add some amazing items!</p>
              <button className="add-button" onClick={() => { window.location.href = "/AddProduct"; }}>
                Add a Product
              </button>
            </div>
          ) : (
            products.map((product) => (
              <div className="containinginfo">
              
              <div key={product.id} className="product-item">
                    {product.imageUrl && product.imageUrl.length > 0 && (
                  <>
                    {/* <strong className="label">Images:</strong> */}
                    <img
                      className="last-image"
                      src={product.imageUrl[product.imageUrl.length - 1]}
                      alt="Product"
                      onClick={() => handleImageClick(product)}
                      style={{ cursor: 'pointer' }}
                    />
                    <br />
                  </>
                )}
                <strong className="label">Name:</strong> <span className="mytext">{product.name}</span> <br />
         
                <strong className="label">Price:</strong> <span className="mytext"> ₦{product.price}</span><br />
                <strong className="label">Stock:</strong> <span className="mytext"> {product.stock} in stock</span><br />
                <strong className="label">Description:</strong> <span className="mytext"> {product.description}</span> <br />
                </div>
                
                <button
                  className="edit-button"
                  onClick={() => handleEditProduct(product.id)}
                >
                  Update Product
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Delete Product
                </button>
              </div>
            ))
          )}
        </div>
      </div>
  
      {selectedProduct && (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={() => setSelectedProduct(null)}>&times;</span>
      <h2 className='ProductName'>{selectedProduct.name} Images</h2>
      <div className="image-gallery">
        {selectedProduct.imageUrl.map((url, index) => (
          <img key={index} src={url} alt={`Product ${index + 1}`} />
        ))}
      </div>
    </div>
  </div>
)}
    </>
  );
};
