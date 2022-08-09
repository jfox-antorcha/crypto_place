import { Footer, NavBar, Services, Transactions, Welcome } from './components'

const App = () => {
  return (
    <div className='min-h-screen'>
      <div className='gradient-bg-welcome'>
        <Welcome />
        <NavBar />
      </div>
      <Services />
      <Transactions />
      <Footer />
    </div>
  )
}

export default App
