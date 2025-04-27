import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { BaseUrl } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import axios from 'axios';


const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store)=>store.user);

  const fetchUser = async () => {
    if(userData) return ;
    try {
      const user = await axios.get(BaseUrl + "/profile/view", {
        withCredentials: true
      });
      dispatch(addUser(user.data))
    } catch (err) {
      if(err.status == 401){
        navigate("/login")
      }
      console.log("Error" + err)
    }
  }

  useEffect(() => {
      fetchUser();
  },[])
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body
