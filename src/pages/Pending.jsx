import { useEffect, useState } from "react";
import axios from 'axios';
import { format } from 'date-fns';
import { FaSearch } from 'react-icons/fa';
import { Header, Button, Form } from '../components';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { FaFilePdf } from 'react-icons/fa';
import { useStateContext } from '../contexts/ContextProvider';

const Pending = () => {
  const [permissions, setPermissions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);  // New state for search results
  const [name, setName] = useState('');
  const [stream, setStream] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await fetch('http://localhost:1337/pendings'); 
        if (response.ok) {
          const data = await response.json();
          setPermissions(data); 
          console.log(data);
        }
      } catch (error) {
        console.error('Error fetching approved docs:', error);
      }
    };

    fetchPermissions();
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:1337/permsfilter', {
      name, stream, year
    })
    .then(result => {
      setSearchResults(result.data);
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
  }

  return (
    <div className="md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className="flex justify-between items-center">
        <Header category="Available" title="Permissions" />
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
                <input type="text" value={stream} onChange={(e) => setStream(e.target.value)} className='border-b border-black indent-4 m-2 focus:outline-blue-400 h-[5vh]'/>
              </div>
              <div className="flex flex-col gap-2">
                <label>School Year</label>
                <input type="text" value={year} onChange={(e) => setYear(e.target.value)} className='border-b border-black indent-4 m-2 focus:outline-blue-400 h-[5vh]'/>
              </div>
              <button type="submit" className="rounded-md w-9 h-9 mt-8 bg-blue-600 text-white">
                <FaSearch size={24} className="ml-2" />
              </button>
            </div>
          </form>
        </div>
      </div>
      <Table>
  <TableHead>
    <TableRow>
      <TableCell>Name</TableCell>
      <TableCell>Class</TableCell>
      <TableCell>Departure Time</TableCell>
      <TableCell>Departure Date</TableCell>
      <TableCell>Return Time</TableCell>
      <TableCell>Return Date</TableCell>
      <TableCell>Reason</TableCell>
      <TableCell>Parents Contact</TableCell>
      <TableCell>Issuer</TableCell>
          </TableRow>
  </TableHead>
  <TableBody>
    {(searchResults.length > 0 ? searchResults : permissions).map((info, index) => (
      <TableRow key={index} className="cursor-pointer hover:bg-gray-100">
        <TableCell>{info.name}</TableCell>
        <TableCell>{info.stream}</TableCell>
        <TableCell>{info.departTime}</TableCell>
        <TableCell>{format(new Date(info.departDate), "MM/dd/yyyy 'at' hh:mm a")}</TableCell>
        <TableCell>{info.returningTime}</TableCell>
        <TableCell>{format(new Date(info.returningDate), "MM/dd/yyyy 'at' hh:mm a")}</TableCell>
        <TableCell>{info.reason}</TableCell>
        <TableCell>{info.parentsContact}</TableCell>
        <TableCell>{info.issuer}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
<div className="flex justify-center p-2 w-4/12 ml-[30%] bg-blue-500 cursor-pointer rounded-md mt-4 mb-4 text-white text-xl  hover:bg-blue-800">
  <FaFilePdf className=" w-12 h-12"/>
  <button className="">Generate Report</button>
</div>

{((searchResults.length === 0 && name !== '' && stream !== '' && year !== '') || permissions.length === 0) && (
  <p className="text-center text-xl mt-4">
    {searchResults.length === 0 ? 'No results found.' : 'No data available.'}
  </p>
)}


    </div>
  );
};

export default Pending;
