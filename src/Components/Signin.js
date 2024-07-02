import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Signup from './Signup';
import cross from '../Images/cross.png'
import Verification from './Verification';
import VerificationAlert from './VerificationAlert';
function Signin(props) {
    const url ="https://ecommerce-backend-bmf8.onrender.com/"
    const openVerificationBox=()=>{
        document.getElementById("alert").showModal()
        // props.function();
    }
    const closeVerificationBox=()=>{
        document.getElementById("alert").close()
       
    }
    const [loading,setLoading]=useState(false)
    const closeDialogBox=()=>{
        props.function()
        document.getElementById('signupDialog').close();
    }
    const openSignupForm =()=>{
        document.getElementById('signupDialog').showModal()
    }
    const navigate =useNavigate();
    const [signinDetials, setSigninDetails] = useState({
        email: "",
        password: ""
    })
    const handleOnChange = (e) => {
        setSigninDetails(
            {
                ...signinDetials,
                [e.target.name]: e.target.value
            })
    }
    const handleOnSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        if (signinDetials.email.length <= 0 || signinDetials.password.length <= 0) {
            document.getElementById("status").innerHTML = "All Field Are Required"
            setTimeout(function() {
                document.getElementById("status").innerHTML = '';
            }, 3000);
          
        }
        else {
            const signupRequest = axios.post(`${url}auth/login`, signinDetials, {
                headers: {
                  'Content-Type': 'application/json'
                }
              })
              .then(response => {
                console.log("Response is",response.data);
                localStorage.setItem('login', JSON.stringify({
                    login: true,
                    token: response.data.jwtToken,
                    user: response.data.userNAme,
                    name:response.data.name,
                    useId:response.data.userId,
                    verified:response.data.verified
                  }));
                  if( response.data.verified){
                    props.function()
                    window.location.reload()
                    setLoading(false)
                  }else{
                    setLoading(false)
                    openVerificationBox();
                   
                    
                    
                  }
               
              })
              .catch(error => {
                document.getElementById("status").innerHTML="Email or Passwrod is Wrong"
                setLoading(false)
                setTimeout(function() {
                    document.getElementById("status").innerHTML = '';
                }, 3000);
              });
             
        }
        
    }
    return (
        <div className='p-10 rounded-lg'>
            <div className='flex justify-center flex-col items-center'>
                <div className='flex justify-center items-center mb-10'><span className='signup'>Sign-up to</span><span className="title ml-1"> Ravi Computer</span></div>
                <div className='flex flex-col items-start'>
                    <label className='label' htmlFor="Name">Email</label>
                    <input type="email" className='inputBox' placeholder='Enter your email' name="email" onChange={(e) => handleOnChange(e)} />
                </div>
                <div className='flex flex-col items-start'>
                    <label className='label' htmlFor="Name">Password</label>
                    <input type="password" className='inputBox' name="password" placeholder='Enter Your Password' onChange={(e) => handleOnChange(e)} />
                </div>
                <div className='flex justify-end ' style={{ width: 600 }}>
                    <p>Don't have an Account <span><a className='text-blue-900 underline underline-offset-1 cursor-pointer'onClick={openSignupForm}> Sign-up </a>here</span></p>
                </div>
                <div className="status text-red-700 bg-red-200 w-full text-center rounded-lg" id='status'></div>
                {loading?<span class="loader"></span>:<button onClick={(e) => { handleOnSubmit(e) }} className='mt-10 mb-3 border py-4 px-10 rounded-xl font-semibold text-white shadow-2xl build button'>Log in</button>}
                {/* <button onClick={openVerificationBox}>click</button> */}
            </div>
            <div>
                <dialog id="signupDialog" className='rounded-xl text-center'>
                <div className='flex flex-col items-end'>
                <img onClick={closeDialogBox} className='h-10 cursor-pointer mr-2 mt-2' src={cross} alt="" />
                <Signup/>
                </div>
                </dialog>
            </div>
          
                <dialog className="verification rounded-lg" id="alert">
                    <div className="flex flex-col items-end ">
                    <img onClick={closeVerificationBox} className='h-10 cursor-pointer mr-2 mt-2' src={cross} alt="" />
                    <VerificationAlert/>
                    </div>
                
                </dialog>
            
        </div>
    )
}

export default Signin
