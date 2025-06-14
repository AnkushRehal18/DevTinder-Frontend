import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BaseUrl } from '../utils/constants';
import axios from 'axios';
import { removeUser } from '../utils/userSlice';

const Navbar = () => {
  const user = useSelector(store => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log(user);

  const handleLogout = async()=>{
    try{
      await axios.post(BaseUrl + "/logout" , {} ,{
        withCredentials : true
      });
      dispatch(removeUser());
      return navigate("/login");
      // console.log("Logout Successful!!!");
    }catch(err){
      // console.log("Error : " + err);
    }
  }
  return (
    <>
      <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">Tinder 💕</Link>
        </div>
        {user && (<div className="flex gap-2">
          <div className='form-control mt-2'>Weclome, {user.firstName}</div>
          <div className="dropdown dropdown-end mx-5 flex ">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User Photo"
                  src={user.photoUrl}/>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li><Link to="/connections">Friends</Link></li>
              <li><Link to="/requests">Connection Requests</Link></li>
              <li><a onClick={handleLogout}>Logout</a></li>
            </ul>
          </div>
        </div>)}
      </div>
    </>
  )
}

export default Navbar
