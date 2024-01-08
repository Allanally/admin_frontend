import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const Main = () => {
  const [showFault, setShowFault] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [fault, setFault] = useState('')
  const [category, setCategory] = useState('')
  const [marks, setMarks] = useState('')
  const [faultings, setFaultings] = useState([])
  const [showTiming, setShowTiming] = useState(false);
  const [newYearShow, setNewYearShow] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedFault, setSelectedFault] = useState(null);
  const handleFaultDetails = (faulting) => {
    setSelectedFault(faulting);
    setShowDetail(true);
    setShowFault(false);
  };
  
  const handleShow = () => {
   setShowFault(true);
  }
  const navigate = useNavigate()
  const disableShow = () => {
    setShowFault(false);
    setShowAdd(false);
  }
  const handleAdd = () => [
    setShowAdd(true)
  ]
  const disableAdd = () => {
    setShowAdd(false)
  }
  const handleShowTiming = () => {
    setShowTiming(true);
  }
  const disableShowTiming = () => {
    setShowTiming(false);
    setNewYearShow(false);
    setShowButton(true);
  }
  const handleButton = () => {
    setShowButton(false);
  }
  const handleYearShow = () => {
    setNewYearShow(true);
    handleButton();
  }

  const handleDelete = () => {
  axios.delete("http://localhost:1337/faulting", {
      fault: selectedFault.fault,
      category: selectedFault.category,
      marks: selectedFault.marks,
    })
    .then((result) => {
      console.log("Fault successfully Deleted:", result);
      setShowDetail(false);
    })
    .catch((error) => {
      console.error("Error updating fault:", error);
    });
  }

  
  const handleSubmit = () => {
    const existingFault = faultings.find((existingFault) => {
      return (
        existingFault.fault === fault &&
        existingFault.category === category &&
        existingFault.marks === marks
      );
    });
  
    if (existingFault) {
      alert('Fault with similar details already exists!');
      return;
    }
    axios.post("http://localhost:1337/faulting", {
      fault, category, marks
    })
    .then((result) => {
      console.log("Fault successfully Saved:", result);
      navigate("/Main")
      setShowAdd(false)
    })
    .catch((error) => {
      console.error("Error deleting approval data:", error);
    });
  }
useEffect(() => {
  const fetchFaultings = async () => {
    try {
      const response = await fetch('http://localhost:1337/faulting'); 
      if (response.ok) {
        const data = await response.json();
        setFaultings(data); 
        console.log(data);
      }
    } catch (error) {
      console.error('Error fetching approved docs:', error);
    }
  }
  fetchFaultings();
}, [])

  return (
    <div className={showFault ? 'backdrop-blur-md' : ''}>
        <h1 className='text-3xl mt-6 text-center mb-6'>Main Catalogue</h1>
        <div className='flex gap-6'>
        <div onClick={handleShow} className='ml-8 rounded-md border border-blue-500 hover:scale-105 transition-all cursor-pointer p-4 w-5/12'>
            <p className='text-2xl'>Faulting Sector</p>
        </div>
        <div onClick={handleShowTiming} className='ml-2 rounded-md border border-blue-300 hover:scale-105 transition-all cursor-pointer p-4 w-4/12'>
            <p className='text-xl'>Calendar Zone</p>
        </div>
        </div>
        {showDetail && (
  <div className='fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-80'>
    <div className='max-w-screen-md mx-auto'>
      <div className='border p-4 flex flex-col items-center md:top-14 transition-all w-76 mt-32 bg-white rounded-md'>
        <h1 className='text-center text-3xl'>{selectedFault.fault}</h1>
        <>
          <p>Category: {selectedFault.category}</p>
          <p>Marks: {selectedFault.marks}</p>
          <div className='flex gap-4'>
            <button onClick={handleDelete} className='text-white bg-red-500 mt-2 p-2 rounded-md'>
              Delete
            </button>
          </div>
        </>
        <button
          onClick={() => { setShowDetail(false); setShowFault(true); }}
          className='text-xl rounded-full mt-4 bg-white w-8 text-black border hover:scale-125'
        >
          X
        </button>
      </div>
    </div>
  </div>
)}

        {showFault && (
          <div className='top-0 absolute w-full flex justify-center h-[100vh] bg-black bg-opacity-80'>
          <div className='border backdrop-blur-md p-2 absolute md:top-14 transition-all h-[70vh] ml-4 md:w-[900px] w-11/12 top-16 bg-white rounded-md'>
            <h1 className='text-center text-3xl '>LIST OF FAULTS</h1>
            <button onClick={disableShow} className="text-xl right-6 absolute rounded-full top-2 bg-white w-8 text-black border hover:scale-125">X</button>
            <div className='flex flex-col gap-4 '>
           <div>
           <Table>
            <TableHead>
              <TableRow className='text-xl'>
                <TableCell>Fault Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Marks</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {faultings.map((faulting, index) => (
               <TableRow key={index} className='cursor-pointer hover:bg-gray-100'>
                <TableCell>{faulting.fault}</TableCell>
                <TableCell>{faulting.category}</TableCell>
                <TableCell>{faulting.marks}</TableCell>
                <TableCell>
                            <button
                              onClick={() => handleFaultDetails(faulting)}
                              className='text-blue-500'
                            >
                              View Details
                            </button>
                </TableCell>
               </TableRow>
              ))}
            </TableBody>
           </Table>
           </div>
            <button onClick={handleAdd} className='text-xl h-12 px-2 text-white w-[200px] absolute bottom-6 bg-blue-500 mr-6 rounded-md'>Create New Fault</button>
            </div>

          </div>
          </div>
        )}
            {showAdd && (
              <div className='top-0 absolute flex justify-center w-full h-[100vh] bg-black bg-opacity-80'>
        <div className="mt-12 mb-12 border p-2 w-[320px] bg-white rounded-md">
            <div className="flex justify-center">
            <h1 className="text-xl">Create Single Fault</h1>
            <button onClick={disableAdd} className="text-xl right-6 absolute rounded-full top-2 bg-white w-8 text-black border hover:scale-125">X</button>
            </div>
         
          <form onSubmit={handleSubmit} className="mt-6 flex gap-4 flex-col">
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className='h-14 text-md  w-11/12 bg-white outline-blue-400 rounded-md border'>
            <option value="Nibyiza">Nibyiza</option>
            <option value="Sibyiza">Sibyiza</option>
            <option value="kirazira">Kirazira</option>
          </select>
            <label>Fault</label>
            <input
              type="text"
              className="w-11/12 px-3 py-2 border-b rounded-md"
              value={fault}
              onChange={(e) => setFault(e.target.value)}
            />
            <label>Marks</label>
            <input
              type="number"
              className="w-11/12 px-3 py-2 border-b rounded-md"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
            />
            <button type="submit" className="text-xl px-12 py-2 text-white bg-blue-500 rounded-3xl"> Save</button>
          </form>
        </div>
        </div>
      )}
      {showTiming && (
        <div className='fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-80'>
        <div className='border p-2 flex flex-col items-center md:top-14 transition-all ml-4 md:w-[900px] w-11/12 mt-12 bg-white rounded-md'>
         <h1 className='text-center text-3xl '>TIME DEFINITION</h1>
         <button onClick={disableShowTiming} className="text-xl right-6 absolute rounded-full top-2 bg-white w-8 text-black border hover:scale-125">X</button>
         <p className='mt-4 text-xl text-center'>Last year successfully came to end so in order to continue Create a new year</p>
         {showButton && (
          <div>
            <button onClick={handleYearShow} className='text-xl h-12 px-2 text-white w-[200px] mt-4 bg-blue-500 mr-6 rounded-md'>Create New Year</button>
          </div>
         )}
         
         {newYearShow && (
          <div >
           <form onSubmit={handleSubmit} className="mt-6 flex gap-4 flex-col">
          <label>Year</label>
          <input
              type="year"
              className="w-11/12 px-3 py-2 border-b rounded-md"
              value={fault}
              onChange={(e) => setFault(e.target.value)}
            />
            <label>Starting Date</label>
            <input
              type="date"
              className="w-11/12 px-3 py-2 border-b rounded-md"
              value={fault}
              onChange={(e) => setFault(e.target.value)}
            />
            <label>Ending Date</label>
            <input
              type="date"
              className="w-11/12 px-3 py-2 border-b rounded-md"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
            />
            <p className='text-center'>CAUTION: This action cannot be reversed, what is created here will be used for the whole YEAR so make thorough review before you SAVE this!</p>
            <button type="submit" className="text-xl px-12 py-2 text-white bg-blue-500 rounded-3xl"> Save</button>
          </form>
          </div>
         )}
        </div>
        </div>
      )}
    </div>
  )
}

export default Main