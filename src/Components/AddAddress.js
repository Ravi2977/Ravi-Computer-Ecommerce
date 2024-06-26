import React, { useState } from 'react';

function AddAddress() {
  const [address, setAddress] = useState({
    country: "",
    mobileNumber: "",
    state: "",
    district: "",
    city: "",
    locality: "",
    landmark: "",
    pincode: "",
    user: {
      id: JSON.parse(localStorage.getItem('login')).useId
    }
  });

  const [errors, setErrors] = useState({
    mobileNumber: "",
    pincode: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));

    // Clear errors on change
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: ""
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;
    let mobileNumberError = "";
    let pincodeError = "";

    if (address.mobileNumber.length !== 10) {
      mobileNumberError = "Mobile number must be 10 digits.";
      valid = false;
    }

    if (address.pincode.length !== 6) {
      pincodeError = "Pincode must be 6 digits.";
      valid = false;
    }

    if (!valid) {
      setErrors({
        mobileNumber: mobileNumberError,
        pincode: pincodeError
      });
      return;
    }

    // Submit the form
    console.log(address);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow-md addressFrom">
      <h2 className="text-2xl font-bold mb-4">Address Form</h2>
      <form onSubmit={handleSubmit} className='flex justify-center flex-col'>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={address.country}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="mobileNumber">Mobile Number</label>
            <input
              type="text"
              id="mobileNumber"
              name="mobileNumber"
              value={address.mobileNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              maxLength="10"
            />
            {errors.mobileNumber && <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={address.state}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="district">District</label>
            <input
              type="text"
              id="district"
              name="district"
              value={address.district}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={address.city}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="locality">Locality</label>
            <input
              type="text"
              id="locality"
              name="locality"
              value={address.locality}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="landmark">Landmark</label>
            <input
              type="text"
              id="landmark"
              name="landmark"
              value={address.landmark}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="pincode">Pincode</label>
            <input
              type="number"
              id="pincode"
              name="pincode"
              value={address.pincode}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
          </div>
        </div>
        <button className='button  border py-4 px-10 rounded-xl font-semibold text-white shadow-2xl build mx-2  p-6 cursor-pointer hover:scale-105 transition-transform '>Submit</button>
        </form>
    </div>
  );
}

export default AddAddress;
