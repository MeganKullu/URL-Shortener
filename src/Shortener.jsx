import React, { useState, useEffect } from 'react';

const Shortener = () => {
  const [inputValue, setInputValue] = useState('');
  const [shortenedLinks, setShortenedLinks] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

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
        setShortenedLinks([...shortenedLinks, newLink]);
        setInputValue('');
        setErrorMessage('');
      } else {
        setErrorMessage('Failed to shorten the URL. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    const storedLinks = localStorage.getItem('shortenedLinks');
    if (storedLinks) {
      setShortenedLinks(JSON.parse(storedLinks));
    }
  }, []);


  const handleCopy = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy)
      .then(() => setCopied(true))
      .catch((error) => console.error("Error copying to clipboard:", error));
  };

  return (
    <div className='lg:flex lg:w-full lg:justify-center lg:items-center lg:flex-col lg:px-28 px-5'>
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

      {shortenedLinks.length > 0 && (
        <div className='flex justify-center mt-8'>
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

      {errorMessage && <p className='text-red'>{errorMessage}</p>}
    </div>
  );
};

export default Shortener;
