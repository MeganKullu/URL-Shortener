import React, { useState, useEffect } from 'react';

const Shortener = () => {
  const [inputValue, setInputValue] = useState('');
  const [shortenedLinks, setShortenedLinks] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const storedLinks = localStorage.getItem('shortenedLinks');
    console.log(storedLinks);
    if (storedLinks) {
      setShortenedLinks(JSON.parse(storedLinks));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputValue) {
      setErrorMessage("Please enter a valid URL.");
      return;
    }

    try {
      const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${inputValue}`);
      const data = await response.json();

      if (data.ok) {
        const newLink = { original: inputValue, shortened: data.result.short_link };
        setShortenedLinks((prevLinks) => [...prevLinks, newLink]);
        setInputValue("");
        setErrorMessage("");
        setCopied(false); // Reset the copied state for the new link

        // Save the updated list to local storage
        localStorage.setItem('shortenedLinks', JSON.stringify([...shortenedLinks, newLink]));
      } else {
        setErrorMessage('Failed to shorten the URL. Please try again.')
      }

    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred. Please try again.")
    }
  }

  const handleCopy = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy)
      .then(() => setCopied(true))
      .catch((error) => alert("Error copying to clipboard:", error));
  }

  return (
    <>
    <div className='lg:relative z-50 w-full lg:w-full lg:justify-center lg:items-center lg:flex-col lg:px-28 px-5'>
      <form onSubmit={handleSubmit} className='p-4 lg:py-8 lg:px-10 rounded-xl lg:rounded-lg bg-dark-violet lg:bg-[url("./images/bg-shorten-desktop.svg")] bg-[url("./images/bg-shorten-mobile.svg")] flex flex-col lg:flex-row lg:gap-4 place-content-between h-40 lg:h-32 mt-12 relative z-50 w-full'>
        <input
          type="text"
          className='lg:basis-3/4 w-full p-3 rounded-lg'
          placeholder='Shorten a link here...'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className='lg:basis-1/4 text-center p-3 text-white bg-cyan font-bold text-lg rounded-lg hover:bg-gray'>
          Shorten It!
        </button>
      </form>
    
    </div>
      {shortenedLinks.length > 0 && (
        
          shortenedLinks.map((link, index) => (
            <div key={index} className='lg:flex z-50 lg:py-3 lg:px-4 text-base lg:text-sm bg-white justify-between w-full mt-6 items-start lg:items-center  mx-auto rounded-xl'>
              <div className='text-black w-full flex py-2 lg:py-0 px-2 lg:px-0 flex-wrap border-b lg:border-none'>{link.original}</div>
              <div className=' w-full lg:flex place-content-end items-start lg:items-center lg:gap-4'>
                <div className='text-cyan flex w-full py-2 lg:py-0 px-2 lg:px-0'>{link.shortened}</div>
                <div className='flex w-full items-center py-2 lg:py-0 px-2 lg:px-0'>
                  <button
                  className={`py-3 lg:py-1 lg:px-2 w-full rounded-lg flex text-center justify-center ${copied ? 'bg-dark-violet text-white' : 'bg-cyan text-white'}`}
                  onClick={() => handleCopy(link.shortened)}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                </div>
              </div>
            </div>
          ))
      
      )}

      {errorMessage && <p className='text-red'>{errorMessage}</p>}
    </>
  );
};

export default Shortener;
