import { Card } from './index'

const Welcome = () => {
  return (
    <div className='flex w-full justify-center items-center'>
      <div className='flex md:flex-row flex-col items-start justify-between md:p-20 py-12 px-4'>
        <div className='flex flex-1 flex-col md:mr-10 justify-start'>
          <h1 className='text-4xl sm:text-5xl flex flex-col text-white text-gradient font-semibold py-1'>
            Send crypto <br /> around the world
          </h1>
          <p className='text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base'>
            Explore crypto enviroment... Transfer cryptocurrencies easily on CryptoPlace!!!
          </p>
          <button type='button' onClick={() => {}} className='bg-[#24d11b] rounded-full w-5/12 p-2 my-5 cursor-pointer'>
            <p className='text-white font-semibold text-lg'>Connect Wallet</p>
          </button>
        </div>
        <div className='flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10'>
          <Card />
        </div>
      </div>
    </div>
  )
}

export default Welcome
