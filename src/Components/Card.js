import React from 'react'
import laptop from '../Images/laptop.png'
function Card(props) {
    return (
        <div>
            <div className="card text-center mx-4 my-2">
                <div className='mt-2'>
                    <img className='rounded-lg' src={props.src} alt="" />
                </div>
                <div className={`productName text-white ${props.size} font-bold`} style={{ textShadow: '20px 20px 27px black' }}>{props.category}</div>
                <div className='px-3 categoryPara text-gray-100'><p>{props.desc}</p></div>
                {/* <button className={`p-${props.btnpadding}  bg-green-600 rounded-md`} >{props.btnname}</button> */}

            </div>
        </div>
    )
}

export default Card
