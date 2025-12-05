import axios from 'axios';
import React from 'react';
// import useAuth from './useAuth';
// import { useNavigate } from 'react-router';

let axiosSecure = axios.create({
    baseURL:`https://course-master-server-drab.vercel.app`
})
const useAxiosSecure = () => {
  return axiosSecure;
};


export default useAxiosSecure;