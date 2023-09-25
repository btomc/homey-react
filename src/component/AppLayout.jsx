import { Outlet } from 'react-router-dom'
import Header from './Header'

const AppLayout = () => {
  return (
    <>
      <Header />
      <main className='bg-gray-50'>
        <Outlet />
      </main>
      {/* Footer  */}
    </>
  )
}

export default AppLayout
