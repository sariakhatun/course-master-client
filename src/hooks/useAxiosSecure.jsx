import axios from 'axios';
import React from 'react';
// import useAuth from './useAuth';
// import { useNavigate } from 'react-router';

let axiosSecure = axios.create({
    baseURL:`http://localhost:5000`
})
const useAxiosSecure = () => {
  return axiosSecure;
};


export default useAxiosSecure;