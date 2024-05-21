import React from 'react'
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
function Home() {
    return (
        <div >
           
            <div className=" text-center">
                <h1 className='productSection text-3xl font-extrabold pt-10 rounded-md' style={{ textShadow: '20px 20px 27px black' }}>Products and Services</h1>
                <div className="cardrow flex justify-between items-center flex-wrap p-10">
                   <Card size="text-2xl"   src={laptop} category="Laptop" desc="New And Refurbised Laptops are available at very good price "/>
                   <Card  size="text-2xl"  src={laptop} category="Laptop" desc="New And Refurbised Laptops are available at very good price "/>
                   <Card  size="text-2xl"  src={laptop} category="Laptop" desc="New And Refurbised Laptops are available at very good price "/>
                   <Card size="text-2xl"  src={laptop} category="Laptop" desc="New And Refurbised Laptops are available at very good price "/>
                   <Card  size="text-2xl" src={laptop} category="Laptop" desc="New And Refurbised Laptops are available at very good price "/>
                   <Card size="text-2xl"  src={laptop} category="Laptop" desc="New And Refurbised Laptops are available at very good price "/>
                   <Card size="text-2xl"  src={laptop} category="Laptop" desc="New And Refurbised Laptops are available at very good price "/>
                   <Card  size="text-2xl" src={laptop} category="Laptop" desc="New And Refurbised Laptops are available at very good price "/>

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
                    <h1 className='productSection text-3xl font-extrabold  my-10 p-2 rounded-md' style={{ textShadow: '20px 20px 27px black' }}>Reviews</h1>
                    <div className="reviewSection flex justify-between items-center flex-wrap px-20 mt-4">
                        <div className="reviewCard text-start ">
                            <div className="name text-xl font-bold">
                                Ravi Maurya
                            </div>
                            <div>
                                ★★★★★
                            </div>
                            <div className='review'>
                                Best Shop in chandwak for Laptop computer and cctv camera services. best accessories shop in chandwak.
                            </div>
                        </div>
                        <div className="reviewCard text-start">
                            <div className="name text-xl font-bold">
                                Ravi Maurya
                            </div>
                            <div>
                                ★★★★★
                            </div>
                            <div className='review'>
                                Best Shop in chandwak for Laptop computer and cctv camera services. best accessories shop in chandwak.
                            </div>
                        </div>
                        <div className="reviewCard text-start">
                            <div className="name text-xl font-bold">
                                Ravi Maurya
                            </div>
                            <div>
                                ★★★★★
                            </div>
                            <div className='review'>
                                Best Shop in chandwak for Laptop computer and cctv camera services. best accessories shop in chandwak.
                            </div>
                        </div>
                    </div>
                    <div className="reviewSection flex justify-between items-center flex-wrap px-20 mt-4">
                        <div className="reviewCard text-start ">
                            <div className="name text-xl font-bold">
                                Ravi Maurya
                            </div>
                            <div>
                                ★★★★★
                            </div>
                            <div className='review'>
                                Best Shop in chandwak for Laptop computer and cctv camera services. best accessories shop in chandwak.
                            </div>
                        </div>
                        <div className="reviewCard text-start">
                            <div className="name text-xl font-bold">
                                Ravi Maurya
                            </div>
                            <div>
                                ★★★★★
                            </div>
                            <div className='review'>
                                Best Shop in chandwak for Laptop computer and cctv camera services. best accessories shop in chandwak.
                            </div>
                        </div>
                        <div className="reviewCard text-start">
                            <div className="name text-xl font-bold">
                                Ravi Maurya
                            </div>
                            <div>
                                ★★★★★
                            </div>
                            <div className='review'>
                                Best Shop in chandwak for Laptop computer and cctv camera services. best accessories shop in chandwak.
                            </div>
                        </div>
                    </div>

                    <button className='mt-10 mb-3 border py-4 px-10 rounded-xl font-semibold text-white shadow-2xl build button' >See More</button>
                </div>
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
                <button className='mt-10 mb-3 border py-4 px-10 rounded-xl font-semibold text-white shadow-2xl build button' >Submit</button>
            </div>
           
        </div>
    )
}

export default Home
