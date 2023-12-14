import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Table, TableHead, TableRow, TableCell, TableBody, Box, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';

import {Header, ProductForm, BuyForm} from "../components";
import { useStateContext } from '../contexts/ContextProvider';

const Discipline = () => {
  // const { data, isLoading } = useGetProductsQuery();
  const { currentColor, currentMode, transactions } = useStateContext();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [faults, setFaults] = useState([]);

  useEffect(() => {
    const fetchFaults = async () => {
      try {
        const response = await fetch('http://localhost:1337/fault'); 
        if (response.ok) {
          const data = await response.json();
          setFaults(data); 
          console.log(data);
        }
      } catch (error) {
        console.error('Error fetching approved docs:', error);
      }
    };

    fetchFaults();
  }, []);

  return (
    <div className="md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <div className="flex justify-between items-center">
          <Header category="Your" title="discipline cases" />
            
        </div> 

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student Name</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Date Issued</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Issuer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {faults && faults.map((info, index) => (       
          <TableRow key={index} className="cursor-pointer hover:bg-gray-100">
            <TableCell>{info.name}</TableCell>
            <TableCell>{info.stream}</TableCell>
            <TableCell>{info.date}</TableCell>
               <TableCell>{info.message}</TableCell>
            <TableCell>{info.stream}</TableCell>
          </TableRow>             
        ))}
</TableBody>

          </Table> 
         
    </div>
  );
};

export default Discipline;