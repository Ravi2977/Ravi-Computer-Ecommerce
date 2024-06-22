import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Account = () => {
    const [addresses, setAddresses] = useState([])
    const [orders, setOrders] = useState([])
    const url = "http://localhost:8080/"

    useEffect(() => {
        loadAddress()
        loadOrders()
    }, [])

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
            console.log("Order data response:", response.data);
            setOrders(response.data);
        } catch (error) {
            console.error("Error loading orders:", error);
        }
    }

    console.log("Orders are", orders.length)

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
                    <div className="p-6 border rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4 mainTextColor">Addresses</h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>
                                <div><strong>Address:</strong> {addresses.landMark}</div>
                                <div><strong>City:</strong> {addresses.city}</div>
                                <div><strong>State:</strong> {addresses.state}</div>
                                <div><strong>ZIP:</strong> {addresses.pinCode}</div>
                                <div><strong>Locality:</strong> {addresses.locality}</div>
                                <div><strong>Country:</strong> {addresses.country}</div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="space-y-6 h-[40rem] overflow-y-auto">
                    <div className="p-6 border rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4 mainTextColor">Orders</h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            {Array.isArray(orders) && orders.map((order, index) => (
                                <li key={order.orderId} className='bg-gray-200 p-4 rounded-lg list-none'>
                                    <div><strong>Order ID:</strong> {order.orderId}</div>
                                    {
                                        order.products.map((product, indexs) => (
                                            <div className='flex justify-center items-center p-2'>
                                                <div className='font-semibold mr-2'><strong>Item Name:</strong> {product.productName}</div>
                                                <img className='h-28 rounded-lg' src={product.productImgUrl} alt="" />
                                            </div>
                                            
                                        ))
                                    }
                                    <div><strong>Total Amount:</strong>  <span className='font-semibold text-green-600'>Rs.{order.netPayableAmount}</span></div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;
