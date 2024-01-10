import React, { useState } from 'react';
import axios from '../../api/axios';
// import { toast } from 'react-toastify';
import { toast, ToastContainer } from "react-toastify";
import '../../Authentication/Style/Authentication.css';
import '../style/AddProduct.css';
import SiteNameDashboard from "../../SiteNameDashboard/Component/SiteNameDashboard.jsx";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();
  const [description, setDescription] = useState('');

  const jwtToken = localStorage.getItem('jwtToken');
  const emailAddress = localStorage.getItem('emailAddress');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } 
    else if (name === 'price') {
      setPrice(value);
    } else if (name === 'stock') {
      setStock(value);
    } else if (name === 'description') {
      setDescription(value);
    }
  };

  const data = {
    emailAddress,
    name,
    price,
    stock,
    description,
  };

  const saveToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };

  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };
  
  const handleSubmit = async (e) => {
    // e.preventDefault();

    try {
      const response = await axios.post("/product/addProduct", data);

      if (response.status === 200 || response.status === 201) {
        const productData = response.data;
        toast.success('Your product was successfully created');
        console.log('Product created:', productData);
        window.location.href = '/ProductAdded';
      } else {
        toast.error('Something went wrong');
        console.error('Error adding product');
      }
    } catch (error) {
      toast.error('API request failed');
      console.error('API request failed', error);
    }
  };

  const isDisabled = !(name && price && stock);
  // if(!isDisabled) toast.success('Please fill all required fields', {
  //   autoClose: 3000, 
  // });

  return (
    <>
    <SiteNameDashboard></SiteNameDashboard>

    <div className='complete'>
      <h2 className="add-product-title">Add Product</h2>
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <div>
        <TextField
          label="Product Name"
          id="outlined-start-adornment"
          fullWidth
          sx={{ m: 1, width: '50ch' }}
          name="name"
          value={name}
          onChange={handleChange}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
        />

        <TextField
          label="Desription"
          id="outlined-start-adornment"
          fullWidth
          sx={{ m: 1 , width: '50ch' }}
          name="description"
          value={description}
          onChange={handleChange}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
        />
        <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
    >

        <TextField
          id="outlined-number"
          label="Amount"
          type="number"
          name="price"
          value={price}
          startAdornment={<InputAdornment position="start">₦</InputAdornment>}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
              <TextField
          id="outlined-number"
          label="Stock"
          type="number"
          name="stock"
          value={stock}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
    </Box>
      </div>
    </Box>
    <Stack
        spacing={2}
        direction="row"
        sx={{ marginLeft: '38%', width: '25ch' }}
        className='Submit'
        onClick={handleSubmit}
      >
      <Button variant="outlined" disabled={isDisabled}>Submit</Button>
    </Stack>

{/* 
      <form>
        <div className="form-group">
          <label htmlFor="name" className="label">Product Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="price" className="label">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock" className="label">Stock:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={stock}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="label">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={handleChange}
            className="input"
          />
        </div>
        <button type="button" className="submit-button" onClick={handleSubmit} disabled={!isDisabled}>Add Product</button>
      </form> */}
      <ToastContainer />
    </div>
    </>
  );
};
