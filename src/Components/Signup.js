import React, { useState } from 'react';
import cross from '../Images/cross.png';
import Signin from './Signin';
import { useNavigate } from 'react-router-dom';
import Verification from './Verification';
import { loadBundle } from 'firebase/firestore';

function Signup(props) {
    const url ="https://ecommerce-backend-bmf8.onrender.com"
const [loading,setLoading]=useState(false)
    const closeVerificationBox=()=>{
    document.getElementById("verify").close();
    props.function()
}

    const [signUpDetails, setSignupDetails] = useState({
        email: "",
        name: "",
        password: "",
        confirmPassword: ""
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setSignupDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleOnSubmit = async (e) => {
       
        e.preventDefault();
        setLoading(true)
        const { email, name, password, confirmPassword } = signUpDetails;

        if (!email || !name || !password || !confirmPassword) {
            document.getElementById("info").innerHTML = "All fields are required";
            setLoading(false)
            setTimeout(() => {
                document.getElementById("info").innerHTML = '';
            }, 3000);
            return;
        }

        if (password !== confirmPassword) {
            document.getElementById("info").innerHTML = "Passwords do not match";
            setLoading(false)
            setTimeout(() => {
                document.getElementById("info").innerHTML = '';
            }, 3000);
            return;
        }

        try {
            const response = await fetch(`${url}auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signUpDetails)
            });
setLoading(false)
            if (response.status === 401) {
                document.getElementById("info").innerHTML = 'This email is already registered';
            } else {
                document.getElementById("info").innerHTML = 'Registered successfully';
                document.getElementById("verify").showModal();
               
            }
        } catch (error) {
            document.getElementById("info").innerHTML = 'An error occurred. Please try again';
            setLoading(false)
        } finally {
            setTimeout(() => {
                document.getElementById("info").innerHTML = '';
            }, 3000);
        }
    };
    const closeAlert = () => {
        document.getElementById("verify").close();
    };

    return (
        <div className='p-10 rounded-lg'>
            <div className='flex justify-center flex-col items-center'>
                <div className='flex justify-center items-center mb-10'>
                    <span className='signup'>Sign-up to</span>
                    <span className="title ml-1"> Ravi Computer</span>
                </div>
                <div className='flex flex-col items-start'>
                    <label className='label' htmlFor="name">Name</label>
                    <input
                        onChange={handleOnChange}
                        type="text"
                        placeholder='Enter Your Name'
                        className='inputBox'
                        name="name"
                        value={signUpDetails.name}
                    />
                </div>
                <div className='flex flex-col items-start'>
                    <label className='label' htmlFor="email">Email</label>
                    <input
                        type="email"
                        className='inputBox'
                        onChange={handleOnChange}
                        placeholder='Enter your email'
                        name="email"
                        value={signUpDetails.email}
                    />
                </div>
                <div className='flex flex-col items-start'>
                    <label className='label' htmlFor="password">Password</label>
                    <input
                        type="password"
                        className='inputBox'
                        name="password"
                        onChange={handleOnChange}
                        placeholder='Create Your Password'
                        value={signUpDetails.password}
                    />
                </div>
                <div className='flex flex-col items-start'>
                    <label className='label' htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        className='inputBox'
                        name="confirmPassword"
                        onChange={handleOnChange}
                        placeholder='Confirm password'
                        value={signUpDetails.confirmPassword}
                    />
                </div>
                <div className="text-red-700 bg-red-200 w-full text-center rounded-lg " id='info'></div>
               {loading?<span class="loader"></span>: <button className='mt-10 mb-3 border py-4 px-10 rounded-xl font-semibold text-white shadow-2xl build button' onClick={handleOnSubmit}>
                    Sign Up
                </button>}
            </div>
            <div>
                <dialog id='verify' className='p-10 rounded-lg'>
                    <Verification  />
                   <button onClick={closeVerificationBox}  className='mt-10 mb-3 border py-4 px-10 rounded-xl font-semibold text-white shadow-2xl build button' >close</button>
                </dialog>
            </div>
        </div>
    );
}

export default Signup;
