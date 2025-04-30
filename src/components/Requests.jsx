import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BaseUrl } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../utils/requestSlice'

const Requests = () => {
    const [showButton, setShowButton] = useState(true )
    const requests = useSelector((store) => store.request)
    const dispatch = useDispatch();
    const fetchRequest = async () => {

        try {
            const res = await axios.get(BaseUrl + "/user/requests/received", {
                withCredentials: true
            });
            console.log(res.data.data)
            dispatch(addRequest(res.data.data))
        }
        catch (err) {
            console.log(err.message)
        }
    }

    const reviewRequest = async(status,_id)=>{
        try{
            const res = axios.post(BaseUrl + "/request/review/"+status+"/"+_id,{},{
                withCredentials:true
            })
            dispatch(removeRequest(_id));
        }catch(err){
            console.log(err.message)
        }
    }

    useEffect(() => {
        fetchRequest()
    }, [])

    if (!requests) return;

    if (requests.length === 0) return <h1 className='flex justify-center my-10 text-2xl'>No Request Found</h1>
    return (
        <>
            <div className='text-center my-4'>
                <p className='font-bold text-2xl'>Requests</p>
            </div>
            <div className='flex flex-col items-center'>
                {requests.map(request => {
                    const { firstName, lastName, age, gender, photoUrl, about } = request.fromUserId;
                    return (
                        <ul className="list bg-base-300 rounded-box shadow-md w-110 my-2 flex items-center" key={request._id}>
                            <li className="list-row flex gap-4 p-4"> 
                                <div><img className="size-20 rounded-box" src={photoUrl} alt="profile" /></div>
                                <div>
                                    <div className="font-bold my-2">{firstName} {lastName}</div>
                                    <p className="list-col-wrap text-xs my-2">{age && gender && (age + "," + gender)}</p>
                                    <p className="list-col-wrap text-xs ">{about}</p>
                                </div>
                                <button className="btn btn-square btn-ghost" onClick={()=>reviewRequest("accepted",request._id)}>
                                    <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
                                </button>
                                <button className="btn btn-square btn-ghost"onClick={()=>reviewRequest("rejected",request._id)} >
                                    <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>

                            </li>
                        </ul>
                    );
                })}
            </div>

        </>

    )
}

export default Requests 