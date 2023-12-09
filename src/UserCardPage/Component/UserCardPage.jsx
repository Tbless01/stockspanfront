// import React, { useState, useEffect } from 'react';
// import axios from '../../api/axios';
// import SiteNameDashboard from '../../SiteNameDashboard/Component/SiteNameDashboard.jsx';
// import '../Style/UserCardPage.css';

// export const UserCardPage = () => {
//   const [cardDetails, setCardDetails] = useState({
//     debitCardNumber: '',
//     expiringMonth: '01',
//     expiringYear: '2023',
//     cvv: '',
//     cardHolderName: '',
//     emailAddress: '',
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(null);

//   useEffect(() => {
//     const emailAddress = localStorage.getItem('emailAddress');
//     if (emailAddress) {
//       setCardDetails((prevCardDetails) => ({
//         ...prevCardDetails,
//         emailAddress: emailAddress,
//       }));
//     }
//   }, []);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;

//     if (name === 'debitCardNumber' && !/^\d+$/.test(value)) {
//       return;
//     }

//     if ((name === 'cvv' || name === 'expiringMonth' || name === 'expiringYear') && !/^\d+$/.test(value)) {
//       return; 
//     }

//     if ((name === 'cvv' && value.length > 3)) {
//       return;
//     }

//     setCardDetails({ ...cardDetails, [name]: value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);

//     try {
//       const response = await axios.post(`/card/addDebitCard/${cardDetails.emailAddress}`, cardDetails);

//       if (response.status === 200) {
//         setSuccessMessage('Debit card added successfully!');
//       }
//     } catch (error) {
//       setError('Failed to add debit card. Please check your card details and try again.');
//     } finally {
//       setLoading(false);
//     }
//   };


//   const monthOptions = Array.from({ length: 12 }, (_, index) => {
//     const monthValue = (index + 1).toString().padStart(2, '0');
//     return <option key={monthValue} value={monthValue}>{new Date(2000, index, 1).toLocaleString('en-us', { month: 'long' })}</option>;
//   });

 
//   const currentYear = new Date().getFullYear();
//   const yearOptions = Array.from({ length: 28 }, (_, index) => {
//     const yearValue = (currentYear + index).toString();
//     return <option key={yearValue} value={yearValue}>{yearValue}</option>;
//   });

//   return (
//     <>
//       <SiteNameDashboard />
//       <div className="space"></div>
//       <div className="topmost1">
//         <div className="add-card-container">
//           <h2>Add Debit Card</h2>

//           {/* Display error message */}
//           {error && <p className="error-message">{error}</p>}
//           {/* Display success message */}
//           {successMessage && <p className="success-message">{successMessage}</p>}

//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="debitCardNumber">Debit Card Number:</label>
//               <input
//                 type="text"
//                 id="debitCardNumber"
//                 name="debitCardNumber"
//                 value={cardDetails.debitCardNumber}
//                 onChange={handleInputChange}
//                 maxLength="16"
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="expiringMonth">Expiring Month:</label>
//               <select
//                 id="expiringMonth"
//                 name="expiringMonth"
//                 value={cardDetails.expiringMonth}
//                 onChange={handleInputChange}
//                 required
//               >
//                 {monthOptions}
//               </select>
//             </div>

//             <div className="form-group">
//               <label htmlFor="expiringYear">Expiring Year:</label>
//               <select
//                 id="expiringYear"
//                 name="expiringYear"
//                 value={cardDetails.expiringYear}
//                 onChange={handleInputChange}
//                 required
//               >
//                 {yearOptions}
//               </select>
//             </div>

//             <div className="form-group">
//               <label htmlFor="cvv">CVV:</label>
//               <input
//                 type="text"
//                 id="cvv"
//                 name="cvv"
//                 value={cardDetails.cvv}
//                 onChange={handleInputChange}
//                 maxLength="3"
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="cardHolderName">Card Holder Name:</label>
//               <input
//                 type="text"
//                 id="cardHolderName"
//                 name="cardHolderName"
//                 value={cardDetails.cardHolderName}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>

//             <button type="submit" className="submit-button" disabled={loading}>
//               {loading ? 'Adding...' : 'Add Card'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };











import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import SiteNameDashboard from '../../SiteNameDashboard/Component/SiteNameDashboard.jsx';
import '../Style/UserCardPage.css';

export const UserCardPage = () => {
  const [cardDetails, setCardDetails] = useState({
    debitCardNumber: '',
    expiringMonth: '01',
    expiringYear: '23', // Defaulting to 2023
    cvv: '',
    cardHolderName: '',
    emailAddress: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const emailAddress = localStorage.getItem('emailAddress');
    if (emailAddress) {
      setCardDetails((prevCardDetails) => ({
        ...prevCardDetails,
        emailAddress: emailAddress,
      }));
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'debitCardNumber' && !/^\d+$/.test(value)) {
      return;
    }

    if ((name === 'cvv' || name === 'expiringMonth' || name === 'expiringYear') && !/^\d+$/.test(value)) {
      return;
    }

    if ((name === 'cvv' && value.length > 3)) {
      return;
    }

    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`/card/addDebitCard/${cardDetails.emailAddress}`, cardDetails);

      if (response.status === 200) {
        setSuccessMessage('Debit card added successfully!');
      }
    } catch (error) {
      setError('Failed to add debit card. Please check your card details and try again.');
    } finally {
      setLoading(false);
    }
  };

  const monthOptions = Array.from({ length: 12 }, (_, index) => {
    const monthValue = (index + 1).toString().padStart(2, '0');
    return <option key={monthValue} value={monthValue}>{new Date(2000, index, 1).toLocaleString('en-us', { month: 'long' })}</option>;
  });

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 28 }, (_, index) => {
    const yearValue = (currentYear + index).toString().slice(-2); // Use slice(-2) to get the last two digits
    return <option key={yearValue} value={yearValue}>{yearValue}</option>;
  });

  return (
    <>
      <SiteNameDashboard />
      <div className="space"></div>
      <div className="topmost1">
        <div className="add-card-container">
          <h2>Add Debit Card</h2>

          {/* Display error message */}
          {error && <p className="error-message">{error}</p>}
          {/* Display success message */}
          {successMessage && <p className="success-message">{successMessage}</p>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="debitCardNumber">Debit Card Number:</label>
              <input
                type="text"
                id="debitCardNumber"
                name="debitCardNumber"
                value={cardDetails.debitCardNumber}
                onChange={handleInputChange}
                maxLength="16"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="expiringMonth">Expiring Month:</label>
              <select
                id="expiringMonth"
                name="expiringMonth"
                value={cardDetails.expiringMonth}
                onChange={handleInputChange}
                required
              >
                {monthOptions}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="expiringYear">Expiring Year:</label>
              <select
                id="expiringYear"
                name="expiringYear"
                value={cardDetails.expiringYear}
                onChange={handleInputChange}
                required
              >
                {yearOptions}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="cvv">CVV:</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={cardDetails.cvv}
                onChange={handleInputChange}
                maxLength="3"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="cardHolderName">Card Holder Name:</label>
              <input
                type="text"
                id="cardHolderName"
                name="cardHolderName"
                value={cardDetails.cardHolderName}
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Adding...' : 'Add Card'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
