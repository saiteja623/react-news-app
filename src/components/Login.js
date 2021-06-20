import React, { useState ,useEffect, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import { userContext } from './userContext';

function Login(){
    const [loginVal,setLogin] = useContext(userContext);
    const history=useHistory();
    const [email,setEmail] = useState('');
    const [password,setPassword]=useState('');


    const checkUserLogin=async ()=>{
        const res=await fetch('http://localhost:5000/checkLogin',{
            method:"GET",
            headers:{
                "content-Type":"application/json"
            },
            credentials:'include'
        })
        if(res.status==200)
        {
            //we need to redirect user to the home page
            history.push('/');
            setLogin(true);
            return ;
        }
    }

    //if already user logged in redirect to the home page
    useEffect(()=>{
        checkUserLogin();
    },[])
    
    const login=async ()=>{
        if(!email || ! password){
            alert("Enter proper credentials");
            return ;
        }
        //send the data to the server using fetch api
        const res=await fetch("http://localhost:5000/login",{
            method:"POST",
            headers:{
                "content-Type":"application/json"
            },
            credentials:'include',
            body:JSON.stringify({email,password})
        })
        console.log(res);
        if(res.status==422)
        {
            alert("invalid credentials");
            return ; 
        }
        history.push('/');
    }
    return (
      
        (!loginVal && (  <>
        <input type="text" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" name="password" value={password}  onChange={(e)=>setPassword(e.target.value)} />
        <input type="button" onClick={login} value="login"></input>
        </>
        ))
        
    )
}

export default Login;