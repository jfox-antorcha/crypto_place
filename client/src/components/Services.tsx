import { BsShieldFillCheck } from 'react-icons/bs'
import { BiSearchAlt } from 'react-icons/bi'
import { RiHeart2Fill } from 'react-icons/ri'

interface CardProps {
  color: string
  icon: any
  title: string
  subtitle: string
}

const ServiceCard = ({ color, title, icon, subtitle }: CardProps) => (
  <div className='flex flex-row justify-start items-center p-5 m-2 cursor-pointer black-glassmorphism w-7/12'>
    <div className={`flex w-10 h-10 ${color} rounded-full justify-center items-center`}>{icon}</div>
    <div className='ml-5 flex flex-col flex-1'>
      <h1 className='text-white mt-2 text-lg'>{title}</h1>
      <p className='text-white mt-2 text-ms'>{subtitle}</p>
    </div>
  </div>
)

const Services = () => {
  return (
    <div className='flex w-full flex-col md:flex-row px-10 py-20 justify-center items-center gradient-bg-services'>
      <div className='flex flex-col items-center justify-between py-12 px-10'>
        <div className='flex-1 flex-col flex justify-start items-center'>
          <h1 className='text-white text-5xl text-gradient'>
            Services that we
            <br />
            continue to improve
          </h1>
        </div>
      </div>
      <div className='flex-1 flex flex-col justify-start items-center'>
        <ServiceCard
          color='bg-[#2952E3]'
          icon={<BsShieldFillCheck fontSize={21} className='text-white' />}
          title='Security Guaranteed'
          subtitle='Security is important. We always maintain privacy.'
        />
        <ServiceCard
          color='bg-[#1eb34b]'
          icon={<BiSearchAlt fontSize={21} className='text-white' />}
          title='Best exchange rates'
          subtitle='No other site has lower exchange rates than us.'
        />
        <ServiceCard
          color='bg-[#d4151f]'
          icon={<RiHeart2Fill fontSize={21} className='text-white' />}
          title='Fastest transactions'
          subtitle='You can send or recieve crypto in just few seconds.'
        />
      </div>
    </div>
  )
}

export default Services
