import React, { useState } from 'react'

import UserOutput from './components/UserOutput'
import Loading from './components/Loading'
import Error from './components/Error'
import Footer from './components/Footer'

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
  const [totalRepos, setTotalRepos] = useState<number>(0)
  const [totalYearContri, setTotalYearContri] = useState<number>(0)
  const [displayOutput, setDisplayOutput] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  
  const currentYear = new Date().getFullYear();

  const submitUsername = async (e:React.SyntheticEvent) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      await fetch(`https://api.github.com/users/${inputUsername}/repos?per_page=100`)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data)
        setTotalRepos(data.length)
        filterReposData(data)
        getUserProfilePhoto(data)
        getFollowers(data)
        mostUsedProgrammingLanguage(data)
        mostRecentRepo(data)
        setDisplayOutput(true)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setIsLoading(false)
        setError(true)
      })
    } catch(error) {
      console.error('oh no!: ' + error)
      setIsLoading(false)
      setError(true)
    }
  }

  const filterReposData = async (data:[]) => {
    const currentYearRepos = data.filter((repo:GithubDate) => {
      const repoYear = new Date(repo.created_at).getFullYear()
      return repoYear === currentYear
    })
    const totalReposThisYear = currentYearRepos.length
    await totalContributions(currentYearRepos)
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
      //console.log(followersUrl + '?per_page=100')
      fetch(followersUrl + '?per_page=200')
      .then(res => res.json())
      .then(data => {
        setFollowersCount(data.length)
        //console.log(data.length)
      })
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

  const totalContributions = async (currentYearRepos:any[]) => {
    let totalContri:number = 0
    for (const repo of currentYearRepos) {
      try {
        const response = await fetch(repo.contributors_url)
        if (response.ok) {
          const contributors = await response.json()
          for (const contributor of contributors) {
            if (contributor.login === inputUsername) {
              totalContri += contributor.contributions
            }
          }
        }
      } catch (error) {
        console.error(error)
      }
    }
    //console.log(totalContri)
    setTotalYearContri(totalContri)
  }

  return (
    <div className='flex flex-col justify-between h-screen gap-10 p-5 bg-zinc-400 overflow-auto'>
      <h1 className='text-gray-600 text-center text-4xl font-bold'>Github Progress of the Year!</h1>
      <div className='flex flex-col items-center gap-3'>
        <form onSubmit={e => submitUsername(e)} className='flex flex-col gap-5 text-center'>
          <label
            className='text-xl text-white font-semibold'
            htmlFor="username">Input your Github username:</label>
          <input
            onChange={e => {
              setInputUsername(e.target.value)
              setDisplayOutput(false)
              setIsLoading(false)
            }} 
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
        { error && <Error setError={setError} /> }
        { isLoading && <Loading /> }
        {
          displayOutput
          &&
          <UserOutput
            username={inputUsername}
            totalRepos={totalRepos}
            reposThisYear={reposThisYear}
            profileUrl={profileUrl}
            followersCount={followersCount}
            language={language}
            recentRepo={recentRepo} 
            totalYearContri={totalYearContri}
          />          
        }
      </div>
      <Footer /> 
    </div>
  )
}

export default App
