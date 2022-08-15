import { useState } from 'react'
import { HiMenuAlt3 } from 'react-icons/hi'
import { AiOutlineClose } from 'react-icons/ai'
import logo from '../assets/logo.png'

interface Props {
  title: string
  classprops?: string
}

const LIST_ITEMS = ['Market', 'Exchange', 'Tutorials', 'Wallets']

const NavBar = () => {
  const [toggleMenu, setToggleMenu] = useState(false)

  const NavBarItem = ({ title, classprops }: Props) => (
    <li className={`mx-4 cursor-pointer text-black ${classprops}`}>{title}</li>
  )

  return (
    <nav className='w-full flex md:justify-center justify-between items-center p-4'>
      <div className='md:flex-[1] flex flex-row justify-start items-center'>
        <img src={logo} alt='logo' className='w-24 cursor-pointer' />
        <h3>FOX CryptoPlace</h3>
      </div>
      <ul className='text-white md:flex hidden list-none flex-row justify-between flex-initial items-center'>
        {LIST_ITEMS.map((item, index) => (
          <NavBarItem key={item + index} title={item} />
        ))}
        <li className='bg-[#24d11b] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#55de4e]'>Login</li>
      </ul>
      <div className='flex relative'>
        {!toggleMenu ? (
          <HiMenuAlt3
            fontSize={24}
            color={'black'}
            className='md:hidden cursor-pointer'
            onClick={() => setToggleMenu(true)}
          />
        ) : null}
        {toggleMenu && (
          <ul className='z-10 flex flex-col fixed top-0 -right-2 p-3 w-[70vw] h-screen justify-start items-end rounded-md md:hidden list-none glassmorphism animate-slide-in'>
            <li className='text-xl w-full my-2'>
              <AiOutlineClose fontSize={20} onClick={() => setToggleMenu(false)} />
            </li>
            {LIST_ITEMS.map((item, index) => (
              <NavBarItem key={item + index} title={item} classprops='text-lg my-2' />
            ))}
          </ul>
        )}
      </div>
    </nav>
  )
}

export default NavBar
