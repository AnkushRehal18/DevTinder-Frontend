import axios from 'axios'
import React, { useEffect } from 'react'
import { BaseUrl } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'
import { Link } from 'react-router-dom'

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connections);
    const fetchConnections = async () => {
        try {
            const res = await axios.get(BaseUrl + "/user/connections", {
                withCredentials: true
            })
            dispatch(addConnections(res.data.data));

        } catch (err) {
            console.log(err.message)
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    if (!connections) return;

    if (connections.length === 0) return <h1 className='flex justify-center my-10 text-2xl'>No Connections Found</h1>

    return (<>
        <div className='text-center my-4'>
            <p className='font-bold text-2xl'>Connections</p>
        </div>
        <div className='flex flex-col items-center'>
            {connections.map(connection => {
                const {_id, firstName, lastName, age, gender, photoUrl, about } = connection;
                return (
                    <ul className="list bg-base-300 rounded-box shadow-md w-[400px] my-2" key={connection._id}>
                        <li className="list-row flex gap-4 p-4">
                            <div><img className="size-20 rounded-box" src={photoUrl} alt="profile" /></div>
                            <div className='flex gap-x-4 w-full'>
                                <div>
                                    <div className="font-bold my-2">{firstName} {lastName}</div>
                                    <p className="list-col-wrap text-xs my-2">{age && gender && (age + "," + gender)}</p>
                                    <p className="list-col-wrap text-xs ">{about}</p>
                                </div>
                                <div>
                                  <Link to={"/chat/"+ _id}>  <button className='btn btn-primary'>Chat</button></Link>
                                </div>
                            </div>
                        </li>
                    </ul>
                );
            })}
        </div>

    </>

    )
}

export default Connections
