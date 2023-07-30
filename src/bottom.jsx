{shortenedLinks.length > 0 && (
    <div className='flex justify-center mt-8 z-50'>
      {shortenedLinks.map((link, index) => (
        <div key={index} className='flex py-3 px-4 text-sm bg-white justify-between w-10/12 mt-4 items-center absolute mx-auto'>
          <div className='text-black'>{link.original}</div>
          <div className='flex place-content-end items-center gap-4'>
            <div className='text-cyan'>{link.shortened}</div>
            <button
              className={`py-1 px-2 rounded-lg ${copied ? 'bg-dark-violet text-white' : 'bg-cyan text-white'}`}
              onClick={() => handleCopy(link.shortened)}
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      ))}
    </div>
  )}