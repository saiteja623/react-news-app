import React,{useContext, useEffect,useState} from 'react';
import {useHistory} from 'react-router-dom';
import { userContext } from './userContext';


function About(){
    const [login,setLogin] =useContext(userContext);
    const history=useHistory();


    const authorizeUser=async () =>{
        
        try{
            const res=await fetch("http://localhost:5000/about",{
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "content-Type":"application/json"
                },
                credentials:'include'
            })

            if(res.status==401)
            {
                //unauthorized
                throw new Error("you are un authorized");
            }
            const data=await res.json();
        }
        catch(err){
            history.push('/login')
        }
    }

    //run once when component is loaded
    useEffect(()=>{
        authorizeUser();
    },[])

    return (login && (<h1>About page</h1>))
}
export default About;