import React, { createContext, useEffect ,useState} from 'react';

export const userContext= createContext();

export const UserProvider=(props)=>{
    const [login,setLogin]=useState();

    const authorizeUser= async ()=>{
        try{
            const res=await fetch("http://localhost:5000/authorize",{
                method:"GET",
                headers:{
                    "content-Type":"Application/json"
                },
                credentials:'include'
            })
            if(res.status==200)
            {
                setLogin(true);
            }
            else{
                throw new Error();
            }
        }
        catch(err){
            //not logged in 
            
        }
    }

    useEffect(()=>{
        authorizeUser();
    },[])
    
    return (
        <userContext.Provider value={[login,setLogin]}>
            {props.children}
        </userContext.Provider>
    )
}
