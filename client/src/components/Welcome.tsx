import shortenAddress from '../utils/shortenAddress'
import useTransaction from '../hooks/useTransaction'

interface Props {
  placeholder: string
  type: string
  name: string
  value: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void
}

const Input = ({ handleChange, name, placeholder, type, value }: Props) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      step='0.0001'
      value={value}
      onChange={(e) => handleChange(e, name)}
      className='my-2 w-full rounded-md p-2 outline-none bg-transparent text-white black-glassmorphism'
    />
  )
}

const Welcome = () => {
  const { connectWallet, currentAccount, formData, handleChange, isLoading, sendTransaction } = useTransaction()

  const handleSummit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { addressTo, amount, keyword, message } = formData
    e.preventDefault()
    if (!addressTo || !amount || !keyword || !message) return
    sendTransaction()
  }

  return (
    <div className='flex w-full justify-center items-center'>
      <div className='flex md:flex-row flex-col items-center justify-between md:p-10 py-12 px-4 w-full mx-10'>
        <div className='flex flex-1 flex-col md:mr-10 justify-start w-full'>
          <h1 className='text-4xl sm:text-5xl flex flex-col text-white text-gradient font-semibold py-1'>
            Send crypto <br /> around the world
          </h1>
          <p className='text-left mt-5 text-white font-light w-7/12 text-base'>
            Explore crypto enviroment... Transfer cryptocurrencies easily on CryptoPlace!
          </p>
          {!currentAccount ? (
            <button
              type='button'
              onClick={connectWallet}
              className='bg-[#24d11b] rounded-full w-4/12 p-2 my-5 cursor-pointer'
            >
              <p className='text-white font-semibold text-lg'>Connect Wallet</p>
            </button>
          ) : (
            <div className='bg-[#24d11b] flex w-6/12 rounded-full py-2 justify-center items-center my-5'>
              <h2 className='text-white'>Account: {shortenAddress(currentAccount)}</h2>
            </div>
          )}
        </div>
        <div className='flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10'>
          <div className='p-10 rounded-xl glassmorphism justify-end items-start w-96 m-5'>
            <Input
              name='addressTo'
              placeholder='Address To'
              type='text'
              value={formData.addressTo}
              handleChange={handleChange}
            />
            <Input
              name='amount'
              placeholder='Amount (ETH)'
              type='number'
              value={formData.amount}
              handleChange={handleChange}
            />
            <Input
              name='keyword'
              placeholder='Keyword (GIF)'
              type='text'
              value={formData.keyword}
              handleChange={handleChange}
            />
            <Input
              name='message'
              placeholder='Enter message'
              type='text'
              value={formData.message}
              handleChange={handleChange}
            />

            <div className='h-[1px] w-full bg-gray-400 my-2' />

            <button
              type='button'
              onClick={(e) => handleSummit(e)}
              disabled={isLoading}
              className='w-full mt-2 p-1 border-[1px] border-[#24d11b] rounded-xl h-12'
            >
              {isLoading ? (
                <div className='flex w-full justify-center items-center'>
                  <div className='animate-spin w-5 h-5 rounded-full border-b-2 border-[#FFF] m-2' />
                </div>
              ) : (
                <span className='text-white'>Send Now</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome
