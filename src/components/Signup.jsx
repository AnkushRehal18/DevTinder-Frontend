import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BaseUrl } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
const Signup = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setemailId] = useState("")
  const [password, setPaasword] = useState("");

  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSignup = async () => {
    try{
      const res = await axios.post(BaseUrl + "/signup" , {
        firstName,
        lastName,
        emailId,
        password
      },{withCredentials:true})
      dispatch(addUser(res.data.data));
      return navigate("/profile")
    }catch(err){
      setError(err?.response?.data || "Something went wrong")
    }
  }
  return (
    <>
      <div className='flex justify-center my-10'>
        <div className="card bg-base-300 w-120 shadow-sm">
          <div className="card-body">
            <h2 className="card-title flex justify-center text-2xl">SignUp</h2>
            {/* creating the input fields */}
            <div className='my-2 flex justify-between '>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input type="text" className="input" placeholder="Type here"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)} />
              </fieldset>
              {/* last name */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last name</legend>
                <input type="text" className="input" placeholder="Type here"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)} />
              </fieldset>
            </div>
            {/* next line */}
            <div className='my-2 flex justify-between '>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Email Id </legend>
                <input type="text" className="input" placeholder="Type here"
                  value={emailId}
                  onChange={(e) => setemailId(e.target.value)} />
              </fieldset>
              {/* last name */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Password</legend>
                <input type="text" className="input" placeholder="Type here"
                  value={password}
                  onChange={(e) => setPaasword(e.target.value)} />
              </fieldset>
            </div>
            <p className='text-red-500'>{error}</p>
            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={handleSignup}>Signup</button>
            </div>
            <p class="flex justify-center my-2">
              Already a User?
              <Link to="/signup" class="font-semibold underline"> Login </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
