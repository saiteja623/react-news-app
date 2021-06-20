import React, { useContext, useEffect, useState } from 'react';
import {NavLink} from 'react-router-dom'
import {userContext } from './userContext';

const Nav =()=>{
    const [login] = useContext(userContext);
    useEffect(()=>{
        console.log(login);
    },[])
    return(
        <>
        <NavLink to="/">HOME</NavLink>
        <br/>
        <NavLink to="/about">about</NavLink>
        <br/>
        <NavLink to="/register">register</NavLink>
        <br/>
        {login ?  (<NavLink to="/logout">logout</NavLink>)
         :
        (<NavLink to="/login">login</NavLink>) } 
        
        </>
    )
}
export default Nav;