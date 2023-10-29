import React, { useState } from 'react'

import UserOutput from './components/UserOutput'

interface GithubDate {
  created_at: string
}

function App() {

  const [inputUsername, setInputUsername] = useState<string>('')
  const [reposThisYear, setReposThisYear] = useState<number>(0)
  const [profileUrl, setProfileUrl] = useState<string>('')
  const [followersCount, setFollowersCount] = useState<number>(0)
  const [language, setLanguage] = useState<string>('')
  const [recentRepo, setRecentRepo] = useState<string>('')
  const [displayOutput, setDisplayOutput] = useState<boolean>(false)
  
  const currentYear = new Date().getFullYear();

  const submitUsername = async (e:React.SyntheticEvent) => {
    e.preventDefault()
    try {
      await fetch(`https://api.github.com/users/${inputUsername}/repos`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        filterReposData(data)
        getUserProfilePhoto(data)
        getFollowers(data)
        mostUsedProgrammingLanguage(data)
        mostRecentRepo(data)
        setDisplayOutput(true)
      })
      .catch((error) => {
        console.error(error)
      })
    } catch(error) {
      console.error('oh no!: ' + error)
    }
  }

  const filterReposData = (data:[]) => {
    const currentYearRepos = data.filter((repo:GithubDate) => {
      const repoYear = new Date(repo.created_at).getFullYear()
      return repoYear === currentYear
    })
    const totalReposThisYear = currentYearRepos.length
    setReposThisYear(totalReposThisYear)
  }

  const getUserProfilePhoto = (data:any) => { // change any to specific data type (a must haha)
    const profileURL = data[0].owner.avatar_url
    setProfileUrl(profileURL)
    //console.log(profileURL)
  }

  const getFollowers = (data:any) => {
    try {
      const followersUrl = data[0].owner.followers_url
      fetch(followersUrl)
      .then(res => res.json())
      .then(data => setFollowersCount(data.length))
    } catch(error) {
      console.error(error)
    }
  }

  const mostUsedProgrammingLanguage = (data:[]) => {
    const languageCounts: { [key: string]: number } = {}
    data.forEach((repo:any) => {
      const language:string = repo.language
      if (language) {
        if (languageCounts[language]) {
          languageCounts[language]++
        } else {
          languageCounts[language] = 1
        }
      }
    })

    let mostUsedLanguage = ""
    let maxCount = 0

    for (const language in languageCounts) {
      if (languageCounts[language] > maxCount) {
        mostUsedLanguage = language
        maxCount = languageCounts[language]
      }
    }
    setLanguage(mostUsedLanguage)
  } 

  const mostRecentRepo = (data:[]) => {

    let mostRecentRepo: any = null
    let mostRecentDate = new Date(0)

    data.forEach((repo:any) => {
      const createdDate = new Date(repo.created_at)
      if (createdDate > mostRecentDate) {
        mostRecentDate = createdDate
        mostRecentRepo = repo
      }
    });

    if (mostRecentRepo) {
      setRecentRepo(mostRecentRepo.name)
    } else {
      setRecentRepo("No recent repositories.")
    }
  }

  return (
    <div className='flex flex-col h-screen gap-10 p-5 bg-zinc-400 overflow-auto'>
      <h1 className='text-gray-600 text-center text-4xl font-bold'>Github Progress of the Year!</h1>
      <div className='flex flex-col items-center gap-3'>
        <form onSubmit={e => submitUsername(e)} className='flex flex-col gap-5 text-center'>
          <label
            className='text-xl text-white font-semibold'
            htmlFor="username">Input your Github username:</label>
          <input
            onChange={e => setInputUsername(e.target.value)} 
            id='username' 
            type="text"
            className='outline-none bg-gray-500 border-2 border-gray-500 rounded-md p-2 text-center text-white focus:bg-gray-400 focus:border-white duration-150' 
            required />
          <button 
            type='submit'
            className='text-white p-3 rounded-md bg-slate-600'
            title='click me to generate your github progress!'
            >Submit</button>
        </form>
        {
          displayOutput
          &&
          <UserOutput
            username={inputUsername}
            reposThisYear={reposThisYear}
            profileUrl={profileUrl}
            followersCount={followersCount}
            language={language}
            recentRepo={recentRepo} 
          />
        }
      </div> 
    </div>
  )
}

export default App