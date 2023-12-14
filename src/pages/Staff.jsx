import { useState, useEffect  } from 'react';
import axios from 'axios';
import swal from 'sweetalert'

import {Header} from "../components";

const Staff = () => {
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await fetch('http://localhost:1337/user'); 
          if (response.ok) {
            const data = await response.json();
            setUsers(data); 
          }
        } catch (error) {
          console.error('Error fetching approved docs:', error);
        }
      };
  
      fetchUsers();
    }, []);
    
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:1337/request'); 
        if (response.ok) {
          const data = await response.json();
          setRequests(data); 
        }
      } catch (error) {
        console.error('Error fetching approved docs:', error);
      }
    };

    fetchRequests();
  }, []);
  const handleClick = (e, request, index) => {
 const {name, email, password, role} = request
      axios.post('http://localhost:1337/register', {
        name,
        email, 
        password, 
        role
      })
      .then((result) => {
        console.log("User Successfully Approved:", result);
        swal({
          title: "Successfully Approved",
          icon: "success",
          closeOnEsc: false,
          allowOutsideClick: false,
          button: true,
        });
      })
      .catch((error) => {
        console.error("Error approving user", error);
        swal("Failed to approve", error);
      });
      axios.delete('http://localhost:1337/request', {
        name, email, password, role

       })
       .then((result) => {
        console.log("Permission deleted successfully:", result);
      })
      .catch((error) => {
        console.error("Error deleting approval data:", error);
      });
  
    if (setRequests) {
      setRequests((prevRequests) => {
        const updatedRequests = [...prevRequests];
        updatedRequests.splice(index, 1);
        return updatedRequests;
      });
    }
  };
  
  const handleDelete = (index) => {
    const name = requests[index].name
    const email = requests[index.name]
    axios.delete('http://localhost:1337/request', {
      data: { name, email } // Specify 'data' to send parameters in a DELETE request
    })
    .then((result) => {
      console.log("User Successfully Deleted", result);
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
    });
  
    if (setRequests) {
      setRequests((prevRequests) => {
        const updatedRequests = [...prevRequests];
        updatedRequests.splice(index, 1);
        return updatedRequests;
      });
    }
  };
  

  return (
    <div className="md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl relative">
          <div className="flex justify-start items-center">
          <Header category="Available" title="Allowed Users" />          
        </div> 
        <div className="flex gap-12">
           <div class=" flex-col w-6/12 items-center">
           {users && users.map((user, index) => (
            <div key={index} className='text-xl p-4 w-9/12 border rounded-md mb-6'>
             <p className='font-bold'>{user.name}</p>
             <p>{user.email}</p>
            </div>
           ))}
        </div>
    
        <div className="flex-col w-6/12 mt-0">
          <p className="text-3xl font-extrabold tracking-tight text-slate-900 mb-4">
           Pending Requests
           </p>
           <div className=" flex-col items-center">
           {requests && requests.map((request, index) => (
            <div key={index} className='text-xl p-4 w-9/12 border rounded-md mb-6'>
             <p className='font-bold'>{request.name}</p>
             <p>{request.email}</p>
             <div className='flex gap-6 mt-4'>
            <button onClick={(e) => handleClick(e, request)} className='px-6 py-2 rounded-md text-white bg-green-500 cursor-pointer'>Allow</button>
            <button onClick={() => handleDelete(index)} className='px-6 py-2 rounded-md text-white bg-red-500 cursor-pointer'>Decline</button>
             </div>
            </div>
           ))}
        </div>
        </div>
      </div>

     
    </div>
  )
}

export default Staff
