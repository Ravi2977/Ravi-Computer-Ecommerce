import React from 'react'

function ProductCard(props) {
    return (
        <div className=' p-6 cursor-pointer  hover:scale-105 transition-transform '>
            <div className="card text-center mx-4 my-4 relative">
                <div className='w-full discount'>
                    <div className='discountPercentage  absolute p-1 bg-yellow-500 text-red-600 border-2 rounded-full right-0'>Discount {props.percentage}%</div>
                </div>
                <div className='mt-2 h-64 flex justify-center'>
                    <img className='rounded-lg h-48' src={props.src} alt="" />
                </div>
                <div className='flex flex-col justify-end items-center'>
                    <div className={`productName text-white ${props.size} font-bold`} style={{ textShadow: '20px 20px 27px black' }}>{props.category}</div>
                    <div className="desc h-8 overflow-hidden text-yellow-400 p-1">{props.desc}</div>
                    <div className='px-3 categoryPara text-gray-100'>
                        <p>
                            <span className='original-price'>{props.mrp}/Rs.</span>
                            <span className='discounted-price'>{props.discountedPrice}/Rs.</span>
                        </p>
                    </div>

                </div>
                {/* <button className={`p-${props.btnpadding}  bg-green-600 rounded-md`} >{props.btnname}</button> */}

            </div>
        </div>
    )
}

export default ProductCard
