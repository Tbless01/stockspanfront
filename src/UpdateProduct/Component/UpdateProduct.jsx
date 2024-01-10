import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { useParams } from 'react-router-dom';
import SiteNameDashboard from '../../SiteNameDashboard/Component/SiteNameDashboard.jsx';
import '../Style/UpdateProduct.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';

export const UpdateProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    stock: '',
    description: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`/product/getAddedProduct/${productId}`);
        if (response.status === 200) {
          setProduct(response.data);
        } else {
          console.error('Error fetching product details');
          setError('Error fetching product details');
        }
      } catch (error) {
        console.error('API request failed', error);
        setError('API request failed');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleUpdateProduct = async () => {
    try {
      const response = await axios.put(`/product/update/${productId}`, product);

      if (response.status === 200) {
        toast.success('Product updated successfully', {
          autoClose: 3000, 
        });
        // Delay before redirecting
        setTimeout(() => {
          window.location.href = '/ProductListByEmail';
        }, 2000);
      } else {
        console.error('Error updating product');
        setError('Error updating product');
      }
    } catch (error) {
      console.error('API request failed', error);
      setError('API request failed');
    }
  };
  const handleCancel = () => {
    window.location.href = '/ProductListByEmail';
  };
  const handleImage = () => {
    window.location.href = '/ImagePage';
  }

  localStorage.setItem('productId', productId);





  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
    window.location.href = '/ImagePage';
      }, 2000);
    }
  };







  return (
    <>
      <SiteNameDashboard />
      <div className="space1"></div>
      <div className="topmost">
        <div className="edit-product-container">
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!loading && !error && (
            <>






<Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ m: 1, position: 'relative' }}>
        <Fab
          aria-label="save"
          color="primary"
          sx={buttonSx}
          onClick={handleButtonClick}
        >
          {success ? <CheckIcon /> : <SaveIcon />}
        </Fab>
        {loading && (
          <CircularProgress
            size={68}
            sx={{
              color: green[500],
              position: 'absolute',
              top: -6,
              left: -6,
              zIndex: 1,
            }}
          />
        )}
      </Box>
      <Box sx={{ m: 1, position: 'relative' }}>
        <Button
          variant="contained"
          sx={buttonSx}
          disabled={loading}
          onClick={handleButtonClick}
        >
          Upload image
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              color: green[500],
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>
    </Box>

    
              <h2>Edit Product</h2>
              <label>Name:</label>
              <div>{product.name}</div>
              <label>Price:</label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
              />
              <label>Stock:</label>
              <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange}
              />
              <label>Description:</label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
              />
              <div className="button-group">
                <button onClick={handleUpdateProduct}>Update</button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            </>
          )}
        </div>
        <ToastContainer />
      </div>
    </>
  );
};
