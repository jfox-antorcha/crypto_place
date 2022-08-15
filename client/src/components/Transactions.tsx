import useTransaction from '../hooks/useTransaction'
import shortenAddress from '../utils/shortenAddress'
import useGifFetch from '../hooks/useGifFetch'

interface CardProps {
  gifUrl: string
  addressTo: string
  addressFrom: string
  timestamp: string
  amount: string
  message: string
  keyword: string
}

const TransactionCard = ({ addressFrom, addressTo, amount, message, timestamp, keyword }: CardProps) => {
  const gifUrl = useGifFetch({ keyword })
  return (
    <div
      className='m-4 flex flex-1 flex-col p-3 rounded-md hover:shadow-2xl glassmorphism
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
    '
    >
      <div className='flex flex-col items-center w-full mt-3'>
        <div className='w-full mb-6 p-2'>
          <a href={`https://goerli.etherscan.io/address/${addressFrom}`} target='_blank' rel='noopener noreferrer'>
            <p className='text-white text-base'>From: {shortenAddress(addressFrom)}</p>
          </a>
          <a href={`https://goerli.etherscan.io/address/${addressTo}`} target='_blank' rel='noopener noreferrer'>
            <p className='text-white text-base'>To: {shortenAddress(addressTo)}</p>
          </a>
          <p className='text-white text-base'>Amount: {amount} ETH</p>

          {message && (
            <>
              <br />
              <p className='text-white'>
                Message: <br /> {message}
              </p>
            </>
          )}
        </div>

        <img src={gifUrl} alt='gif' className='w-full h-64 2x:h-96 rounded-md shadow-lg object-cover' />
        <div className='bg-black p-3 p-5 w-max rounded-2xl mt-5 shadow-2xl'>
          <p className='text-[#37c7da] font-bold'>{timestamp}</p>
        </div>
      </div>
    </div>
  )
}

const Transactions = () => {
  const { currentAccount, transactions } = useTransaction()

  return (
    <div className='flex flex-row md:flex-col w-full justify-center items-center px-10 gradient-bg-services'>
      <div className='flex- flex-col md:p-12 py-12 px-4'>
        {currentAccount ? (
          <h3 className='text-white text-3xl text-center my-2'>Lastest Transactions</h3>
        ) : (
          <h3 className='text-white text-3xl text-center my-2'>Connect your wallet to see the lastest transactions</h3>
        )}

        <div className='flex flex-wrap justify-center items-center mt-10 '>
          {transactions.reverse().map((transaction, i) => (
            <TransactionCard key={i} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Transactions
