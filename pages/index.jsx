
import React, { useState, useEffect } from 'react'
import Link from 'next/link'

function HomePage() {

  const [filter, setFilter] = useState('')

  const [passwords, setPasswords] = useState([{
    name: '',
    password: '',
    url: '',
    username: ''
  }])

  useEffect(() => {
    setPasswords(JSON.parse(localStorage.getItem('passwords')))
  }, [])

  useEffect(() => {
    console.log(passwords)
  }, [passwords])

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
      <div className='flex justify-center my-4'>
        <input className='text-black' type="text" placeholder='Search...' onChange={(e)=>setFilter(e.target.value)} />
      </div>
      <div>

        {
          passwords !== null ? (
            <table className='mx-auto w-[800px]'>
              <tbody>
                <tr className='text-left'>
                  <th>Index</th>
                  <th>URL</th>
                  <th>Email</th>
                  <th>Password</th>
                </tr>
                {
                  passwords.filter((doc) => {
                    return (doc.name.toLowerCase().includes(filter.toLowerCase()) || doc.username.toLowerCase().includes(filter.toLowerCase()))
                  }).map((doc, key) => {
                    let show = false
                    let URL = doc.url.replace('http://', '').replace('https://', '').replace('www.', '')
                    let temp = ''
                    let chk = true;
                    for (let i; i < URL.length; i++) {
                      if (chk) {
                        if (URL.charAt(i) === '/') {
                          chk = false
                        } else {
                          temp = temp + URL.charAt(i)
                        }
                      }
                    }
                    URL = temp

                    return (
                      <tr key={key}>
                        <td>{key + 1}</td>
                        <td>
                          <a className='hover:underline transition' href={doc.url}>
                            {doc.name.substring(0, 30)}{doc.name.length > 29 ? "..." : undefined}
                          </a>
                        </td>
                        <td>{doc.username}</td>
                        <td>
                          <button onClick={() => {
                            alert("Password: " + doc.password)
                          }}>
                            *******
                          </button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          ) : (
            <div className='text-center text-2xl'>
              You dont have any passwords. <Link href={'/settings'}><a className='text-blue-400 hover:text-blue-600 underline transition' >Please import them from here.</a></Link>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default HomePage