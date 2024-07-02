import React from 'react'

function ContactUs() {
  return (
    <div>
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

export default ContactUs
