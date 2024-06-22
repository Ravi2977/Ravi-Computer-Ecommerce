import React, { useEffect, useState } from 'react';
import laptop from '../Images/laptop.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Cart(props) {
    const [totalAmount, setTotalAmount] = useState(0);
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [cartItem, setCartItem] = useState()
    const [addressOfUser, setAddressOfUser] = useState()
    const user = {
        id: localStorage.getItem("login") ? JSON.parse(localStorage.getItem('login')).useId : "",
        email: localStorage.getItem("login") ? JSON.parse(localStorage.getItem('login')).user : ""
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
    const url = "http://localhost:8080/";


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
            paymentStatus: "Remaining",
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
        loadCart()
        // Retrieve the token from localStorage
        const token = JSON.parse(localStorage.getItem('login')).token;

        if (addressOfUser) {
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
                console.log("Congratulations Your")
            } catch (error) {
                console.error('Error placing order:', error);
            }
        } else {
            console.log("PLease add a address before placing order")
        }

    };
    const calculateTotalAmount = () => {
        const newTotalAmount = products.reduce((total, product) => total + product.actualPrice, 0);
        setTotalAmount(newTotalAmount);
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
    // console.log(order)
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
        </div>
    );
}

export default Cart;
