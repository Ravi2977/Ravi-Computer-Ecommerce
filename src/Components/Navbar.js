import React from 'react'
import logo from '../Images/new logo fixed.png'
import desktop from '../Images/desktop.png'
import { NavLink } from 'react-router-dom'

function Navbar() {
    return (
        <div style={{ backgroundColor: 'rgb(240, 255, 252)' }}>
            <ul className=' pb-3 shadow-md ' >
                <div className='flex justify-between'>
                    <div className='absolute triangle'></div>
                    <div className='absolute triangle-bottom-left'></div>
                    <div className='flex justify-center items-start w-full'>
                        <div className="flex justify-center items-center flex-col w-full ">
                            <div className='flex w-full justify-start items-center'>
                                <li className='m-3 relative'><img src={logo} className='h-16 rounded-full' style={{ boxShadow: '10px 10px 27px black' }} alt="" /></li>
                                <li className='m-3 ml-0 font-black text-3xl drop-shadow-2xl computer text-white' style={{ textShadow: '20px 20px 27px black' }}>Ravi <span className='computer'>Computer</span></li>
                            </div>
                            <div className='mt-28 text-center' style={{ color: 'rgb(39, 55, 57)' }}>
                                <h1 className='text-5xl font-extrabold' style={{ textShadow: '20px 20px 27px black' }}>Build your computer</h1>

                                <h1 className='text-5xl  font-extrabold mt-2.5' style={{ textShadow: '20px 20px 27px black' }}> with us</h1>
                                <div>
                                    <button className='button mt-20 border py-4 px-10 rounded-xl font-semibold text-white shadow-2xl build' >Build Now</button>
                                    <button className='button mt-20 border py-4 px-10 rounded-xl font-semibold text-white shadow-2xl build mx-2' >Sign in</button>
                                </div>


                            </div>
                        </div>


                    </div>

                    <div className='flex justify-center items-center'>
                        <div className="h-[35rem] w-[50rem] m-0 p-0" style={{ backgroundImage: 'linear-gradient(to right, rgb(136, 189, 196) 40%,rgb(73, 101, 104) 100%, rgb(65, 90, 94) 100%)', borderRadius: '0% 100% 0% 100% / 0% 0% 0% 99% ' }}>
                            <div className='flex justify-around h-20 '>
                                <li className='home m-5 font-semibold text-white '><NavLink to="/">Home</NavLink></li>
                                <li className='products m-5 font-semibold text-white'><NavLink to="/products">Products</NavLink></li>
                                <li className='services m-5 font-semibold text-white'><NavLink to="/services">Services</NavLink></li>
                                <li className='contact m-5 font-semibold text-white'><NavLink>Contact Us</NavLink></li>
                                <li className='about m-5 font-semibold text-white'><NavLink>Sign up</NavLink></li>

                            </div>
                            <div className='m-0 p-0'>
                                <img src={desktop} className='h-[30rem] ml-32' alt="" />

                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full flex justify-center slogan text-xl' >Your Future Our Technology !</div>
            </ul>
        </div>
    )
}

export default Navbar