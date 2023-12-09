import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PaystackButton } from 'react-paystack';
import { toast } from 'react-toastify';
import SiteNameDashboard from '../../SiteNameDashboard/Component/SiteNameDashboard.jsx';

export const MakePaymentPage = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    creditCardNumber: '',
    expiringMonth: '',
    expiringYear: '',
    cvv: '',
    cardHolderName: '',
    amount: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const totalOrderAmount = localStorage.getItem('totalOrderAmount');
    if (totalOrderAmount) {
      setPaymentDetails((prevDetails) => ({
        ...prevDetails,
        amount: parseFloat(totalOrderAmount),
      }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userEmail = localStorage.getItem('emailAddress');
      const response = await axios.post(
        `/order/makePayment/${localStorage.getItem('uniqueId')}`
      );

      console.log('Payment update response:', response.data);

      toast.success('Payment successful!');
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Error updating order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (reference) => {
    console.log('Payment successful! Reference:', reference);
    await handleSubmit({ preventDefault: () => {} });
  };

  const handlePaymentClose = () => {
    console.log('Payment closed without completion.');
  };

  return (
    <>
      <SiteNameDashboard />
      <form onSubmit={handleSubmit} className="payment-form">
        <label className="totalamount">Total amount: {paymentDetails.amount}</label>

        <PaystackButton
          text="Make Payment"
          className="paystack-button"
          callback={handlePaymentSuccess}
          close={handlePaymentClose}
          reference={`pay_${Math.floor(Math.random() * 1000000000 + 1)}`}
          email={localStorage.getItem('emailAddress')}
          amount={paymentDetails.amount * 100}
          publicKey="pk_live_2650b724ddc8a309f4d2cda9327ecec225baba9b"
        />
      </form>
    </>
  );
};
