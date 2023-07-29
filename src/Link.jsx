import React from 'react'

const Link = () => {
  return (
    <div className='h-64 grid place-content-center place-items-center lg:bg-[url("./images/bg-boost-desktop.svg")] bg-[url("./images/bg-boost-mobile.svg")] bg-no-repeat bg-cover bg-dark-violet '>
        <h2 className='text-white font-extrabold mb-3 lg:mb-6 text-2xl lg:text-4xl'>Boost your links today</h2>
        <button className='bg-cyan text-white text-lg rounded-full px-4 py-4 w-3/4 lg:w-1/2 hover:bg-dark-violet'>Get Started</button>
    </div>
  )
}

export default Link