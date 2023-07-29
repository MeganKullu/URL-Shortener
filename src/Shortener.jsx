import React from 'react'

const Shortener = () => {
  return (
    <div className='lg:flex w-full lg:justify-center lg:items-center lg:flex-col lg:px-28'>
        <div className='p-4 lg:py-8 lg:px-10 rounded-xl lg:rounded-lg bg-dark-violet lg:bg-[url("./images/bg-shorten-desktop.svg")] bg-[url("./images/bg-shorten-mobile.svg")] flex flex-col lg:flex-row  lg:gap-4 place-content-between h-40 lg:h-32 mt-12 mx-5 relative z-50 w-full'>
            <input type="text" className='lg:basis-3/4 w-full p-3  rounded-lg ' placeholder='Shorten a link here...'/>
            <button className='lg:basis-1/4 text-center p-3  text-white bg-cyan font-bold text-lg rounded-lg hover:bg-dark-violet'>Shorten It!</button>
        </div>
    </div>
  )
}

export default Shortener