import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Offers from './pages/Offers'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import AppLayout from './components/AppLayout'
import PrivateRoute from './components/PrivateRoute'
import Category from './pages/Category'
import CreateListing from './pages/CreateListing'
import Listings from './pages/Listings'
import ListingDetails from './pages/ListingDetails'
import Contact from './pages/Contact'
import Messages from './pages/Messages'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<AppLayout />}>
            <Route index={true} path='/' element={<Home />} />
            <Route path='/offers' element={<Offers />} />
            <Route path='/category/:categoryName' element={<Category />} />
            <Route path='' element={<PrivateRoute />}>
              <Route path='/profile' element={<Profile />} />
              <Route path='/my-listings' element={<Listings />} />
              <Route path='/messages' element={<Messages />} />
            </Route>
            <Route path='/sign-in' element={<Login />} />
            <Route path='/sign-up' element={<Register />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/create-listing' element={<CreateListing />} />

            <Route
              path='/category/:categoryName/:listingId'
              element={<ListingDetails />}
            />
            <Route path='/contact/:landlordId' element={<Contact />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
