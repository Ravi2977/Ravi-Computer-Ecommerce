import React from 'react'
import Card from './Card'
import cabinet from '../Images/desktop.png'

function BuildPC() {
    return (
        <div className='text-center'>

            <div className="text-3xl font-bold py-6 heading">Build Your PC</div>
            <div className='py-3'>
                <div className='text-xl font-semibold heading'>Choose Cabinet</div>
                <div className="flex justify-center flex-wrap">
                    <Card src={cabinet} category="Best Cabinet at this price consist of a PSU of 450 watt" desc="1599 /RS." btnname="Select" btnpadding="2"/>
                </div>
            </div>
            <div className='py-3'>
                <div className='text-xl font-semibold heading'>Choose Motherboard</div>
                <div className="flex justify-center flex-wrap">
                    <Card src={cabinet} category="Best Cabinet at this price consist of a PSU of 450 watt" desc="1599 /RS." />
                </div>
            </div>
            <button className='mt-10 mb-3 border py-4 px-10 rounded-xl font-semibold text-white shadow-2xl build button' >Build</button>

        </div>
    )
}

export default BuildPC
