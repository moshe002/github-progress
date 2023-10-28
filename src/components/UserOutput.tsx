import React from 'react'

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

  return (
    <div className='flex flex-col gap-3 text-center items-center p-5 rounded-md bg-zinc-700 text-white'>
        <img className='w-28 h-28 rounded-full' src={profileUrl} alt="user_profile" />
        <h1>{username}</h1>
        <h1>Recently created repository: {recentRepo}</h1>
        <h1 className='w-40'>You have created {reposThisYear} repositories this year!</h1>
        <h1>You have {followersCount} followers</h1>
        <h1>Most used programming language: {language}</h1>
    </div>
  )
}

export default UserOutput