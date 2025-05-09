import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import { BaseUrl } from '../utils/constants'

const Login = () => {
    const [emailId, setemailId] = useState()
    const [password, setPaasword] = useState();
    const [error, setError] = useState()
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const res = await axios.post(BaseUrl + "/login", {
                emailId,
                password
            }, { withCredentials: true }
            )
            dispatch(addUser(res.data));
            return navigate("/")
        }
        catch (err) {
            setError(err?.response?.data?.message || "Something went Wrong")
            // console.log(err)
        }
    }
    return (
        <div className='flex justify-center my-10'>
            <div className="card bg-base-300 w-86 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title flex justify-center text-2xl">Login</h2>
                    {/* creating the input fields */}
                    <div className='my-2'>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-xl">Email Id</legend>
                            <input type="text"
                                className="input"
                                value={emailId}
                                onChange={(e) => setemailId(e.target.value)} />
                        </fieldset>
                    </div>
                    {/* password  */}
                    <div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-xl">Password</legend>
                            <input type="password"
                                className="input"
                                value={password}
                                onChange={(e) => setPaasword(e.target.value)} />
                        </fieldset>
                    </div>
                    <p className='text-red-500'>{error}</p>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                    </div>
                    <p class="flex justify-center my-2">
                        Don't have an account?
                        <Link to="/signup" class="font-semibold underline"> Register here. </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
