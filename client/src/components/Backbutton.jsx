import React from 'react'
import { Link } from 'react-router-dom'
import { IoArrowBackCircle } from "react-icons/io5";
const Backbutton = ({destination='/home'}) => {
  return (
   <div className='p-2'>
    <Link to={destination}><IoArrowBackCircle className='text-[30px]'/></Link>
   </div>
  )
}

export default Backbutton
