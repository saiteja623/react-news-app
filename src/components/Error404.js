import React, { useContext } from 'react';
import { useEffect } from 'react/cjs/react.production.min';
import {userContext } from './userContext';

function Error404(){
    const [login,setLogin] =useContext(userContext);

    return (
        <h5> This is a 404 error page!</h5>
    )
}

export default Error404;