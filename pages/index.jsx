
import React, { useState, useEffect } from 'react'
import Link from 'next/link'

function HomePage() {

  const [passwords, setPasswords] = useState([{
    name: '',
    password: '',
    url: '',
    username: ''
  }])

  useEffect(()=>{
    setPasswords(JSON.parse(localStorage.getItem('passwords')))
  },[])

  return (
    <div>
      <div className='text-4xl flex justify-center gap-x-12 text-center mt-5 mb-6'>
        <div>
          Password Manager
        </div>
        <div className='my-auto'>
          <Link href={'/settings'}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </Link>

        </div>
      </div>
      <div>
        <table className='mx-auto'>
          <thead>
            <th>Name</th>
            <th>url</th>
            <th>username</th>
            <th>password</th>
          </thead>
          <tbody>

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default HomePage