import React ,{useContext, useEffect } from 'react';
import {useHistory} from 'react-router-dom'
import { userContext } from './userContext';

function Logout(){
    const [login,setLogin] = useContext(userContext);
    const history=useHistory();
    const removeCookie= async  ()=>{
        const res=await fetch("http://localhost:5000/logout",{
            method:"GET",
            headers:{
                "content-Type":"application/json"
            },
            credentials:"include"
        })
        console.log(res);
        if(res.status==200)
        {
            history.push("/login");
            setLogin(!login);
            return ;

        }

    }
    //run once when component is loaded
    useEffect(()=>{
        removeCookie();
    },[])

    return(
        "this is a logout page"
    )
}

export default Logout