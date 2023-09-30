import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const AppLayout = () => {
  return (
    <>
      <Header />
      <main className='bg-gray-50'>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default AppLayout
