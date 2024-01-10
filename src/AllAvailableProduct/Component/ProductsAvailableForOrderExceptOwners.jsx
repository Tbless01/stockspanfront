import React, { useState, useEffect } from "react";
import axios from "../../api/axios.js";
import SiteNameDashboard from "../../SiteNameDashboard/Component/SiteNameDashboard.jsx";
import "../Style/ProductsAvailableForOrder.css";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

export const ProductsAvailableForOrderExceptOwners = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emailAddress, setEmailAddress] = useState("");
  const [keyword, setKeyword] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const storedEmailAddress = localStorage.getItem("emailAddress");
    setEmailAddress(storedEmailAddress);

    if (storedEmailAddress) {
      const fetchProducts = async () => {
        try {
          const response = await axios.get(
            `/product/availableExceptOwnersProduct/${storedEmailAddress}`
          );
          if (response.status === 200) {
            setProducts(response.data);
          } else {
            console.error("Error fetching products");
          }
        } catch (error) {
          console.error("API request failed", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }
  }, []);

  const handlePlaceOrderClick = (productId) => {
    localStorage.setItem("selectedProductId", productId); // Save the selected product ID
    window.location.href = "/PlaceOrderPage"; // Use window.location.href for navigation
  };
  const handleImageClick = (product) => {
    setSelectedProduct(product);
  };
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `/product/searchAvailableExceptOwnersProduct/${localStorage.getItem(
          "emailAddress"
        )}/${keyword}`
      );

      if (response.status === 200) {
        console.log("see " + response.data);
        setProducts(response.data); // Set the products based on the search response
        // setIsLastPage(true); // Assuming the search response directly returns the filtered products
      } else {
        console.error("Search request failed:", response.status);
      }
    } catch (error) {
      console.error("Search request failed:", error);
    }
  };

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <>
      <SiteNameDashboard />

      <div className="space"></div>
      <div className="topmost">
        <div className="search">
          <input
            className="search-input"
            type="text"
            placeholder="Enter search"
            value={keyword}
            onChange={handleChange}
          />
          <Button className="searchbutton" onClick={handleSearch}>
            {" "}
            <SearchIcon />
          </Button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="product-list-container">
            {products.length === 0 ? (
              <p>No available products.</p>
            ) : (
              products.map((product) => (
                <div className="containinginfo" key={product.id}>
                  <div className="product-item">
                    {product.imageUrl && product.imageUrl.length > 0 && (
                      <>
                        <img
                          className="last-image"
                          src={product.imageUrl[product.imageUrl.length - 1]}
                          alt="Product"
                          onClick={() => handleImageClick(product)}
                          style={{ cursor: "pointer" }}
                        />
                        <br />
                      </>
                    )}
                    <strong className="label">Name:</strong>{" "}
                    <span className="mytext">{product.name}</span> <br />
                    <strong className="label">Price:</strong>{" "}
                    <span className="mytext"> ₦{product.price}</span>
                    <br />
                    <strong className="label">Stock:</strong>{" "}
                    <span className="mytext"> {product.stock} in stock</span>
                    <br />
                    <strong className="label">Description:</strong>{" "}
                    <span className="mytext"> {product.description}</span>{" "}
                    <br />

                    <Button variant="outlined" 
                      className="place-order-button"
                      onClick={() => handlePlaceOrderClick(product.id)}>Purchase
                      </Button>
                    {/* <button
                      className="place-order-button"
                      onClick={() => handlePlaceOrderClick(product.id)}
                    >
                      Buy Product
                    </button> */}
                  </div>

                  {selectedProduct && (
                    <div className="modal">
                      <div className="modal-content">
                        <span
                          className="close"
                          onClick={() => setSelectedProduct(null)}
                        >
                          &times;
                        </span>
                        <h2 className="ProductName">
                          {selectedProduct.name} Images
                        </h2>
                        <div className="image-gallery">
                          {selectedProduct.imageUrl.map((url, index) => (
                            <img
                              key={index}
                              src={url}
                              alt={`Product ${index + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};
