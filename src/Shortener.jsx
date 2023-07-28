import React from 'react'

const Shortener = () => {
  return (
    <div>
        <div className='p-6 rounded-xl bg-dark-violet flex flex-col place-content-between h-40 mt-12 mx-5 relative z-50'>
            <input type="text" className='w-full p-3 rounded-lg' placeholder='Shorten a link here...'/>
            <button className='text-center p-3 text-white bg-cyan font-bold text-lg rounded-lg hover:bg-dark-violet'>Shorten It!</button>
        </div>
    </div>
  )
}

export default Shortener