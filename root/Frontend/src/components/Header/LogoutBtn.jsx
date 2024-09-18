import React from 'react'
import { useDispatch } from 'react-redux'
import {logout} from "../../store/authSlice.js"
import { useNavigate } from 'react-router-dom'
import {logoutUser} from "../../methods/userMethods.js"

function LogoutBtn() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
          await logoutUser()
          dispatch(logout());
          navigate("/login")
        } catch (error) {
          console.log("Error in logout", error)
        }
    }


  return (
    <button
    className='inline-bock px-6 py-2 text-black duration-200 hover:bg-red-600   rounded-xl shadow-md shadow-black bg-[#E1DABF] font-space-grotesk'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn