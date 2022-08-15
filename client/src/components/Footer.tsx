import logo from '../assets/logo.png'

const Footer = () => {
  return (
    <div className='w-full flex flex-col p-4 gradient-bg-footer'>
      <div className='w-full flex sm:flex-row flex-col justify-end items-center my-4'>
        <img src={logo} alt='logo' className='w-16' />
        <div>
          <p className='text-xs'>@FOX CryptoPlace 2022</p>
          <p className='text-xs'>All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
