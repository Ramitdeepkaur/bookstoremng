import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loading from '../components/Loading';
import Backbutton from '../components/Backbutton';
import { useNavigate, useParams } from 'react-router-dom';
const DeleteBook = () => {
 const [loading, setloading] = useState(false)
 const {id}=useParams()
 const Navigate=useNavigate()
  const handleDelete=()=>{
    setloading(true)
    axios.delete(`http://localhost:5555/books/${id}`)
    .then((res)=>{
      setloading(false)
      Navigate('/home')

    }).catch((err)=>
    {
      console.log(err)
      alert('error occured !!! check console');
      setloading(false)
    })
  }
  const backdel=()=>{
     Navigate('/home')
  }
  return (
   
    <div className='w-full h-screen bg-[#FF8A8A] absolute'>
      <Backbutton/>
      {loading?(<Loading/>):(  <div className='flex flex-col w-1/2 items-center justify-between bg-white top-[50%] left-[50%] relative -translate-x-1/2 -translate-y-1/2 p-4 rounded-[10px]'>
        <h3 className='text-red-600 text-[30px]'>Do you want to delete this Book ?</h3>
        <div className='flex items-center w-1/2 justify-between'>
          <button className='bg-red-600 text-[20px] px-3 py-2 rounded-[10px]' onClick={handleDelete}>Yes</button>
          <button className='bg-green-600 text-[20px] px-3 py-2 rounded-[10px] ' onClick={backdel}>No</button>
        </div>
      </div>)}
        
    </div>
  )
}

export {DeleteBook};
