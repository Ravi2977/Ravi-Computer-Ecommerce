import React from 'react'

function Signup() {
    return (
        <div className='p-10 rounded-lg'>
            <div className='flex justify-center flex-col items-center'>
                <div className='flex justify-center items-center mb-10'><span className='signup'>Sign-up to</span><span className="title ml-1"> Ravi Computer</span></div>
                <div className='flex flex-col items-start'>
                    <label  className='label' htmlFor="Name">Name</label>
                    <input type="text" placeholder='Enter Your Name' className='inputBox' name="name" />
                </div>
                <div className='flex flex-col items-start'>
                    <label className='label'  htmlFor="Name">Email</label>
                    <input type="email" className='inputBox' placeholder='Enter your email' name="email" />
                </div>
                <div  className='flex flex-col items-start'>
                <label className='label'  htmlFor="Name">Password</label>
                <input type="password" className='inputBox' name="password" placeholder='Create Your Password' />
                </div>
                <div className='flex flex-col items-start'>
                <label className='label'  htmlFor="Name">Confirm Password</label>
                <input type="password" className='inputBox' name="confirm password" placeholder='Confirm password' />
                </div>
                <div className='flex justify-end ' style={{ width: 600 }}>
                    <p>Allready have an Account <span><a className='text-blue-900 underline underline-offset-1' href="/signin">Sign-in </a>here</span></p>
                </div>
                <button className='mt-10 mb-3 border py-4 px-10 rounded-xl font-semibold text-white shadow-2xl build button' >Sign Up</button>
            </div>
            
        </div>
    )
}

export default Signup
