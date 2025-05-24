import { io } from 'socket.io-client'
import { BaseUrl } from './constants'

export const createScoketConnection = () => {
    if(location.hostname === "localhost"){
        return io(BaseUrl)
    }
    else{
        return io("/",{path:"/api/socket.io"});
    }
}