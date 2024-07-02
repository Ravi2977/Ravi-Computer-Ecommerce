import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AddAddress from './AddAddress';
import cross from '../Images/cross.png';

const Account = () => {
    const [addresses, setAddresses] = useState([]);
    const [orders, setOrders] = useState([]);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const url = "https://ecommerce-backend-bmf8.onrender.com/";

    useEffect(() => {
        loadAddress();
        loadOrders();
        scrollToPosition()
    }, []);

    const loadAddress = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("login"));
            const response = await axios.get(`${url}address/getAddressByUserId/${user.useId}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            setAddresses(response.data);
          
        } catch (error) {
            console.error("Error loading addresses:", error);
        }
    };

    const loadOrders = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("login"));
            const response = await axios.get(`${url}order/byUserId/${user.useId}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            setOrders(response.data);
        } catch (error) {
            console.error("Error loading orders:", error);
        }
    };

    const handleAddAddress = () => {
        setShowAddressForm(true);
    };

    const handleCloseAddressForm = () => {
        setShowAddressForm(false);
    };
    const scrollToPosition = (offset) => {
        window.scrollTo({
            top: 550,
            behavior: 'smooth'
        });
    };
  
    return (
        <div className="container mx-auto p-6 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 mainTextColor">Your Account Page</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <div className="p-6 border rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4 mainTextColor">User Details</h2>
                        <div className="space-y-2 text-gray-700">
                            <div><strong>Name:</strong> {JSON.parse(localStorage.getItem("login")).name}</div>
                            <div><strong>Email:</strong> {JSON.parse(localStorage.getItem("login")).user}</div>
                            <div><strong>Mobile Number:</strong> {addresses.mobileNumber}</div>
                        </div>
                    </div>
                    <div className="p-6 border rounded-lg shadow-lg flex flex-col justify-end">
                        <h2 className="text-2xl font-semibold mb-4 mainTextColor">Your Address</h2>
                        {addresses ? 
                            <div className="mb-4">
                                <div><strong>Address:</strong> {addresses.landMark}</div>
                                <div><strong>City:</strong> {addresses.city}</div>
                                <div><strong>State:</strong> {addresses.state}</div>
                                <div><strong>ZIP:</strong> {addresses.pinCode}</div>
                                <div><strong>Locality:</strong> {addresses.locality}</div>
                                <div><strong>Country:</strong> {addresses.country}</div>
                            </div>
                       : <div>No address available. Please add an address.</div>}
                        <button className='button border mt-3 py-2 px-2 rounded-xl font-semibold text-white shadow-2xl build mx-2 p-6 cursor-pointer hover:scale-105 transition-transform' onClick={handleAddAddress}>Add Address</button>
                    </div>
                </div>

                <div className="space-y-6 h-[40rem] overflow-y-auto">
                    <div className="p-6 border rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4 mainTextColor">Orders</h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            {Array.isArray(orders) && orders.map((order) => (
                                <li key={order.orderId} className='bg-blue-100 p-4 rounded-lg list-none'>
                                    <div className='flex justify-between'>
                                        <div><strong>Order ID:</strong> {order.orderId}</div>
                                        <div className='font-semibold'>Order Date :- {order.orderDate}</div>
                                    </div>
                                    {order.products.map((product, index) => (
                                        <div key={index} className='flex justify-around items-center p-2'>
                                            <div className='flex justify-between flex-col'>
                                                <div>Item Name:</div>
                                                <div className='font-semibold mr-2'><strong></strong> {product.productName}</div>
                                                <div>Item Price:</div>
                                                <div className='font-semibold mr-2 text-green-700'><strong></strong>Rs. {parseInt(product.actualPrice+product.actualPrice*18/100)}</div>
                                            </div>
                                            <img className='h-28 rounded-lg' src={product.productImgUrl} alt="" />
                                        </div>
                                        
                                    ))}
                                    <div className='flex justify-between'>
                                        <div><strong>Total Amount:</strong>  <span className='font-semibold text-green-600'>Rs.{order.netPayableAmount}</span></div>
                                        <div className="orderStatus font-semibold">Order Status :- {order.orderStatus}</div>
                                    </div>
                                    {order.orderStatus==="Delivered"?<div className="addReviw button border mt-3 py-2 px-2 rounded-xl font-semibold text-white shadow-2xl build mx-2 p-6 cursor-pointer hover:scale-105 transition-transform text-center">Add Review</div>:""}

                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            {showAddressForm && (
                <dialog open className='rounded-lg'>
                    <div className='flex justify-end flex-col items-end'>
                        <img className='h-10 cursor-pointer mr-2 mt-2' onClick={handleCloseAddressForm} src={cross} alt="Close" />
                        <AddAddress />
                    </div>
                </dialog>
            )}
        </div>
    );
}

export default Account;
