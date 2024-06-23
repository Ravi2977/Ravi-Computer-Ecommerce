import React from 'react'
import laptop from '../Images/laptop.png'
function Card(props) {
    return (
        <div>
            <div className=" card my-4 mx-2 rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg hover:scale-105 transition-transform ">
            <div className='mt-2 flex justify-center items-center'>
                <img className='rounded-lg h-56' src={props.src} alt="" />
            </div>
            <div className='flex flex-col text-center items-center justify-center'>
                <div className={`productName text-white ${props.size} font-bold`} style={{ textShadow: '20px 20px 27px black' }}>{props.category}</div>
                <div className='px-3 categoryPara text-gray-100'><p>{props.desc}</p></div>
            </div>
        </div>
        
        </div>
    )
}

export default Card
