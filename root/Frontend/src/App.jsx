import { useState, useEffect } from 'react'
import { Outlet } from "react-router-dom"
import Header from "./components/Header/Header.jsx"
import Footer from "./components/Footer/Footer.jsx"
import { useDispatch } from 'react-redux'
import {login, logout} from "./store/authSlice"
import {getCurrentUser} from "./methods/userMethods.js"
import { useNavigate } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true) 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      // Check if the access token exists before making the API call
      const accessToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('accessToken='))
        ?.split('=')[1];

      if (accessToken) {
        // If the token exists, try to fetch the current user data
        const userData = await getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate("/UserNotesAndLists")
        } else {
          dispatch(logout());
          navigate("/login")
        }
      } else {
        // No token exists, treat the user as logged out
        dispatch(logout());
        navigate("/login")
      }

      setLoading(false);
    }

    fetchData();
  }, [dispatch]);
  

  return !loading ? (
    <div className="z-40 min-h-screen flex flex-col bg-[#E1DABF]">
      <div className='w-full block text-black'>
        <Header/>
        <main className="flex-grow mt-20 z-0">
        <Outlet />
        </main>
        <Footer/>
      </div>
    </div>
  ) : null
}

export default App
