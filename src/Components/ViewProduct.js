import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import desktop from '../Images/desktop.png';
import printer from '../Images/printer.png';
import Signin from './Signin';
import cross from '../Images/cross.png';
import ProductCard from './ProductCard';

function ViewProduct() {
    const navigate = useNavigate();
    const [categoryId, setCategoryID] = useState(0);
    const [sameCategory, setSameCategory] = useState([]);
    const [product, setProduct] = useState(null);
    const [review, setReview] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const { productId } = useParams();
    const [height, setHeight] = useState(18);
    const url = "https://ecommerce-backend-bmf8.onrender.com";
    const [cartItem, setCartItem] = useState({
        userId: localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')).useId : "",
        productId: 0
    });

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const response = await axios.get(`${url}auth/getProductByProductId/${productId}`);
                setProduct(response.data);
                setReview(response.data.productReview);
                setCartItem({
                    userId: localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')).useId : "",
                    productId: response.data.productId
                });
                setCategoryID(response.data.category.categoryId);
            } catch (err) {
                console.error("Error loading product:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            loadProduct();
        }
    }, [productId]);

    useEffect(() => {
        const loadSameCategoryProducts = async () => {
            if (categoryId !== 0) {
                const categoryProducts = await axios.get(`${url}auth/productByCategoryId/${categoryId}`);
                setSameCategory(categoryProducts.data);
            }
        };
        loadSameCategoryProducts();
    }, [categoryId]);

    useEffect(() => {
        if (review.length > 2) {
            setHeight(68);
        }
    }, [review]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading product: {error.message}</div>;
    if (!product) return <div>No product found</div>;

    const handleImageClick = (imageSrc) => {
        setSelectedImage(imageSrc);
    };

    const handleAddToCart = async () => {
        if (localStorage.getItem('login')) {
            try {
                const loginData = JSON.parse(localStorage.getItem('login')) || "";
                if (!loginData || !loginData.token) {
                    throw new Error("User is not logged in or token is missing");
                }
                const token = loginData.token;

                const response = await axios.post(`${url}cart/updateCart`, cartItem, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                console.log(response);
                document.getElementById('addInfo').innerHTML = " ✅︎ Added to cart";
                setTimeout(() => {
                    document.getElementById('addInfo').innerHTML = " ";
                }, 3000);
            } catch (error) {
                console.error("Error adding to cart: ", error);
            }
        } else {
            document.getElementById('addInfo').innerHTML = "You Are Not Logged in please login first";
            document.getElementById('addInfo').classList.remove("text-green-600");
            document.getElementById('addInfo').classList.add("text-red-600");
            setTimeout(() => {
                document.getElementById('addInfo').innerHTML = "";
                document.getElementById('addInfo').classList.remove("text-red-600");
                document.getElementById('addInfo').classList.add("text-green-600");
            }, 3000);
            document.getElementById('signinFrom').showModal();
        }
    };

    const handleOnClickProduct = (id) => {
        navigate(`/viewProduct/${id}`);
        scrollToPosition();
    };

    const scrollToPosition = (offset) => {
        window.scrollTo({
            top: 550,
            behavior: 'smooth'
        });
    };

    return (
        <div className="container mx-auto py-10 px-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col items-center">
                    <img className="rounded-lg mb-4 h-72" src={selectedImage === null ? product.productImgUrl : selectedImage} alt="No Image" />
                    <div className="flex space-x-4">
                        <img className="w-32 hover:scale-105 transition-all h-32 object-cover rounded-lg cursor-pointer" src={product.productImgUrl} alt="No Image" onClick={() => handleImageClick(product.productImgUrl)} />
                        <img className="w-32 hover:scale-105 transition-all h-32 object-cover rounded-lg cursor-pointer" src={product.productImgUrl2} alt="No Image" onClick={() => handleImageClick(product.productImgUrl2)} />
                        <img className="w-32 hover:scale-105 transition-all h-32 object-cover rounded-lg cursor-pointer" src={product.productImgUrl3} alt="No Image" onClick={() => handleImageClick(product.productImgUrl3)} />
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div>
                        <h1 className="text-3xl font-bold mb-4">{product.productName}</h1>
                        <p className="text-gray-700 mb-2">{product.productDesc}</p>
                        <p className="text-gray-700 mb-2">Brand: {product.brand}</p>
                        <p className="text-gray-700 mb-2">Category: {product.category.categoryName}</p>
                        <p className="text-gray-700 mb-2">Key Feature: {product.keyFeature}</p>
                        <div className="text-xl font-semibold mb-2">
                            <span className="line-through text-gray-500 mr-2">Rs. {product.productMrp}</span>
                            <span className="text-green-600">Rs. {product.actualPrice}</span>
                        </div>
                        <p className="text-green-600 mb-2">Discount: {product.discountPercentage}%</p>
                    </div>
                    <button className="mainBgColor mainTextColor font-semibold text-xl hover:scale-105 transition-all w-52 py-2 rounded-md mt-4" onClick={handleAddToCart}>Add to Cart</button>
                    <div className="addInfo h-5 w-full text-center mt-5 font-semibold text-xl text-green-600" id='addInfo'></div>
                </div>
            </div>
            <div className="grid grid-cols-2 my-10">
                <div className='text-center '>
                    <div className='heading text-2xl font-semibold mb-16 mainBgColor'>Reviews</div>
                    <div className={`h-${height} overflow-y-auto`}>
                        {review.length > 0 ? review.map((review, index) => {
                            const stars = [];
                            for (let i = 0; i < review.starCount; i++) {
                                stars.push(<span key={i}>★</span>);
                            }

                            return (
                                <div key={index} className="reviewBox flex flex-col items-start mx-16">
                                    <div className="customerName name text-xl font-bold">{review.user.name}</div>
                                    <div className='text-yellow-500 text-xl'>
                                        {stars}
                                    </div>
                                    <div className="reviewText text-start">{review.review}</div>
                                    <br />
                                </div>
                            );
                        }) : <div className='text-xl font-semibold heading'>No reviews</div>}
                    </div>
                </div>
                <div className='text-center'>
                    <div>
                        <div className='heading text-2xl font-semibold mb-16 mainBgColor'>Product Description</div>
                        <div className="reviewBox flex flex-col items-start mx-16">
                            <div className="customerName name text-xl font-bold">{product.productName}</div>
                            <div className="reviewText text-start">{product.productDesc}</div>
                        </div>
                    </div>
                </div>
            </div>
            <dialog id="signinFrom" className='rounded-xl text-center'>
                <div className='flex flex-col items-end'>
                    <img className='h-10 cursor-pointer mr-2 mt-2' src={cross} alt="Close" />
                    <Signin />
                </div>
            </dialog>
            <div className='productCategory mt-10'>
                <div className="sectionName">Similar Products</div>
                <div className="py-3 laptop flex justify-between overflow-x-auto">
                    {sameCategory.map((sameCategoryProduct, index) => (
                        (sameCategoryProduct.category.categoryName === product.category.categoryName &&
                            sameCategoryProduct.category.categoryId === product.category.categoryId &&
                            sameCategoryProduct.productId !== product.productId) ? (
                            <div key={index} onClick={() => handleOnClickProduct(sameCategoryProduct.productId)}>
                                <ProductCard
                                    src={sameCategoryProduct.productImgUrl}
                                    percentage={sameCategoryProduct.discountPercentage}
                                    category={sameCategoryProduct.productName}
                                    discountedPrice={sameCategoryProduct.actualPrice}
                                    mrp={sameCategoryProduct.productMrp}
                                    desc={sameCategoryProduct.productDesc}
                                />
                            </div>
                        ) : null
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ViewProduct;
