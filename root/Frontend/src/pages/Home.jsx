import React from 'react'
import { Link, useNavigate } from 'react-router-dom';


function Home() {

  const navigate = useNavigate();

  return (
    <div className='max-w-full py-8 min-h-screen'>
      <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#454544_1px,transparent_1px)] [background-size:16px_16px]">
      </div>
      <div className='relative mx-6'>
        <div className='text-center bg-[#E1DABF] '>
            <h1 className='mb-4 text-3xl font-bold text-black md:text-5xl lg:text-7xl sm:text-4xl text-wrap font-space-grotesk border border-neutral-500 p-4  shadow-black shadow-[inset_2px_2px_15px_rgba(0,0,0,0.9)]'>
              Reimagine Notes with H-Keep
            </h1>
        </div>
        <div className='flex w-full mt-8'>
        <div className='text-center border-neutral-500 p-4  shadow-black shadow-[inset_2px_2px_15px_rgba(0,0,0,0.9)] bg-[#E1DABF] w-full transition duration-400'>
          <h1 className='bg-[#E1DABF] text-3xl font-bold text-black md:text-5xl lg:text-6xl sm:text-4xl text-wrap font-space-grotesk mb-2' >
            What is H-Keep ?
          </h1>
          <hr className='border-black my-2' />
          <p className='text-black font-space-grotesk text-wrap md:text-lg lg:text-xl'>
            H-Keep is Note and List Management Application, It offers you an intuitive UI and plethora of features for your note solutions.
          </p>
        </div>
        </div>
        <div className='text-center border-neutral-500 p-4  shadow-black shadow-[inset_2px_2px_15px_rgba(0,0,0,0.9)] bg-[#E1DABF] w-full transition duration-400 mt-8'>
              <h1 className='mb-4 bg-[#E1DABF] text-3xl font-bold text-black md:text-5xl lg:text-6xl sm:text-4xl text-wrap font-space-grotesk '>
                    Lets Explore ...
              </h1>
              <Link to="/signup">
              <button className="shadow-[0_1px_4px_1px_#000000_inset] md:px-10 md:py-3 sm:px-6 sm:py-2 px-6 py-2 border border-black text-black font-bold transform hover:-translate-y-2 transition duration-400 bg-[#E1DABF]"
              >
                Signup
              </button>
              </Link>
        </div>
      </div>   
    </div>
  )
}

export default Home