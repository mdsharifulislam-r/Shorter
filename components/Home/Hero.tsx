import React from 'react'
import Form from './Form'

export default function Hero() {
  return (
    <div className='w-full h-screen bg-primary px-3'>
      <div className="container mx-auto w-full h-full flex flex-col justify-center place-items-center">
        <h1 className='md:text-4xl text-2xl text-white font-bold'>Short your URL using <span className='text-yellow-300'>SORTER</span></h1>
        <p className='text-slate-300 md:text-base text-xs md:w-full w-[70%] text-center my-3'>Make your url Short and Sequre by Shorter for free.It will be mamorable and Converted</p>
        <Form/>
      </div>
    </div>
  )
}
