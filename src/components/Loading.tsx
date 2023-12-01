import { AiOutlineLoading3Quarters } from 'react-icons/ai'

function Loading() {
  return (
    <>
      <h1 className='mt-20 text-4xl animate-spin'>
          <AiOutlineLoading3Quarters />
      </h1>
      <p className='text-slate-700'>Data might take some time to fully load.</p>
    </> 
  )
}

export default Loading