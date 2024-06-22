import React from 'react'
import laptop from '../Images/laptop.png'
import ProductCard from './ProductCard'
function CategoryProducts() {
    return (
        <div className='p-2'>
            {/* <div className='productCards flex flex-col items-center rounded-lg mx-10' style={{ backgroundColor: "rgb(211, 237, 240)" }}>
                <img className='' src={laptop} alt="" />
                <div className=' w-full h-full rounded-b-lg p-1 flex flex-col items-center' style={{backgroundColor:"rgb(71, 98, 102)"}}>
                    <span className='font-semibold text-white'>Hp EliteBook 8Gb 256Gb ssd</span>
                    <div className='px-3 categoryPara text-gray-100 flex flex-col items-center '>
                        <p className='descriptio text-sm'> This product is a laptop which cinsist of 4gb ram 256gb ssd and a</p>
                        <p className='text-white'>
                            <span className='original-price'>15000/Rs.</span>
                            <span className='discounted-price'>14000/Rs.</span>
                        </p>
                    </div>
                </div>
            </div> */}
            <ProductCard/>
        </div>
    )
}

export default CategoryProducts
