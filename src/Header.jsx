import React from 'react'


function Header () {
  return (
   <>
  <div className='h-screen flex flex-col justify-center '>
    <div className='flex justify-between p-4'>
        <h1 className='text-3xl font-bold text-very-dark-blue'>Shortly</h1>
        <nav className ="flex lg:hidden"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg></nav>
    </div>
    <div className='h-1/2'><img src="" alt="" /></div>
    <p className='text-4xl font-extrabold text-center text-very-dark-blue mb-4'>More than just shorter links</p>
    <p className="text-base text-center text-gray mb-6">Build your brand's recognition and get detailed insights on how your links are performing.</p>
    <button className='text-white text-bold text-lg bg-cyan rounded-full py-2 px-4 hover:bg-dark-violet w-1/2 self-center'>Get Started</button>
  </div> 
    </>  
  )
}

export default Header