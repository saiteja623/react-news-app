import React, { useState} from 'react';
import {useHistory} from 'react-router-dom';

function Register(){
    const history=useHistory();
    //create a user object
    const [user,setUser]=useState({
        name:"",email:"",password:""
    })

    //set all the input values
    const handleChange=(e)=>{
        const type=e.target.name; //get which field is changing
        const value=e.target.value ;
        setUser({...user,[type]:value});
    }  

    const register= async ()=>{

        //validate form
        if(!user.name || !user.email || !user.password)
        {
            alert("Enter proper information");
            return ;
        }
        //submit data to the server
        console.log(user);
        const res=await fetch("http://localhost:5000/register",{
            method:"POST",
            headers:{
                "content-Type":"application/json"
            },
            body:JSON.stringify(user)
        })
        if(res.status==422)
        {
            //user already exists
            alert("user already exists!");
            return ;
        }
        history.push("/");
    }

    return (
        <>
      <input type="text" name="name" value={user.name}  onChange={(e)=>handleChange(e)} required />  
      <input type="email" name="email" value={user.email} onChange={(e)=>handleChange(e)}  required  />  
      <input type="password" name="password" value={user.password} onChange={(e)=>handleChange(e)} required />
        <input type="button" value="register" onClick={register} />
      </>
    )
}

export default Register