import React, { useEffect, useState } from 'react'
import './style.css'
import axios from 'axios';
function YourAccount() {
    const [addresses, setAddresses] = useState([]);
    const [orders, setOrders] = useState([]);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const url = "https://ecommerce-backend-bmf8.onrender.com/";
    const [passwordDetails, setPassowrdDetails] = useState({
        oldPassowrd: "",
        newPassword: "",
        confirmNewPassword: "",
        userId: JSON.parse(localStorage.getItem("login")).useId
    })
    const userDetails = JSON.parse(localStorage.getItem('login'))
    useEffect(() => {
        loadAddress();
        loadOrders();
        scrollToPosition()
    }, []);

    const [showPassword, setShowPassword] = useState(false);



    const toggleShowPassword = (e) => {
        e.preventDefault()
        setShowPassword(!showPassword);
    };

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

    const scrollToPosition = (offset) => {
        window.scrollTo({
            top: 550,
            behavior: 'smooth'
        })
    }
    const loadOrders = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("login"));
            const response = await axios.get(`${url}order/byUserId/${user.useId}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            setOrders(response.data);
            console.log("Orders are :-", response.data)
        } catch (error) {
            console.error("Error loading orders:", error);
        }
    };
    const hanldeOnChange = (e) => {
        setPassowrdDetails({
            ...passwordDetails,
            [e.target.name]: e.target.value
        })
    }
    const updatePassword = async (e) => {
        e.preventDefault()
        const loginData=JSON.parse(localStorage.getItem("login"))
        if (passwordDetails.newPassword === passwordDetails.confirmNewPassword) {
            const response = await axios.post(`${url}passowrd/change`, passwordDetails, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${loginData.token}`
                }
            })
            document.getElementById("info").innerHTML=response.data;
        }
    }

    return (
        <div className=''>
            <div className="body-bg">
                <div className="main-container">
                    <div className="sidebar">
                        <h2>Account</h2>
                        <ul>
                            <li><a href="#profile" className="sidebar-link">Profile Information</a></li>
                            <li><a href="#orders" className="sidebar-link">Order History</a></li>
                            <li><a href="#wishlist" className="sidebar-link">Wishlist</a></li>
                            <li><a href="#settings" className="sidebar-link">Account Settings</a></li>
                        </ul>
                    </div>
                    <div className="main-content">
                        <section id="profile" className="section ">
                            <h2>Profile Information</h2>
                            <form className="form">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" placeholder={userDetails.name} />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" placeholder={userDetails.user} />
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input type="text" placeholder={addresses.mobileNumber} />
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <input type="text" placeholder={`${addresses.locality},${addresses.city}, ${addresses.state}, ${addresses.country}`} />
                                </div>
                                <button type="submit" className="button">Update Profile</button>
                            </form>
                        </section>
                        <h2>Order History</h2>
                        <section id="orders" className="section overflow-auto max-h-96 border rounded">

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Date</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='h-72 overflow-y-auto'>
                                    {orders.slice().reverse().map((order, index) => (
                                        <tr className='text-center' key={index}>
                                            <td>{index + 1}</td>
                                            <td>{order.orderDate}</td>
                                            <td>Rs.{order.netPayableAmount}</td>
                                            <td>{order.orderStatus}</td>
                                            <td>
                                                <button className="button bg-blue-500 text-white p-2 rounded">View</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>
                        <section id="settings" className="section">
                            <h2>Account Settings</h2>
                            <form className="form">
                                <div className="form-group">
                                    <label>Current Password</label>
                                    <input
                                        name='oldPassowrd'
                                        type={showPassword ? "text" : "password"}
                                        value={passwordDetails.oldPassowrd}
                                        onChange={hanldeOnChange}
                                        placeholder="Current Password"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>New Password</label>
                                    <input
                                        name='newPassword'
                                        type={showPassword ? "text" : "password"}
                                        value={passwordDetails.newPassword}
                                        onChange={hanldeOnChange}
                                        placeholder="New Password"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Confirm New Password</label>
                                    <input
                                        name='confirmNewPassword'
                                        type={showPassword ? "text" : "password"}
                                        value={passwordDetails.confirmNewPassword}
                                        onChange={hanldeOnChange}
                                        placeholder="Confirm New Password"
                                    />
                                </div>
                                <div className="form-group">

                                    <button className='text-blue-600 flex justify-end hover:underline-offset-1' onClick={toggleShowPassword}>{showPassword ? "Hide Passwords" : "Show Passwords"}</button>

                                </div>
                                <div id="info"></div>
                                <button type="submit" className="button" onClick={updatePassword}>Update Password</button>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default YourAccount
