import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({children}) => {

    let {user,loading}=useAuth();
    let location = useLocation()
    console.log(location)
    
    if(loading){
        return <span className="loading loading-bars loading-xl"></span>

    }
    if(!user){
       return <Navigate state={{from : location.pathname}} to='/login'></Navigate>
    }
    return children
};

export default PrivateRoute;