import React, { useEffect, useState } from 'react'
import logo from '../Images/new logo fixed.png'
import desktop from '../Images/desktop.png'
import fb from '../Images/fb.png'
import insta from '../Images/insta.webp'
import yt from '../Images/yt.webp'
import laptop from '../Images/laptop.png'
import lenovo from '../Images/lenovo.jpg'
import acer from '../Images/acer.jpg'
import Footer from './Footer'
import Card from './Card'
import Review from './Review'
import axios from 'axios'
import NewCard from './NewCard'
function Home() {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        loadCategory()
    }, [])
    const loadCategory = async () => {
        // console.log("Category is loading")
        const category = await axios.get("http://localhost:8080/auth/getAllCategory")
        setCategories(category.data)
        // console.log("Datat is", category.data)
    }
    const openreview = () => {
        const reviewBox = document.getElementById("review");
        reviewBox.showModal();
    }
    const closeReviewBox = () => {
        const reviewBox = document.getElementById("review");
        reviewBox.close();
    }
    return (
        <div className='text-center'>
            <div className=" text-center">
                <h1 className='productSection text-3xl font-extrabold pt-10 rounded-md' style={{ textShadow: '20px 20px 27px black' }}>Products and Services</h1>
                <div className="cardrow flex justify-between items-center flex-wrap p-10">
                    {
                        categories.map((category, index) => (
                            <Card
                                key={index}
                                size="text-2xl"
                                src={category.categoryImgUrl}
                                category={category.categoryName} 
                                desc={category.categoryDesc}
                            />
                            // <NewCard/>
                        ))
                    }



                </div>
            </div>
            <div>
                <div className=" text-center">
                    <h1 className='productSection text-3xl font-extrabold  my-10 p-2 rounded-md' style={{ textShadow: '20px 20px 27px black' }}>Available Brands</h1>
                    <div className="brandsSection m-10 flex justify-between items-center flex-wrap">
                        <div className="brands rounded-full border ">
                            <img className=' logo' src={acer} alt="" />
                        </div>
                        <div className="brands rounded-full border ">
                            <img className=' logo' src={lenovo} alt="" />
                        </div>
                        <div className="brands rounded-full border ">
                            <img className=' logo' src={lenovo} alt="" />
                        </div>
                        <div className="brands rounded-full border ">
                            <img className=' logo' src={acer} alt="" />
                        </div>

                    </div>
                    <div className="brandsSection m-10 flex justify-between items-center flex-wrap">
                        <div className="brands rounded-full border ">
                            <img className=' logo' src={acer} alt="" />
                        </div>
                        <div className="brands rounded-full border ">
                            <img className=' logo' src={lenovo} alt="" />
                        </div>
                        <div className="brands rounded-full border ">
                            <img className=' logo' src={lenovo} alt="" />
                        </div>
                        <div className="brands rounded-full border ">
                            <img className=' logo' src={acer} alt="" />
                        </div>

                    </div>
                </div>
            </div>
            <div>
                <div className=" text-center">
                    <Review />
                    <button className='button mt-20 border py-4 px-10 rounded-xl font-semibold text-white shadow-2xl build mx-2  p-6 cursor-pointer hover:scale-105 transition-transform' onClick={openreview} >See More</button>
                </div>
            </div>
            <div className='text-center'>
                <dialog id="review"><Review />
                    <button className='mt-10 mb-3 border py-4 px-10 rounded-xl font-semibold text-white shadow-2xl build button' onClick={closeReviewBox} >Close</button>

                </dialog>
            </div>
            <div className=" flex flex-col items-center m-2">
                <h1 className='productSection text-3xl font-extrabold  my-10 p-2 rounded-md' style={{ textShadow: '20px 20px 27px black' }}>Ask Questions</h1>
                <div className="input flex flex-col ">
                    <label className='label'>Name</label>
                    <input className='inputBox border ' type="text" name="name" id="name" />
                </div>
                <div className="input flex flex-col ">
                    <label className='label'>Email</label>
                    <input className='inputBox border ' type="text" name="name" id="name" />
                </div>
                <div className="input flex flex-col ">
                    <label className='label'>Question</label>
                    <input className='inputBox border ' type="text" name="name" id="name" />
                </div>
                <button className='button mt-20 border py-4 px-10 rounded-xl font-semibold text-white shadow-2xl build mx-2  p-6 cursor-pointer hover:scale-105 transition-transform' >Submit</button>
            </div>

        </div>
    )
}

export default Home
