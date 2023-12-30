import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Table, TableHead, TableRow, TableCell, TableBody, useMediaQuery } from '@mui/material';
import { FaSearch } from 'react-icons/fa';
import { Header } from "../components";
import { useStateContext } from '../contexts/ContextProvider';
import { FaFilePdf } from 'react-icons/fa';

const Discipline = () => {
  const { currentColor, currentMode, transactions } = useStateContext();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  const [faults, setFaults] = useState([]);
  const [searchResults, setSearchResults] = useState([]);  // New state for search results
  const [name, setName] = useState('');
  const [stream, setStream] = useState('');
  const [year, setYear] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:1337/view', {
      name, stream, year
    })
    .then(result => {
      setSearchResults(result.data);  // Update search results state
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
  }

  return (
    <div className="md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className="flex justify-between items-center">
        <Header category="Your" title="discipline cases" />
        <div className="flex -mt-4 flex-col gap-2 mr-12">
          <h1 className="text-xl text-center">Search </h1>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <div className="flex flex-col gap-2">
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='border-b border-black indent-4 m-2 focus:outline-blue-400 h-[5vh]' />
              </div>
              <div className="flex flex-col gap-2">
                <label>Class Name</label>
                <input type="text" value={stream} onChange={(e) => setStream(e.target.value)} className='border-b  border-black indent-4 m-2 focus:outline-blue-400 h-[5vh]'/>
              </div>
              <div className="flex flex-col gap-2">
                <label>School Year</label>
                <input type="text" value={year} onChange={(e) => setYear(e.target.value)} className='border-b border-black indent-4 m-2 focus:outline-blue-400 h-[5vh]'/>
              </div>
              <button type="submit" className="rounded-md w-9 h-9 mt-8 bg-blue-600 text-white"><FaSearch size={24} className="ml-2" /></button>
            </div>
          </form>
        </div>
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
    {(searchResults.length > 0 ? searchResults : faults).map((info, index) => (       
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
<div className="flex justify-center p-2 w-4/12 ml-[30%] cursor-pointer bg-blue-500 rounded-md mt-4 mb-4 text-white text-xl  hover:bg-blue-800">
  <FaFilePdf className=" w-12 h-12"/>
  <button className="">Generate Report</button>
</div>
{((searchResults.length === 0 && name !== '' && stream !== '' && year !== '') || faults.length === 0) && (
  <p className="text-center text-xl mt-4">
    {searchResults.length === 0 ? 'No results found.' : 'No data available.'}
  </p>
)}

    </div>
  );
};

export default Discipline;
