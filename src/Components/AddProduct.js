import React, { useRef } from 'react'
import { Firestore } from 'firebase/firestore';
import { addDoc,collection } from 'firebase/firestore'
import { firestore } from '../Firebase';

function AddProduct() {
    const messageRef = useRef();
    const imageRef =useRef();
    const ref = collection(firestore,"message");
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log("Submit clicked")
        console.log(messageRef.current.value,imageRef.current.value);
        let data = {
            message:messageRef.current.value,
            image:imageRef.current.value
        }
        try{
            addDoc(ref,data);
        }catch (e){
            console.log(e)
        }
        console.log("Submit clicked")
    }
    return (
        <div className='px-64 py-6 text-center '>
            <div className='flex justify-between'>
                <div className='flex flex-col items-start '>
                    <label htmlFor="for image">Select Category</label>
                    <input type="text" id="text" name="imageUpload" ref={messageRef}  className='px-2 rounded-md h-10 shadow-xl' />
                </div>
                <div className='flex flex-col items-start'>
                    <label htmlFor="for image"> Upload Image</label>
                    <input type="file" id="imageUpload" name="imageUpload" accept="image/*" ref={imageRef} className='shadow-xl h-10 rounded-lg p-1' />
                </div>
            </div>
            <div className='flex  justify-between'>
                <div className='flex flex-col items-start '>
                    <label htmlFor="for image">Select Category</label>
                    <input type="text" id="imageUpload" name="imageUpload" accept="image/*" className='px-2 rounded-md h-10 shadow-xl' />
                </div>
                <div className='flex flex-col items-start'>
                    <label htmlFor="for image"> Upload Image</label>
                    <input type="file" id="imageUpload" name="imageUpload" accept="image/*" className='shadow-xl h-10 rounded-lg p-1'/>
                </div>
            </div>
            <button className="w-20 h-10 bg-blue-200 rounded-md my-20" onClick={(e)=>handleSubmit(e)}>Submit</button>
        </div>
    )
}

export default AddProduct
