import { useState } from 'react'

function App() {

  const [inputUsername, setInputUsername] = useState<string>('')

  //console.log(inputUsername)
  const submitUsername = () => {
    console.log(inputUsername)
  }

  return (
    <div className='flex flex-col h-screen p-5 bg-zinc-400'>
      <h1 className='text-gray-600 text-center text-4xl font-bold'>Github Progress of the Year!</h1>
      <div className='flex flex-col h-full items-center justify-center gap-3'>
        <label
          className='text-xl text-white font-semibold'
          htmlFor="username">Username:</label>
        <input
          onChange={e => setInputUsername(e.target.value)} 
          id='username' 
          type="text"
          className='outline-none bg-gray-500 border-2 border-gray-500 rounded-md p-2 text-center text-white focus:bg-gray-400 focus:border-white duration-150' />
        <button 
          onClick={submitUsername} 
          type='button'
          className='text-white p-3 rounded-md bg-slate-600'
          title='click me to generate your github progress!'
          >Submit</button>
      </div>  
    </div>
  )
}

export default App
