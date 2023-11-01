import { useState, useEffect, useRef, useCallback } from 'react'
import { toPng } from 'html-to-image';

interface UserProps {
    username: string
    reposThisYear: number
    profileUrl: string
    followersCount: number
    language: string
    recentRepo: string
}

const UserOutput = ({ 
        username, 
        reposThisYear, 
        profileUrl, 
        followersCount,
        language,
        recentRepo 
    }: UserProps) => {

  const ref = useRef<HTMLDivElement>(null)    

  const [languageColor, setLanguageColor] = useState<string>('')

  useEffect(() => {
    switch(language){
      case 'HTML':
        setLanguageColor('text-orange-500')
        break
      case 'CSS':
        setLanguageColor('text-blue-400')
        break
      case 'JavaScript':
        setLanguageColor('text-yellow-500')
        break
      case 'TypeScript':
        setLanguageColor('text-blue-600')
        break
      case 'Java':
        setLanguageColor('text-orange-700')
        break
      case 'Python':
        setLanguageColor('text-yellow-400')
        break
      case 'C':
        setLanguageColor('text-green-400')
        break
      case 'C++':
        setLanguageColor('text-pink-600')
        break
      case 'C#':
        setLanguageColor('text-green-500')
        break
      case 'PHP':
        setLanguageColor('text-violet-500')
        break
      case 'Ruby':
        setLanguageColor('text-red-400')
        break
      case 'Swift':
        setLanguageColor('text-orange-400')
        break
      case 'SCSS':
        setLanguageColor('text-pink-400')
        break
      default:
        setLanguageColor('text-white')
    }
  }, [language])
  
  const saveAsImage = useCallback(() => {
    if (ref.current === null) return

    toPng(ref.current, { cacheBust: true, })
    .then((dataUrl) => {
      const link = document.createElement('a')
      link.download = `${username}-github-wrapped.png`
      link.href = dataUrl
      link.click()
    })
    .catch((err) => console.error(err))
  }, [ref])

  //`https://ghchart.rshah.org/008000/${username}` // for the github chart contributions sana

  return (
    <div className='flex flex-col items-center gap-5 p-10'>
      <div ref={ref} className="flex flex-col w-auto gap-3 text-center bg-[url('./assets/github-logo.png')] bg-[length:65px_65px] items-center p-5 rounded-md bg-zinc-700 text-white">
        <h1 className='text-4xl font-semibold text-gray-300'>Your Github Year Wrapped!</h1>
        <div className='flex gap-3 text-center p-2'>
          <div className='flex flex-col items-center justify-center bg-slate-700 h-full gap-3 p-5 rounded-md'>
            <img className='w-28 h-28 rounded-full' src={profileUrl} alt="user_profile" />
            <h1 className="text-2xl font-bold">{username}</h1>
            <div className="flex flex-col gap-1">
              <h1 className="text-sm">Recently created repository</h1>
              <h1 className="text-2xl font-semibold text-green-500">{recentRepo}</h1>
            </div>
          </div>
          <div className='flex flex-col items-center gap-5'>
            <div className='flex gap-3 p-5 justify-center rounded-md bg-slate-700 w-full'>
              <h1 className='w-52 text-xl'>Created <span className="text-green-500 font-bold">{reposThisYear}</span> repositories this year!</h1>
            </div>
            <div className='flex gap-3 p-5 justify-center rounded-md bg-slate-700 w-full'>
              <h1 className='text-xl'>Has <span className="text-green-500 font-bold">{followersCount}</span> {followersCount == 1 ? 'follower' : 'followers'}</h1>
            </div>
            <div className='flex flex-col gap-3 p-5 items-center rounded-md bg-slate-700 w-full'>
              <h1>Most used programming language</h1>
              <h1 className={`text-xl font-bold ${languageColor}`}>{language}</h1>
            </div>
          </div>
        </div>
        
      </div>
      <button 
        type='button' 
        onClick={saveAsImage} 
        title='save result as image'
        className='font-semibold text-white bg-blue-500 rounded-md p-3 opacity-70 hover:opacity-100 duration-150'>
          Save as image
      </button>
    </div>
  )
}

export default UserOutput