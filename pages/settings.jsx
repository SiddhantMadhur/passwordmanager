import React, { useState } from 'react'
import Papa from 'papaparse'
import { useRouter } from 'next/router'

function Settings() {

  const acceptCSV = () => {
    Papa.parse(csv, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        localStorage.setItem('passwords', JSON.stringify(results.data))
      }
    })
  }

  const [csv, setCSV] = useState()

  const router = useRouter()

  return (
    <div>
      <div className='text-4xl flex justify-center gap-x-12 text-center mt-3 mb-4'>
        Settings
      </div>
      <div className='text-center my-3'>
        <button onClick={()=>{
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
            Not sure how to do it? Follow the instructions below.
          </div>
        </div>
        <div>

        </div>
      </div>
    </div>
  )
}

export default Settings