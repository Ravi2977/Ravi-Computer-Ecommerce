import React, { useState } from 'react'

function VerificationAlert() {
    const [loading,setLoading]=useState(false)
    return (
        <div className='m-10'>
            <p className='text-2xl font-bold text-red-600'>Your email is not verified !</p>
            <p className='mt-2'>Check your email we have sent you a verification email </p>
            {loading?<span class="loader"></span>:<button className='border-x-2 rounded-lg p-2 bg-blue-300 mt-4'>Send verification link again</button>}
        </div>
    )
}

export default VerificationAlert
