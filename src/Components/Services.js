import React from 'react'
import Card from './Card'
import computer from '../Images/computer-repair.png'
import laptop from '../Images/laptop-repair-1557310767-4894209.png'
import printer from '../Images/printer.png'
import cctv from '../Images/Cctv-security-camera-on-transparent-background-PNG (1).png'
import Signup from './Signup'

function Services() {
  const closeEvent = () => {
    console.log("Close button working")
    const openButton = document.getElementById("mydialog");
    openButton.close();
  }
  const openEvent = () => {
    console.log("Open Button Working");
    const openButton = document.getElementById("mydialog");
    openButton.showModal();
  };

  return (
    <div className='py-2 flex flex-col items-center'>
      <div className='text-center font-bold text-3xl pt-8 heading'>Services</div>
      <div className='serviceCarasoul mt-20'>

      </div>

      <div className="service flex my-20 flex-wrap">
        <Card src={computer} category="Desktop Repair Service" desc="All Services Related to Computer Hardware And Software" />
        <Card src={laptop} category="Desktop Repair Service" desc="All Services Related to Computer Hardware And Software" />
        <Card src={printer} category="Desktop Repair Service" desc="All Services Related to Computer Hardware And Software" />
        <Card src={cctv} category="Desktop Repair Service" desc="All Services Related to Computer Hardware And Software" />
      </div>
    </div>
  )
}

export default Services
