import React, { useContext, useEffect } from 'react';
import {useHistory} from 'react-router-dom'
import { userContext } from './userContext';


function Home(){
    const [login,setLogin] =useContext(userContext);
    const history=useHistory();
    const checkUserLogin=async ()=>{
        const res=await fetch('http://localhost:5000/checkLogin',{
            method:"GET",
            headers:{
                "content-Type":"application/json"
            },
            credentials:'include'
        })
        if(res.status==401)
        {
            //we need to redirect user to the home page
            history.push('/login');
            return ;
        }
        setLogin(true);
        
    }   

    useEffect(()=>{
        checkUserLogin();
    },[])
    return (login &&  "hello world!");
}

export default Home;