import React, { useEffect, useState } from 'react'
import laptop from '../Images/laptop.png'
import ProductCard from './ProductCard'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Products() {
    const url = "https://ecommerce-backend-bmf8.onrender.com/"
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [loading,setLoading]=useState(false)
    useEffect(() => {
        loadProducts()
        scrollToPosition()
    }, [])
    const loadProducts = async () => {
        setLoading(true)
        const products = await axios.get(`${url}auth/allProducts`)
        setProducts(products.data)
        setLoading(false)
    }
    const handleOnCLickProduct = (id) => {
        console.log("Clicked on :-", id)
        navigate(`/viewProduct/${id}`)
    }
    const scrollToPosition = (offset) => {
        window.scrollTo({
            top: 600,
            behavior: 'smooth' // For smooth scrolling
        });
    };
    if (loading) return <div className='text-center '><span className='loader'></span></div>;
    
    return (
        <div>
            <div className='productCategory'>
                <div className="sectionName ">Laptop</div>
                <div className="py-3 laptop flex justify-between overflow-x-auto  ">
                    {
                        products.map((product, index) => (

                            product.category.categoryName === "Laptop" ? <div key={index} onClick={()=>handleOnCLickProduct(product.productId)}><ProductCard src={product.productImgUrl} percentage={product.discountPercentage} category={product.productName} discountedPrice={product.actualPrice} mrp={product.productMrp} desc={product.productDesc} /></div> : ""



                        ))
                    }

                </div>

            </div>
            <div className='mb-3 productCategory'>
                <div className="sectionName ">Desktop</div>
                <div className="py-3 laptop flex justify-between overflow-x-auto  ">
                    {
                        products.map((product, index) => (

                            product.category.categoryName === "Desktop" ?<div key={index} onClick={()=>handleOnCLickProduct(product.productId)}><ProductCard src={product.productImgUrl} percentage={product.discountPercentage} category={product.productName} discountedPrice={product.actualPrice} mrp={product.productMrp} desc={product.productDesc} /></div>  : ""



                        ))
                    }

                </div>

            </div>
            <div className='mb-3 productCategory'>
                <div className="sectionName ">Printer</div>
                <div className="laptop py-3  flex justify-between overflow-x-auto  ">
                    {
                        products.map((product, index) => (

                            product.category.categoryName === "Printer" ?<div key={index} onClick={()=>handleOnCLickProduct(product.productId)}><ProductCard src={product.productImgUrl} percentage={product.discountPercentage} category={product.productName} discountedPrice={product.actualPrice} mrp={product.productMrp} desc={product.productDesc} /></div>  : ""



                        ))
                    }

                </div>

            </div>
            <div className='mb-3 productCategory'>
                <div className="sectionName ">Computer Accessories</div>
                <div className="py-3 laptop flex justify-between overflow-x-auto  ">
                    {
                        products.map((product, index) => (

                            product.category.categoryName === "Computer Accessories" ?<div key={index} onClick={()=>handleOnCLickProduct(product.productId)}><ProductCard src={product.productImgUrl} percentage={product.discountPercentage} category={product.productName} discountedPrice={product.actualPrice} mrp={product.productMrp} desc={product.productDesc} /></div>  : ""



                        ))
                    }

                </div>

            </div>
            <div className='mb-3 productCategory'>
                <div className="sectionName ">Printer Repair Parts</div>
                <div className="py-3 laptop flex justify-between overflow-x-auto  ">
                    {
                        products.map((product, index) => (

                            product.category.categoryName === "Printer Repair Parts" ?<div key={index} onClick={()=>handleOnCLickProduct(product.productId)}><ProductCard src={product.productImgUrl} percentage={product.discountPercentage} category={product.productName} discountedPrice={product.actualPrice} mrp={product.productMrp} desc={product.productDesc} /></div>  : ""



                        ))
                    }

                </div>

            </div>
            <div className='mb-3 productCategory'>
                <div className="sectionName ">Laptop Repair Parts</div>
                <div className="py-3 laptop flex justify-between overflow-x-auto  ">
                    {
                        products.map((product, index) => (

                            product.category.categoryName === "Laptop Repair Parts" ?<div key={index} onClick={()=>handleOnCLickProduct(product.productId)}><ProductCard src={product.productImgUrl} percentage={product.discountPercentage} category={product.productName} discountedPrice={product.actualPrice} mrp={product.productMrp} desc={product.productDesc} /></div>  : ""



                        ))
                    }

                </div>

            </div>
            <div className='mb-3 productCategory'>
                <div className="sectionName ">Desktop Repair Parts</div>
                <div className="py-3 laptop flex justify-between overflow-x-auto  ">
                    {
                        products.map((product, index) => (

                            product.category.categoryName === "Desktop Repair Parts" ?<div key={index} onClick={()=>handleOnCLickProduct(product.productId)}><ProductCard src={product.productImgUrl} percentage={product.discountPercentage} category={product.productName} discountedPrice={product.actualPrice} mrp={product.productMrp} desc={product.productDesc} /></div>  : ""



                        ))
                    }

                </div>

            </div>
            <div className='mb-3 productCategory'>
                <div className="sectionName ">Cables</div>
                <div className="py-3 laptop flex justify-between overflow-x-auto  ">
                    {
                        products.map((product, index) => (

                            product.category.categoryName === "Cables" ?<div key={index} onClick={()=>handleOnCLickProduct(product.productId)}><ProductCard src={product.productImgUrl} percentage={product.discountPercentage} category={product.productName} discountedPrice={product.actualPrice} mrp={product.productMrp} desc={product.productDesc} /></div>  : ""



                        ))
                    }

                </div>

            </div>
        </div>
    )
}

export default Products