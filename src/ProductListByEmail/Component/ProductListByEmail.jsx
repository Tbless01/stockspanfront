import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import "../Style/ProductListByEmail.css";
import SiteNameDashboard from "../../SiteNameDashboard/Component/SiteNameDashboard.jsx";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';


export const ProductListByEmail = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [offset, setOffset] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [productName, setProductName] = useState("");
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] =useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const pageSize = 9;
  const [totalCount, setTotalCount] = useState(0);

  const savedEmail = localStorage.getItem("emailAddress");

  useEffect(() => {
    fetchProducts();
  }, [savedEmail, pageNumber]);

  const fetchProducts = async () => {
    try {
      const countResponse = await axios.get(`/product/count/${savedEmail}`);
      const count = countResponse.data;
      setTotalCount(count);

      const response = await axios.get(
        `/product/products/${savedEmail}/${pageNumber}/${pageSize}`
      );

      if (response.status === 200) {
        setProducts(response.data.content);
        setIsLastPage(response.data.last);
        setTotalCount(response.data.totalElements);
      } else {
        console.error("Error fetching products:", response.status);
      }
    } catch (error) {
      console.error("API request failed:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `/product/search/${savedEmail}/${keyword}`
      );

      if (response.status === 200) {
        setProducts(response.data);
        setIsLastPage(true);
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

  // const handleDeleteProduct = async (id) => {
  //   const isConfirmed = window.confirm('Are you sure you want to delete this product?');

  //   if (isConfirmed) {
  //     try {
  //       const response = await axios.delete(`/product/delete/${id}`);

  //       if (response.status === 200) {
  //         const updatedProducts = products.filter((product) => product.id !== id);
  //         setProducts(updatedProducts);
  //       } else {
  //         console.error('Error deleting product:', response.status);
  //       }
  //     } catch (error) {
  //       console.error('API request failed:', error);
  //     }
  //   }
  // };

  const [productId, setProductId] = useState("");
  const handleDeleteProduct = async (id, name) => {
    setShowDeleteConfirmation(true);
    setProductId(id);
    setProductName(name);

    // const isConfirmed = window.confirm('Are you sure you want to delete this product?');

    // if (isConfirmed) {
    //   try {
    //     const response = await axios.delete(`/product/delete/${id}`);

    //     if (response.status === 200) {
    //       const updatedProducts = products.filter((product) => product.id !== id);
    //       setProducts(updatedProducts);
    //     } else {
    //       console.error('Error deleting product:', response.status);
    //     }
    //   } catch (error) {
    //     console.error('API request failed:', error);
    //   }
    // }
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(`/product/delete/${productId}`);

      if (response.status === 200) {
        fetchProducts();
        const updatedProducts = products.filter(
          (product) => product.id !== productId
        );
        setProducts(updatedProducts);
        setShowDeleteConfirmation(false);
      } else {
        console.error("Error deleting product:", response.status);
      }
    } catch (error) {
      console.error("API request failed:", error);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleEditProduct = (productId) => {
    window.location.href = `/UpdateProduct/${productId}`;
  };

  const handleImageClick = (product) => {
    setSelectedProduct(product);
  };

  const handlePreviousClick = () => {
    if (pageNumber > 0) {
      setPageNumber((prevPageNumber) => prevPageNumber - 1);
    }
  };

  const handleNextClick = () => {
    const totalPages = Math.ceil(totalCount / pageSize);
    setTotalPage(totalPages)
    if (pageNumber < totalPages - 1) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  };

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);



  return (
    <>
      <SiteNameDashboard />
      <div className="space"></div>
      <div className="topmos">
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
          <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <Button variant="contained" {...bindTrigger(popupState)}>
            Count
          </Button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Typography sx={{ p: 2 }}>Your stored inventory consists of {totalCount} products</Typography>
          </Popover>
        </div>
      )}
    </PopupState>


        </div>

        <div className="product-list-container">
          {products.length === 0 ? (
            <div className="empty-list-message">
              <p className="productlist">
                Your product list is currently empty. Time to add some amazing
                items!
              </p>

              <br />
              <br />
              <Stack className="upshift" spacing={1} direction="row">
                <Button
                  variant="outlined"
                  className="add-Button"
                  onClick={() => {
                    window.location.href = "/AddProduct";
                  }}
                >
                  Add a Product
                </Button>
              </Stack>
              <br />
            </div>
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
                  <span className="mytext">
                    {product.stock} in stock
                  </span>
                  <br />
                  <strong className="label">Description:</strong>{" "}
                  <span className="mytext"> {product.description}</span> <br />
                  {/* <button
                    className="edit-button"
                    onClick={() => handleEditProduct(product.id)}
                  >
                    Update Product
                  </button> */}
                  {/* <button
                    className="delete-button"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete Product
                  </button> */}
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      onClick={() =>
                        handleDeleteProduct(product.id, product.name)
                      }
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => handleEditProduct(product.id)}
                    >
                      Update
                    </Button>
                  </Stack>
                </div>
                {showDeleteConfirmation && (
                  <div className="notification">
                    <h4>
                      Are you sure you want to delete{" "}
                      <span className="prodName">{productName}</span>?
                    </h4>
                    <Stack spacing={2} direction="row">
                      <Button
                        variant="outlined"
                        onClick={() => confirmDelete(product.id)}
                      >
                        Yes
                      </Button>
                      <Button variant="outlined" onClick={cancelDelete}>
                        No
                      </Button>
                    </Stack>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {selectedProduct && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setSelectedProduct(null)}>
              &times;
            </span>
            <h2 className="ProductName">{selectedProduct.name} Images</h2>
            <div className="image-gallery">
              {selectedProduct.imageUrl.map((url, index) => (
                <img key={index} src={url} alt={`Product ${index + 1}`} />
              ))}
            </div>
          </div>
        </div>
      )}




<div className="cent">
<MobileStepper
      variant="dots"
      steps={totalPage}
      position="static"
      activeStep={pageNumber}
      sx={{ maxWidth: 400, flexGrow: 1 }}
      nextButton={
        <Button size="small" 
        onClick={handleNextClick}
        disabled={pageNumber === Math.ceil(totalCount / pageSize) - 1}>
          Next
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      }
      backButton={
        <Button size="small" 
        onClick={handlePreviousClick}
        disabled={pageNumber === 0}>
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          Previous
        </Button>
      }
    />
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab size="small" color="secondary" aria-label="add"
            onClick={() => {
              window.location.href = "/AddProduct";
            }}>
        <AddIcon />
      </Fab>
    </Box>
    </div>




{/*                 
      <Stack direction="row" spacing={1}>
        <div className="buttonSpace">
          <div className="buttonSp">
            <Button
              variant="outlined"
              onClick={handlePreviousClick}
              disabled={pageNumber === 0}
              sx={{ fontSize: "0.8rem", padding: "6px 12px" }}
            >
              Prev
            </Button>
          </div>

          
          
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab size="small" color="secondary" aria-label="add"
            onClick={() => {
              window.location.href = "/AddProduct";
            }}>
        <AddIcon />
      </Fab>
    </Box>



          <div className="buttonSp2">
            <Button
              variant="outlined"
              onClick={handleNextClick}
              disabled={pageNumber === Math.ceil(totalCount / pageSize) - 1}
              sx={{ fontSize: "0.8rem", padding: "6px 12px" }}
            >
              Next
            </Button>
          </div>
        </div>
      </Stack> */}
    </>
  );
};
