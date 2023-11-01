
function Footer() {
  return (
    <div className="flex flex-col w-full items-center gap-2 text-center text-xs">
        <p className="text-zinc-600 italic">
            I am not affiliated with Github. The data being displayed came from their api.
        </p>
        <div className="flex gap-3">
          <p className="text-zinc-600">Creator socials:</p>
          <a className="text-blue-600" href="https://www.facebook.com/mosesanthony873" target="_blank" rel="noopener">Facebook</a>
          <a className="text-gray-600" href="https://github.com/moshe002" target="_blank" rel="noopener">Github</a>
          <a className="text-black" href="https://twitter.com/_mosheee" target="_blank" rel="noopener">X</a>  
        </div>
    </div>
  )
}

export default Footer