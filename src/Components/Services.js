import React from 'react'
import Card from './Card'
import computer from '../Images/computer-repair.png'
import laptop from '../Images/laptop-repair-1557310767-4894209.png'
import printer from '../Images/printer.png'
import cctv from '../Images/Cctv-security-camera-on-transparent-background-PNG (1).png'

function Services() {
  return (
    <div className='my-2 flex flex-col items-center'>
      <div className='serviceCarasoul mt-20'>
        
      </div>
      <div>
        <div className="service flex my-20 flex-wrap">
          <Card src={computer} category="Desktop Repair Service" desc="All Services Related to Computer Hardware And Software"/>
          <Card src={laptop} category="Desktop Repair Service" desc="All Services Related to Computer Hardware And Software"/>
          <Card src={printer} category="Desktop Repair Service" desc="All Services Related to Computer Hardware And Software"/>
          <Card src={cctv} category="Desktop Repair Service" desc="All Services Related to Computer Hardware And Software"/>
        </div>
      </div>
    </div>
  )
}

export default Services
