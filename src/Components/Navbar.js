import React, { useState } from 'react'
import logo from '../Images/new logo fixed.png'
import desktop from '../Images/desktop.png'
import { NavLink, useNavigate } from 'react-router-dom'
import Signup from './Signup'
import Signin from './Signin'
import cross from '../Images/cross.png'
import cartIvon from '../Images/cartIcon.png'
import Cart from './Cart'

function Navbar() {
    const navigate = useNavigate()
    const handleOnClickBuild = () => {
        navigate("/build")
    }
    const handleLogOUt = () => {
        localStorage.clear()
        navigate("/")
    }
    const [dropdownOpned, setDropDwonopned] = useState(false)
    const openSignupForm = () => {
        const signupForm = document.getElementById("signupForm")
        signupForm.showModal();
    }
    const openSigninForm = () => {
        const signinForm = document.getElementById("signinFrom")
        signinForm.showModal();
    }
    const closeDialogBox = () => {
        const signinForm = document.getElementById("signinFrom")
        const signupForm = document.getElementById("signupForm")
        signinForm.close();
        signupForm.close()
        document.getElementById("cartDialog").close();
    }
    const openDropDown = () => {
        if (dropdownOpned) {
            document.getElementById("dropdown").classList.add("hidden")
            setDropDwonopned(false)
        } else {
            document.getElementById("dropdown").classList.remove("hidden")
            setDropDwonopned(true)
        }
    }
    const handleClickOnCart = () => {
        document.getElementById("cartDialog").showModal();
        // navigate("/cart")
    }
    const handleClickOnBody = () => {
        if (dropdownOpned) {
            document.getElementById("dropdown").classList.add("hidden")
            setDropDwonopned(false)
        }
    }
    return (
        <div style={{ backgroundColor: 'rgb(240, 255, 252)' }} onClick={handleClickOnBody}>
            <ul className=' pb-3 shadow-md ' >
                <div className='flex justify-between'>
                    <div className='absolute triangle'></div>
                    <div className='absolute triangle-bottom-left'></div>
                    <div className='flex justify-center items-start w-full'>
                        <div className="flex justify-center items-center flex-col w-full ">
                            <div className='flex w-full justify-start items-center'>
                                <li className='m-3 relative'><img src={logo} className='h-16 rounded-full' style={{ boxShadow: '10px 10px 27px black' }} alt="" /></li>
                                <li className='m-3 ml-0 font-black text-3xl drop-shadow-2xl computer text-white' style={{ textShadow: '20px 20px 27px black' }}>RK <span className='computer'>Computer Services</span></li>
                            </div>
                            <div className='mt-28 text-center' style={{ color: 'rgb(71, 98, 102)' }}>
                                <h1 className='text-5xl font-extrabold' style={{ textShadow: '20px 20px 27px black' }}>Build your computer</h1>

                                <h1 className='text-5xl  font-extrabold mt-2.5' style={{ textShadow: '20px 20px 27px black' }}> with us</h1>
                                <div>
                                    <button className='button mt-20 border py-4 px-10 rounded-xl font-semibold text-white shadow-2xl build mx-2  p-6 cursor-pointer hover:scale-105 transition-transform ' onClick={(e) => handleOnClickBuild(e)}>Build Now</button>
                                    {localStorage.getItem("login") ? "" : <button className='button mt-20 border py-4 px-10 rounded-xl font-semibold text-white shadow-2xl build mx-2 p-6 cursor-pointer hover:scale-105 transition-transform ' onClick={openSigninForm} >Sign in</button>}
                                </div>


                            </div>
                        </div>


                    </div>

                    <div className='flex justify-center items-center'>
                        <div className="h-[35rem] w-[50rem] m-0 p-0" style={{ backgroundImage: 'linear-gradient(to right, rgb(136, 189, 196) 40%,rgb(73, 101, 104) 100%, rgb(65, 90, 94) 100%)', borderRadius: '0% 100% 0% 100% / 0% 0% 0% 99% ' }}>
                            <div className='flex justify-around h-20 '>
                                <li className='home m-4 font-semibold text-white rounded-lg  p-6 cursor-pointer hover:scale-105 transition-transform '><NavLink to="/">Home</NavLink></li>
                                <li className='products m-4 font-semibold text-white rounded-lg  p-6 cursor-pointer hover:scale-105 transition-transform '><NavLink to="/products">Products</NavLink></li>
                                <li className='services m-4 font-semibold text-white rounded-lg  p-6 cursor-pointer hover:scale-105 transition-transform '><NavLink to="/services">Services</NavLink></li>
                                <li className='contact m-4 font-semibold text-white rounded-lg  p-6 cursor-pointer hover:scale-105 transition-transform '><NavLink to="/about">About Us</NavLink></li>
                                <li className='about m-4 font-semibold text-white rounded-lg  p-6 cursor-pointer hover:scale-105 transition-transform '>{localStorage.getItem("login") ?
                                    <div>
                                        <span onClick={openDropDown} className='cursor-pointer'>{JSON.parse(localStorage.getItem('login')).name} 🔽 </span>
                                        <div className='absolute bg-white text-black w-32 text-center opacity-50 rounded-lg mt-3 ml-0 hidden' id='dropdown' >
                                            <li className='hover:bg-gray-800 hover:text-white'><a href="">Orders</a></li>
                                            <li className='hover:bg-gray-800 hover:text-white' onClick={handleLogOUt}><a href="">Log out</a></li>
                                            <li className='hover:bg-gray-800 hover:text-white'><NavLink to="/account">Account</NavLink></li>
                                            <li className='hover:bg-gray-800 hover:text-white'><a href="">Address</a></li>
                                        </div>
                                    </div>
                                    : <button onClick={openSignupForm}>Sign up</button>}</li>
                                {
                                    localStorage.getItem("login") ? <li className=' rounded-lg pt-6 pr-6 cursor-pointer hover:scale-105 transition-transform '><img onClick={handleClickOnCart} className='h-10' src={cartIvon} alt="" /></li> : ""
                                }

                            </div>
                            <div className='m-0 p-0'>
                                <img src={desktop} className='h-[30rem] ml-32 desktop' alt="" />

                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full flex justify-center slogan text-xl' >Your Future Our Technology !</div>
            </ul>
            <div>
                <dialog id="signupForm" className='rounded-xl text-center ' >
                    <div className='flex flex-col items-end'>
                        <img onClick={closeDialogBox} className='h-10 cursor-pointer mr-2 mt-2' src={cross} alt="" />
                        <Signup function={closeDialogBox} function2={openSigninForm} />
                    </div>


                </dialog>
            </div>
            <div>
                <dialog id="signinFrom" className='rounded-xl text-center'>
                    <div className='flex flex-col items-end'>

                        <img onClick={closeDialogBox} className='h-10 cursor-pointer mr-2 mt-2' src={cross} alt="" />
                        <Signin function={closeDialogBox} function2={openSignupForm} />

                    </div>
                </dialog>
                <dialog id="cartDialog" className='rounded-xl text-center w-[40rem] '>
                    <div className='flex flex-col items-center'>

                        <div className='flex justify-end w-full'><img onClick={closeDialogBox} className='h-10 right-0 cursor-pointer mr-2 mt-2' src={cross} alt="" /></div>
                        <Cart function={closeDialogBox} />

                    </div>
                </dialog>
            </div>
        </div>
    )
}

export default Navbar