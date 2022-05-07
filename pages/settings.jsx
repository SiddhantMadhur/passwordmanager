import React, { useState } from 'react'
import Papa from 'papaparse'
import { useRouter } from 'next/router'

function Settings() {

  const acceptCSV = () => {
    if(csv){
      Papa.parse(csv, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          localStorage.setItem('passwords', JSON.stringify(results.data))
        }
      })
    }
  }

  const [csv, setCSV] = useState()

  const router = useRouter()

  return (
    <div>
      <div className='text-4xl flex justify-center gap-x-12 text-center mt-3 mb-4'>
        Settings
      </div>
      <div className='text-center my-3 '>
        <button className='hover:underline transition hover:opacity-90 text-xl' onClick={() => {
          router.back()
        }}>
          go back
        </button>
      </div>
      <div className='text-center'>
        <div className='text-2xl'>
          Import from Chrome
        </div>
        <div className='text-xl'>
          <div className='my-3'>
            Already know how to do it?
          </div>
          <div className='my-3'>
            <input type="file" accept='.csv' onChange={e => setCSV(e.target.files[0])} />
            <button onClick={acceptCSV} className=' transition bg-gray-700 hover:bg-gray-500 text-gray-100 px-4 py-2 rounded-lg'>
              Upload CSV
            </button>
          </div>
          <div>
            <div className='text-2xl my-3'>
              Not sure how to do it? Follow the instructions below.
            </div>
            <div>
              <ul className='text-left w-fit mx-auto'>
                <li>- Open Google Chrome</li>
                <li>- Click on your profile picture on the top right of chrome</li>
                <li>- Click on the key icon under your name to open passwords</li>
                <li>- Click on the three vertical dots next to where it says Saved Passwords</li>
                <li>- Export passwords and upload it on here</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings