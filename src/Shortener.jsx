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
        const newLink = { original: inputValue, shortened: data.result.short_link, copied: false };
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

  const handleCopy = (index) => {
    const updatedLinks = [...shortenedLinks];
    updatedLinks[index].copied = true;
    setShortenedLinks(updatedLinks);

    navigator.clipboard.writeText(updatedLinks[index].shortened)
      .catch((error) => alert("Error copying to clipboard:", error));
  }

  return (
    <>
      <div className='lg:flex z-50 w-full lg:w-full lg:justify-center lg:items-center lg:flex-col lg:px-28 px-5'>
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


      {errorMessage && <p className='text-red'>{errorMessage}</p>}

      <div className='bg-slate-100 -mt-16 flex flex-col justify-center items-center pb-20'>
        {shortenedLinks.length > 0 && (
          <div className='relative z-50 mt-20 mx-5 w-full'>
            {shortenedLinks.map((link, index) => (
              <div key={index} className='lg:flex z-50 lg:py-3 lg:px-4 text-base lg:text-sm bg-white justify-center lg:justify-between mt-6 items-start lg:items-center mx-5 lg:mx-28 rounded-lg'>
                <p className='text-black w-full flex py-4 lg:py-0 px-3 lg:px-0 flex-wrap border-b border-gray lg:border-none truncate ...'>{link.original}</p>
                <div className=' w-full lg:flex place-content-end items-start lg:items-center lg:gap-4'>
                  <div className='text-cyan flex lg:justify-end w-full py-4 lg:py-0 px-3 lg:px-0 '>{link.shortened}</div>
                  <div className='flex w-full lg:w-20 items-center py-2 lg:py-0 px-3 lg:px-0'>
                    <button
                      className={`py-3 lg:py-2 lg:px-5 w-full rounded-lg flex text-center justify-center ${link.copied ? 'bg-dark-violet text-white' : 'bg-cyan text-white'}`}
                      onClick={() => handleCopy(index)}
                    >
                      {link.copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className='flex flex-col mt-28 mb-20 w-full lg:flex lg:flex-col lg:justify-center lg:items-center '>
          <h2 className='font-bold text-2xl lg:text-4xl text-dark-violet mb-4 text-center w-full'>Advanced Statistics</h2>
          <p className='text-grayish-violet text-center text-base mx-4 lg:mx-0 lg:text-lg lg:w-1/2'>Track how your links are performing across the web with our
            advanced statistics dashboard.</p>
        </div>

        <div className='lg:flex lg:gap-6 lg:mx-28'>
          <div className='bg-white relative rounded-lg flex flex-col justify-center items-center lg:items-start  mx-5 lg:mx-0 px-4 pb-6 lg:pb-0 h-72' style={{zIndex:10000}} >
            <div className=' relative z-50 -mt-20 p-4  rounded-full bg-dark-violet'><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><path fill="#2BD0D0" d="M36.406 11.719c.648 0 1.172.524 1.172 1.172v24.765h1.25a1.172 1.172 0 110 2.344H1.172a1.172 1.172 0 110-2.344h1.25V24.61c0-.647.524-1.172 1.172-1.172H8.28c.648 0 1.172.525 1.172 1.172v13.047h2.344v-8.36c0-.646.524-1.171 1.172-1.171h4.687c.648 0 1.172.525 1.172 1.172v8.36h2.344V19.921c0-.647.524-1.172 1.172-1.172h4.687c.648 0 1.172.525 1.172 1.172v17.734h2.344V12.891c0-.648.524-1.172 1.172-1.172zm-1.172 2.344h-2.343v23.593h2.343V14.063zm-9.375 7.03h-2.343v16.563h2.343V21.094zm-9.375 9.376h-2.343v7.187h2.343V30.47zM7.11 25.78H4.766v11.875h2.343V25.781zM34.062 0a3.52 3.52 0 013.516 3.516 3.52 3.52 0 01-3.516 3.515c-.72 0-1.389-.217-1.947-.59l-4.073 3.055a3.52 3.52 0 01-3.355 4.567 3.496 3.496 0 01-1.514-.344l-4.689 4.688c.22.459.344.973.344 1.515a3.52 3.52 0 01-3.515 3.515 3.52 3.52 0 01-3.488-3.949l-3.45-1.724a3.503 3.503 0 01-2.438.986 3.52 3.52 0 01-3.515-3.516 3.52 3.52 0 013.515-3.515 3.52 3.52 0 013.488 3.949l3.45 1.725a3.503 3.503 0 013.952-.643l4.689-4.688a3.496 3.496 0 01-.344-1.515 3.52 3.52 0 013.515-3.516c.72 0 1.39.218 1.948.59l4.073-3.054A3.52 3.52 0 0134.063 0zm-18.75 18.75c-.646 0-1.171.526-1.171 1.172 0 .646.525 1.172 1.171 1.172.647 0 1.172-.526 1.172-1.172 0-.646-.525-1.172-1.172-1.172zm-9.374-4.688c-.647 0-1.172.526-1.172 1.172 0 .646.525 1.172 1.171 1.172.647 0 1.172-.526 1.172-1.172 0-.646-.525-1.171-1.171-1.171zm18.75-4.687c-.647 0-1.172.526-1.172 1.172 0 .646.525 1.172 1.172 1.172.646 0 1.171-.526 1.171-1.172 0-.646-.525-1.172-1.172-1.172zm9.375-7.031c-.647 0-1.172.526-1.172 1.172 0 .646.525 1.171 1.172 1.171.646 0 1.171-.525 1.171-1.171s-.525-1.172-1.172-1.172z" /></svg></div>
            <h2 className='font-bold text-xl mt-10 mb-4 text-dark-violet'>Brand Recognition</h2>
            <p className='text-grayish-violet text-center lg:text-left'>Boost your brand recognition with each click. Generic links don’t
              mean a thing. Branded links help instil confidence in your content.
            </p>
          </div>

          <div className='h-full w-full xl:max-w-screen-lg 2xl:max-w-screen-xl flex lg:flex absolute lg:z-50 -mt-44 lg:mt-44 justify-center'>
            <span className='h-full w-2 lg:h-2 lg:w-full bg-cyan flex'></span>
          </div>

          <div className='bg-white relative rounded-lg flex flex-col justify-center items-center lg:items-start mx-5 lg:mx-0 px-4 pb-6 lg:pb-0 mt-20 lg:mt-14 h-72' style={{zIndex:10000}}>
            <div className=' relative z-50 -mt-20 p-4  rounded-full bg-dark-violet'>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><path fill="#2BD0D0" d="M19.968 0c11.01 0 19.969 8.958 19.969 19.968s-8.958 19.969-19.969 19.969C8.958 39.937 0 30.979 0 19.968 0 8.958 8.958 0 19.968 0zm7.805 35.579c-4.863-2.402-10.746-2.402-15.609 0a17.339 17.339 0 007.804 1.862 17.34 17.34 0 007.805-1.862zm-6.556-33.02V6.24H18.72V2.56a17.362 17.362 0 00-9.492 3.656l2.798 2.797-1.765 1.765L7.373 7.89a17.41 17.41 0 00-4.678 9.582h4.793v2.497H2.496c0 5.805 2.857 10.943 7.227 14.122 6.217-3.714 14.274-3.714 20.49 0 4.37-3.179 7.228-8.317 7.228-14.123h-4.992v-2.496h4.793a17.41 17.41 0 00-4.678-9.582l-2.888 2.888-1.765-1.765 2.798-2.797a17.362 17.362 0 00-9.492-3.657zm-2.437 8.292c.332-1.034 2.045-1.034 2.377 0 .635 1.978 3.804 11.955 3.804 14.11a4.997 4.997 0 01-4.993 4.992 4.997 4.997 0 01-4.992-4.992c0-2.155 3.17-12.132 3.804-14.11zm1.188 4.567c-1.233 4.047-2.496 8.522-2.496 9.543a2.5 2.5 0 002.496 2.496 2.5 2.5 0 002.497-2.496c0-1.02-1.263-5.496-2.497-9.543z" /></svg>
            </div>
            <h2 className='font-bold text-xl mt-10 mb-4 text-dark-violet'>Detailed Records</h2>
            <p className='text-grayish-violet text-center lg:text-left'>Gain insights into who is clicking your links. Knowing when and where
              people engage with your content helps inform better decisions.
            </p>
          </div>

          <div className='bg-white relative rounded-lg flex flex-col justify-center items-center lg:items-start mx-5 lg:mx-0 px-4 pb-6 lg:pb-0 mt-20 lg:mt-28 h-72' style={{zIndex:10000}}>
            <div className=' relative z-50 -mt-20 p-4  rounded-full bg-dark-violet'>
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><path fill="#2BD0D0" d="M46.608 6.02a.975.975 0 00-.927-.047l-7.624 3.591a8.283 8.283 0 00-4.728 6.837l-.196 2.436-3.95 6.561v-2.801c0-.01-.006-.017-.006-.027a.974.974 0 00-.046-.284l-1.838-5.514 3.753-7.504a.984.984 0 00-.099-1.03l-5.9-7.867a1.019 1.019 0 00-1.573 0L17.573 8.24a.984.984 0 00-.093 1.03l3.753 7.503-1.838 5.514a.974.974 0 00-.047.284v3.951l-6.127-9.299c-.007-.01-.02-.017-.026-.026a.995.995 0 00-.211-.215c-.02-.013-.036-.03-.056-.042-.02-.013-.022-.02-.035-.027l-3.605-2.085-1.497-2.271L5.628 9.27a.983.983 0 00-1.147-.386L.654 10.227a.983.983 0 00-.491 1.468l2.705 4.107 1.492 2.27.492 4.137a.36.36 0 00.01.04c.004.02.009.041.015.061a.973.973 0 00.116.295c.007.01.007.023.014.033.007.01 14.624 22.165 14.695 22.225A4.87 4.87 0 0024.255 48c.4 0 .8-.05 1.19-.145a4.886 4.886 0 003.028-2.235l13.08-21.698 2.065-1.307a8.343 8.343 0 002.66-2.721 8.259 8.259 0 001.18-4.651l-.383-8.42a.984.984 0 00-.467-.803zm-7.122 17.524l-1.522 2.527-5.054-3.048 1.524-2.527 5.052 3.048zM21.315 38.446V23.58h5.9v5.08l-5.9 9.786zm1.693-20.766h2.515l1.31 3.933h-5.136l1.31-3.933zm1.257-6.885a.983.983 0 110-1.966.983.983 0 010 1.966zm0-8.194l4.75 6.331-3.39 6.78h-.377v-3.13a2.95 2.95 0 10-1.966 0v3.13h-.376l-3.39-6.78 4.75-6.331zM10.53 17.818l-.29.19-3.621 2.387-.333-2.787a.982.982 0 00-.156-.424l-1.081-1.642L6.69 14.46l1.081 1.642a.988.988 0 00.329.31l2.429 1.406zm-6.122-6.826l1.2 1.822-1.642 1.082-1.475-2.232 1.917-.672zm5.249 9.755l2.458-1.624 7.233 10.972v10.726L7.193 22.371l2.464-1.624zm17.135 23.851a2.95 2.95 0 11-5.052-3.048l7.425-12.315h.017v-.027l2.712-4.499 2.527 1.526 2.53 1.52-10.16 16.843zm17.807-25.724a6.353 6.353 0 01-2.028 2.073l-1.747 1.107-2.852-1.717-2.852-1.717.162-2.065a6.318 6.318 0 013.604-5.213L45.18 8.38l.125 2.74a.973.973 0 00-.295.014l-2.382.59a5.986 5.986 0 00-4.425 4.524.983.983 0 001.919.43 4.032 4.032 0 012.977-3.043l2.297-.57.103 2.262a6.304 6.304 0 01-.9 3.548z" /></svg>
            </div>
            <h2 className='font-bold text-xl mt-10 mb-4 text-dark-violet'>Fully Customizable</h2>
            <p className='text-grayish-violet text-center lg:text-left'>Improve brand awareness and content discoverability through customizable
              links, supercharging audience engagement. </p>
          </div>
        </div>
      </div>

    </>
  );
};

export default Shortener;
