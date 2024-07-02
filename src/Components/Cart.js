import React, { useEffect, useState } from 'react';
import laptop from '../Images/laptop.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../Images/new logo fixed.png'
import Swal from 'sweetalert2';

function Cart(props) {
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalAmountWithTaxes, setTotalAmountWithTaxes] = useState(0)
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [cartItem, setCartItem] = useState()
    const [addressOfUser, setAddressOfUser] = useState()
    const [oading, setLoading] = useState(false)
    const user = {
        id: localStorage.getItem("login") ? JSON.parse(localStorage.getItem('login')).useId : "",
        email: localStorage.getItem("login") ? JSON.parse(localStorage.getItem('login')).user : ""
    }
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => {
            console.log('Razorpay script loaded');
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const addOrderAfterPayment = async () => {
        const token = JSON.parse(localStorage.getItem("login")).token
        Swal.fire({
            title: "Please Wait  !",
            text: "Processing your order",
            icon: "info"
        });
        try {
            const response = await axios.post(
                `${url}order/addOrder`,
                order,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            removeAllItem()
            Swal.fire({
                title: "Congratulations !",
                text: "Your Order is placed",
                icon: "Success"
            });
        } catch (error) {
            console.error('Error placing order:', error);
        }


    }
    const removeAllItem = async () => {
        const response = await axios.get(`${url}cart/emptyCart/${JSON.parse(localStorage.getItem('login')).useId}`,
            {
                headers: {
                    'Authorization': `Bearer ${loginData.token}`
                }
            })

    }

    const [order, setOrder] = useState({
        products: products,
        user: user,
        totalAmount: totalAmount,
        totalQuantity: products.length,
        orderStatus: "Active",
        taxes: totalAmount * 18 / 100,
        deliveryCharge: 40,
        paymentStatus: "Remaining",
        netPayableAmount: totalAmount + totalAmount * 18 / 100 + 40,

    })
    const loginData = JSON.parse(localStorage.getItem('login'))
    const url = "https://ecommerce-backend-bmf8.onrender.com";


    // Load the cart when the component mounts
    useEffect(() => {
        loadCart();
        calculateTotalAmount();
    }, [products]);
    useEffect(() => {
        loadAddressOfUser()
    }, [])
    const loadCart = async () => {
        if (localStorage.getItem('login')) {
            const loginData = JSON.parse(localStorage.getItem('login'));
            try {
                const response = await axios.get(`${url}cart/byUserId/${loginData.useId}`, {
                    headers: {
                        'Authorization': `Bearer ${loginData.token}`
                    }
                });
                setProducts(response.data.products);
            } catch (error) {
                console.error('Error loading cart:', error);
            }
        }
        setOrder({
            products: products,
            user: user,
            totalAmount: totalAmount,
            totalQuantity: products.length,
            orderStatus: "Active",
            taxes: totalAmount * 18 / 100,
            deliveryCharge: 40,
            paymentStatus: "Paid",
            netPayableAmount: totalAmount + totalAmount * 18 / 100 + 40
        });

    };
    const loadAddressOfUser = async () => {
        try {
            const address = await axios.get(`${url}address/getAddressByUserId/${user.id}`, {
                headers: {
                    'Authorization': `Bearer ${loginData.token}`
                }
            });
            setAddressOfUser(address.data)
        } catch (error) {
            console.error("Error loading address", error);
        }
    };

    const placeOrder = async () => {
        if (addressOfUser) {
            const order = await axios.post(`${url}order/create_order`, {
                amount: Math.floor(totalAmountWithTaxes),
                info: "Order_request",
                email: JSON.parse(localStorage.getItem('login')).user
            }, {
                headers: {
                    'Authorization': `Bearer ${loginData.token}`
                }
            }).then(response => {
                if (response.data.status === "created") {
                    console.log("Order data is :-", response.data)

                    const razorpay = new window.Razorpay({
                        key: 'rzp_test_daKBtgff3GpV4I', // Your Razorpay API key
                        currency: 'INR',
                    });

                    razorpay.once('payment.failed', function (response) {
                        console.error('Payment failed:', response.error);
                        // Display user-friendly error message or handle the failure
                    });

                    razorpay.once('payment.success', function (response) {
                        console.log('Payment successful:', response);
                        // Handle successful payment (e.g., update UI, redirect user)
                    });

                    let options = {
                        amount: response.data.amount, // Amount in smallest currency unit (e.g., paisa)
                        currency: 'INR',
                        order_id: response.data.id,
                        name: 'RK Computer Services',
                        description: 'Payment for Product/Service',
                        image: logo, // URL to your company logo
                        handler: function (response) {
                            addOrderAfterPayment()
                        },
                        prefill: {
                            name: "",
                            email: "",
                            contact: ""
                        },
                        "notes": {
                            "address": "TradeMate-Simplifying business management"

                        },
                        "theme": {
                            "color": "#3399cc"
                        }

                    };


                    // Create a new instance of Razorpay and then call open()
                    const rzpInstance = new window.Razorpay(options);
                    props.function();
                    rzpInstance.open();
                    rzpInstance.on("payment.failed", function (response) {
                        console.log(response.error.code);
                        console.log(response.error.description);
                        console.log(response.error.source);
                        console.log(response.error.step);
                        console.log(response.error.reason);
                        console.log(response.error.metadata.order_id);
                        console.log(response.error.metadata.payment_id);
                        Swal.fire({
                            title: "Payment Failed !",
                            text: "Your order failed try again",
                            icon: "Error"
                        });
                    })

                } else {
                    console.error('Failed to create payment order:', response.data);

                }
            })
                .catch(error => {
                    console.error('Error occurred while creating payment order:', error);

                });
            // Retrieve the token from localStorage
        } else {
            props.function();
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You have not added your address go to your account and add Address !",

            })
        }

    };
    const calculateTotalAmount = () => {
        const newTotalAmount = products.reduce((total, product) => total + product.actualPrice, 0);
        setTotalAmount(newTotalAmount);
        setTotalAmountWithTaxes(totalAmount + totalAmount * 18 / 100)
    };

    const handleOnClickImage = (id) => {
        navigate(`/viewProduct/${id}`);
        props.function();
    };

    const seenProducts = {};
    const uniqueProducts = products.filter(product => {
        if (seenProducts[product.productId]) {
            return false;
        }
        seenProducts[product.productId] = true;
        return true;
    });

    const countProducts = (id) => {
        return products.filter(product => product.productId === id).length;
    };

    const handleMouseEnter = (id) => {
        setCartItem({
            userId: localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')).useId : "",
            productId: id
        });
    };

    const quantityPlusOne = async (id) => {
        if (localStorage.getItem('login')) {
            try {
                const loginData = JSON.parse(localStorage.getItem('login'));
                await axios.post(`${url}cart/updateCart`, cartItem, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${loginData.token}`
                    }
                });
                loadCart();
            } catch (error) {
                console.error('Error adding to cart:', error);
            }
        }
    };

    const quantityMinusOne = async (id) => {
        if (localStorage.getItem('login')) {
            try {
                const loginData = JSON.parse(localStorage.getItem('login'));
                await axios.post(`${url}cart/removeOneQuantity`, cartItem, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${loginData.token}`
                    }
                });
                loadCart();
            } catch (error) {
                console.error('Error removing from cart:', error);
            }
        }
    };
    const handleOnSubmit = (e) => {
        e.preventDefault();

        axios.post('https://tradematebackend-production.up.railway.app/auth/create_order', {
            totalAmount: totalAmount,
            info: "Order_request"
        })
            .then(response => {
                console.log("Payment initiated. totalAmount:", totalAmount);

                if (response.data.status === "created") {
                    console.log(response.data);

                    const razorpay = new window.Razorpay({
                        key: 'rzp_test_daKBtgff3GpV4I', // Your Razorpay API key
                        currency: 'INR',
                    });

                    razorpay.once('payment.failed', function (response) {
                        console.error('Payment failed:', response.error);
                        // Display user-friendly error message or handle the failure
                    });

                    razorpay.once('payment.success', function (response) {
                        console.log('Payment successful:', response);
                        // Handle successful payment (e.g., update UI, redirect user)
                    });

                    let options = {
                        totalAmount: response.data.totalAmount, // totalAmount in smallest currency unit (e.g., paisa)
                        currency: 'INR',
                        order_id: response.data.id,
                        name: 'TradeMate',
                        description: 'Payment for Product/Service',
                        image: logo, // URL to your company logo
                        handler: function (response) {
                            console.log(response.razorpay_payment_id);
                            console.log(response.razorpay_order_id);
                            console.log(response.razorpay_signature)
                            alert("Payment succesfull !!")
                        },
                        prefill: {
                            name: "",
                            email: "",
                            contact: ""
                        },
                        "notes": {
                            "address": "TradeMate-Simplifying business management"

                        },
                        "theme": {
                            "color": "#3399cc"
                        }

                    };


                    // Create a new instance of Razorpay and then call open()
                    const rzpInstance = new window.Razorpay(options);
                    rzpInstance.open();
                    rzpInstance.on("payment.failed", function (response) {
                        console.log(response.error.code);
                        console.log(response.error.description);
                        console.log(response.error.source);
                        console.log(response.error.step);
                        console.log(response.error.reason);
                        console.log(response.error.metadata.order_id);
                        console.log(response.error.metadata.payment_id);
                        alert("Payment failed try again")
                    })

                } else {
                    console.error('Failed to create payment order:', response.data);
                    // Display user-friendly error message or handle the failure
                }
            })
            .catch(error => {
                console.error('Error occurred while creating payment order:', error);
                // Display user-friendly error message or handle the failure
            });
    };
    return (
        <div className='px-10 py-2' >
            {
                products.length > 0 ? <div>
                    <div className="text-center">
                        <div>Total Items :- {products.length}</div>
                    </div>
                    {uniqueProducts.map((product, index) => (
                        <div key={index} onMouseEnter={() => handleMouseEnter(product.productId)}>
                            <div className="grid grid-cols-2 bg-gray-100 rounded-lg p-2 text-xl font-semibold my-2">
                                <div className='flex justify-center items-center hover:scale-105 transition-all'>
                                    <img
                                        onClick={() => handleOnClickImage(product.productId)}
                                        className='h-28'
                                        src={product.productImgUrl}
                                        alt=""
                                    />
                                </div>
                                <div className='flex justify-center items-center'>
                                    <p>{product.productName.length > 30 ? product.productName.slice(0, 30) : product.productName}</p>
                                </div>
                            </div>
                            <div className='flex justify-center'>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => quantityMinusOne(product.productId)}
                                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                                    >
                                        -
                                    </button>
                                    <span className="px-3 py-1 bg-white border border-gray-300 rounded">
                                        {countProducts(product.productId)}
                                    </span>
                                    <button
                                        onClick={() => quantityPlusOne(product.productId)}
                                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="m-2 flex justify-between items-center">
                        <div className='text-xl font-semibold mainTextColor'>Total Amount :- {totalAmount}/ Rs.</div>
                        <button className=' mb-3 border p-2 rounded-xl font-semibold text-white shadow-2xl build button ml-2' onClick={placeOrder}>Order Now</button>
                    </div>

                </div> : <div>Your Cart Is Empty</div>
            }

            <dialog id='loading' className='' >
                <span class="loader"></span>
            </dialog>
        </div>
    );
}

export default Cart;
