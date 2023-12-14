import React, { useState, useEffect } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';


import {Header} from "../components";

const Students = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/client/transactions`)
    .then((res) =>{ 
      setData(res.data)
      // setLoading(false);
    })
    .catch(err => console.log(err))
}, []);

  return (
    <div className="md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
          <div className="flex justify-between items-center ">
          <Header category="Your" title="Class" />
          <Link to="/new-order">
          <button
            className="bg-[#7352FF] text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none"
            type="button"
               >
         Create New Class
          </button>
      </Link>
        </div> 
  
      </div>
  );
};

export default Students;