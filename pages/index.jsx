
import React, { useState, useEffect } from 'react'
import Link from 'next/link'

function HomePage() {

  const [reload, setReload] = useState(-1)
  const [tempURL, setTempURL] = useState('')
  const [tempEmail, setEmail] = useState('')
  const [tempPassword, setTempPassword] = useState('')

  const [filter, setFilter] = useState('')

  const [passwords, setPasswords] = useState([{
    name: '',
    password: '',
    url: '',
    username: ''
  }])

  useEffect(() => {
    setPasswords(JSON.parse(localStorage.getItem('passwords')))
  }, [reload])


  return (
    <div className='mx-2'>
      <div className='text-4xl flex justify-center gap-x-12 text-center pt-5 mb-6'>
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
      <div className='mx-auto max-w-fit my-3'>
        <div className='text-xl my-2'>
          Add Password:
        </div>
        <div className='flex flex-col gap-3 text-black'>
          <div>
            <input className='w-full' type="text" placeholder='URL' onChange={e => setTempURL(e.target.value)} />
          </div>
          <div className='flex gap-x-3'>
            <input type="text" placeholder='Email' onChange={e => setEmail(e.target.value)} />
            <input type="text" placeholder='Password' onChange={e => setTempPassword(e.target.value)} />
          </div>
          <div className='text-center'>
            <button onClick={() => {
              let URL = tempURL.replace('http://', '').replace('https://', '').replace('www.', '')
              let tempName = '';
              let chk = true;
              for (let i = 0; i < URL.length; i++) {
                if (chk) {
                  if (URL.charAt(i) === '/') {
                    chk = false
                  } else {
                    tempName = tempName + URL.charAt(i)
                  }
                }
              }
              const tempInput = [{
                username: tempEmail,
                password: tempPassword,
                name: tempName,
                url: tempURL
              }]
             console.log(localStorage.getItem('passwords'))
             if ( localStorage.getItem('passwords') !== null) {
              const temp = tempInput.concat(JSON.parse(localStorage.getItem('passwords')))
              localStorage.setItem('passwords', JSON.stringify(temp))
            }else{
              localStorage.setItem('passwords', JSON.stringify(tempInput))
            }
              setReload(reload + 1)
            }} className='bg-gray-300 text-gray-800 font-semibold hover:bg-gray-400 transition px-2 py-1 rounded-lg text-lg'>
              ADD
            </button>
          </div>
        </div>
      </div>
      <div className='flex justify-center w-[700px] mx-auto gap-x-3 my-4'>
        <div className='text-black w-full  filter drop-shadow-lg h-12'>
          <input
            className='text-black w-full  h-12'
            type="text"
            placeholder='Search...'
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          />
        </div>
        {
          filter.length > 0 ? (
            <div className='my-auto' >
              <button
                onClick={() => {
                  setFilter('')
                }}
                className='text-gray-100 my-auto bg-red-500 p-2 rounded-lg border filter drop-shadow-lg hover:bg-red-600 border-black'
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : undefined
        }
      </div>


      <div>

        {
          passwords !== null ? (
            <div className='flex justify-center gap-y-3 flex-col w-full mx-auto max-w-[700px] '>

              {
                passwords.filter((doc) => {
                  return (doc.name.toLowerCase().includes(filter.toLowerCase()) || doc.username.toLowerCase().includes(filter.toLowerCase()))
                }).sort((a, b) => {
                  if (a.name < b.name) {
                    return -1
                  } else if (a.name > b.name) {
                    return 1
                  } else {
                    return 0
                  }
                }).map((doc, key) => {
                  return (
                    <div key={key} className="bg-white flex h-16 rounded-lg filter drop-shadow-lg gap-3 px-5 ">
                      <div className='my-auto w-full'>
                        <a target='_blank' rel='noreferrer' className='hover:underline transition' href={doc.url}>
                          {doc.name.substring(0, 22)}{doc.name.length > 21 ? "..." : undefined}
                        </a>
                      </div>
                      <div className='flex flex-col w-full my-auto '>
                        <div>{doc.username}</div>
                        <div className=''>
                          <button onClick={() => {
                            alert("Password: " + doc.password)
                          }}>
                            *******
                          </button>
                        </div>
                      </div>
                      <div className='w-full h-fit  my-auto text-right  '>
                        <button className='hover:bg-gray-100 p-2 transition rounded-lg filter' onClick={() => {
                          let temp = []
                          passwords.map((tempDoc, i) => {
                            if (tempDoc !== doc) {
                              temp.push(tempDoc)
                            }
                          })
                          setPasswords(temp)
                          localStorage.setItem('passwords', JSON.stringify(temp))
                        }}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )
                })
              }

            </div>
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