import React from 'react'
import { useState } from 'react';
import UserCard from './userCard';
import { BaseUrl } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import axios from 'axios';

const EditProfile = ({ user }) => {
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);

    const [error, setError]= useState("")
    
    const SaveProfile = async()=>{
        // clearErrors 
        setError("")
        try{
            const res = await axios.patch(BaseUrl+"/profile/edit" , {
                firstName,
                lastName,
                photoUrl,
                age,
                gender,
                about
            },{withCredentials : true});

            dispatch(addUser(res?.data?.data))
        }catch(err){
            setError(err.response.message)
        }
        
    }
    return (
        <>
        <div className='flex justify-center my-10'>
        <div className='flex justify-center my-3 mx-10'>
            <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Edit Profile</legend>

                <label className="label">First Name</label>
                <input type="text" className="input" placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)} />

                <label className="label">Last Name</label>
                <input type="text" className="input" placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)} />

                <label className="label">Photo Url </label>
                <input type="text" className="input" placeholder="Photo Url"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)} />

                <label className="label">Age</label>
                <input type="text" className="input" placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)} />

                <label className="label">Gender</label>
                <input type="text" className="input" placeholder="Gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)} />

                <label className="label">About</label>
                <input type="text" className="input" placeholder="About"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)} />

                <div className="card-actions justify-center my-5">
                <p className='text-red-500'>{error}</p>
                    <button className="btn btn-primary" onClick={SaveProfile}>Save Profile</button>
                </div>
            </fieldset>
        </div>
        <UserCard user = {{firstName, lastName, photoUrl, age, gender, about}}/>
        </div>
       
        </>
    )
}

export default EditProfile
