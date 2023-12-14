import { useEffect, useState } from "react";
import axios from 'axios';
import { format } from 'date-fns';

import { Header, Button, Form } from '../components';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


import { useStateContext } from '../contexts/ContextProvider';

const Pending = () => {

  const { currentColor, currentMode, customers, dispatch } = useStateContext();
  const [permissions, setPermissions] = useState([]);


  const [loading, setLoading] = useState(true);

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

  const handleDelete = ({ _id, name }) => {
    axios.delete(`${import.meta.env.VITE_BASE_URL}/client/customers/${_id}`)
    .then(res => {
      alert(name + " has been deleted");
      dispatch({ type: 'DELETE_CUSTOMER', payload: res })
      //location.reload();
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
          <div className="flex justify-between items-center">
          <Header category="Available" title="Permissions" />
            <Form />
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
          <TableCell>Parents Contact</TableCell>
          <TableCell>Issuer</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {permissions && permissions.map((info, index) => (       
          <TableRow key={index} className="cursor-pointer hover:bg-gray-100">
            <TableCell>{info.name}</TableCell>
            <TableCell>{info.stream}</TableCell>
            <TableCell>{info.departTime}</TableCell>
            <TableCell>{format(new Date(info.departDate), "MM/dd/yyyy 'at' hh:mm a")}</TableCell>
               <TableCell>{info.returningTime}</TableCell>
            <TableCell>{format(new Date(info.returningDate), "MM/dd/yyyy 'at' hh:mm a")}</TableCell>
            <TableCell>{info.reason}</TableCell>
         
            <TableCell>{info.reason}</TableCell>
            <TableCell onClick={() => handleDelete(info)}><DeleteIcon/></TableCell>
          </TableRow>             
        ))}
      </TableBody>
    </Table>         
    </div>
  );
};

export default Pending;