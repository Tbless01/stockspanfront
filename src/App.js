import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import {AboutUs} from "./Pages/AboutUs/Component/AboutUs";
import { LandingPage } from './LandingPage/Component/LandingPage';
import { Login } from './LogIn/Component/login';
import { SignuP } from './SignUP/Component/Signup';
import { Authentication } from './Authentication/Component/Authentication';
import { AddProduct } from './AddProduct/component/AddProduct.jsx';
import { ProductAdded } from './ProductAdded/Component/ProductAdded.jsx';
import {ProductListByEmail} from './ProductListByEmail/Component/ProductListByEmail.jsx';
import { Register } from './RealRegister/Component/Register';
import { UpdateProduct } from './UpdateProduct/Component/UpdateProduct.jsx';
import { UserCardPage } from './UserCardPage/Component/UserCardPage';
import { MakePaymentPage } from './MakePaymentPage/Component/MakePaymentPage.jsx';
// import { ParentBookingHistory } from './Pages/ParentBookingHistory/Component/ParentBooking';
import {ProductsAvailableForOrderExceptOwners} from './AllAvailableProduct/Component/ProductsAvailableForOrderExceptOwners.jsx';
import {PlaceOrderPage} from './PlaceOrder/Component/PlaceOrderPage.jsx';
import { Dashboard } from './DashBoard/component/Dashboard.jsx';
import ReviewOrderPage from "./ReviewOrder/Component/ReviewOrderPage.jsx";
import {ImagePage} from "./ImageUplaod/Component/ImagePage";
// import Report from './Pages/report/component/report';
function App() {
  return (
      <div className="App">
        <Router>
          <Routes>
          <Route path="/Dashboard" element={< Dashboard />} />
            <Route  path="/ImagePage" element={<ImagePage/>}/>
            <Route path="/ReviewOrderPage" element={< ReviewOrderPage />} />
          {/* <Route path="/ParentBookingHistory" element={< ParentBookingHistory />} /> */}
          {/* <Route  path="/report" element={<Report/>}/> */}
          <Route path="/MakePaymentPage" element={< MakePaymentPage />} />
          <Route path="/UserCardPage" element={<UserCardPage />} />
          <Route path="/PlaceOrderPage" element={<PlaceOrderPage/>} />
          <Route path="/ProductsAvailableForOrderExceptOwners" element={<ProductsAvailableForOrderExceptOwners/>} />
          <Route path="/UpdateProduct/:productId" element={<UpdateProduct />} />
          <Route  path="/Register" element={< Register/>}/>
          <Route  path="/ProductListByEmail" element={<ProductListByEmail/>}/>
          <Route  path="/AddProduct" element={<AddProduct/>}/>
          <Route  path="/ProductAdded" element={<ProductAdded/>}/>
          <Route  path="/Authentication" element={< Authentication/>}/>
          <Route  path="/SignUp" element={<SignuP/>}/>
            {/* <Route  path="/AboutUs" element={<AboutUs/>}/> */}
            <Route  path="/LogIn" element={<Login/>}/>
            <Route path="/" element={<LandingPage/>}/>
          </Routes>
        </Router>
      </div>
  );
}

export default App;
