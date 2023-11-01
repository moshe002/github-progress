import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'

interface ErrorProps {
    setError: React.Dispatch<React.SetStateAction<boolean>>;
}

function Error({ setError }: ErrorProps) {

    const closeErrorModal = () => setError(false)

  return (
    <div className='fixed top-0 left-0 p-5 w-full h-screen flex justify-center items-center bg-gray-600 bg-opacity-50 z-40'>
        <div className='flex flex-col items-center gap-5 p-5 bg-zinc-700 shadow-2xl rounded-md'>
            <h1 className='text-center text-2xl font-semibold text-red-500'>Error, Please try again later.</h1>
            <button
                className='text-4xl rounded-full bg-zinc-500 hover:bg-red-400 duration-150'
                title='click me to close' 
                onClick={closeErrorModal} 
                type='button'>
                <AiOutlineCloseCircle />
            </button>
        </div>
    </div>
  )
}

export default Error