
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { readXLSXFile } from '../pages/FileReader'; 
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const Class = () => {
  const { className } = useParams();
  const [students, setStudents] = useState([]);
  const [showEditSection, setShowEditSection] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [showDetail, setShowDetail] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [classData, setClassData] = useState({
    classYear: "",
  });

  const [uploadedFile, setUploadedFile] = useState(null);

  const handleStudentDetails = (student) => {
  setSelectedStudent(student);
  setShowDetail(true)
  }

  const handleCancelDetail = () => {
    setShowDetail(false)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      readXLSXFile(file, (data) => {
        console.log('XLSX Data:', data);
        const studentsData = data.map((row) => {
          return {
            name: `${row[1]} ${row[2]}`, 
            gender: row[3],
            stream: row[4],
          };
        });
        setClassData({
          className: '', 
          classYear: '', 
          students: studentsData,
        });
      });
    }
  };
  const handleAddStudent = (e) => {
 e.preventDefault();
 axios.post("http://localhost:1337/addstudent", {
  name, gender, stream: className
 })
 .then((result) => {
  console.log("Student successfully Saved:", result);
  setShowAdd(false)
})
.catch((error) => {
  console.error("Error deleting approval data:", error);
});
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();

    try {
      if (!uploadedFile) {
        console.error('No file selected for upload');
        return;
      }

      const formData = new FormData();
      formData.append('file', uploadedFile);

      await axios.post('http://localhost:1337/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
    setShowEditSection(false);
    setShowButton(true);
  };
  useEffect(() => {
      axios.post('http://localhost:1337/students', {stream: className})
      .then((res) => {
        setStudents(res.data);
        console.log(res.data)
      })
      .catch((err) => console.log(err));
  }, [className]);
  
  
  const handleEdit = () => {
    setShowEditSection(true);
    setShowButton(false);
  };
  const disableEdit = () => {
    setShowEditSection(false)
    setShowButton(true)
  }
  const handleAdd = () => {
    setShowAdd(true);
}
  const disableAdd = () => {
    setShowAdd(false)
  }

  const handleUpload = (e) => {
    e.preventDefault();
    console.log("Uploading and saving data:", classData);
    setShowEditSection(false);
  };

  
  const handleArchive = (e) => {
    e.preventDefault();
    axios.post("http://localhost:1337/archive", {
      name: selectedStudent.name,
      gender: selectedStudent.gender,
      stream: selectedStudent.stream
    })
    .then((result) => {
      console.log("successfully Archived:", result);
    })
    .catch((error) => {
      console.error("Error archiving student:", error);
    });

    axios.delete(`http://localhost:1337/archive/${selectedStudent._id}`)
    .then((result) => {
      console.log("successfully deleted:", result);
      console.log(selectedStudent.id);
      setShowDetail(false);
    })
    .catch((error) => {
      console.error("Error deleting student:", error);
    });
  
  }

  return (
    <div className="ml-6">
        <div className="flex justify-between">
     <h1 className="text-xl font-bold">Class: {className}</h1>
     <button onClick={handleAdd} className="text-xl px-12 py-2 text-white bg-blue-500 mr-6 rounded-3xl">Add New Student</button>
        </div>
     {showDetail && (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-80">
         <div className='max-w-screen-md mx-auto'>
          <div className='border p-4 flex flex-col items-center md:top-14 transition-all w-76 mt-32 bg-white rounded-md'>
           <h1>{selectedStudent.name}</h1>
           <p>Gender: {selectedStudent.gender}</p>
           <p>Class: {selectedStudent.stream}</p>
           <div className="flex gap-4">
           <button onClick={handleArchive} type='submit' className='text-white bg-green-500 p-2 rounded-md'>
                      Archive
                    </button>
                    <button type='button' onClick={handleCancelDetail} className='text-white bg-red-500 p-2 rounded-md'>
                      Leave
                    </button>
           </div>
          </div>
         </div>

      </div>
     )}
 <div className='flex flex-col gap-4 '>
  <Table>
  <TableHead>
              <TableRow className='text-xl'>
                <TableCell>Full Name</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student, index) => (
                 <TableRow key={index} className='cursor-pointer hover:bg-gray-100'>
                 <TableCell>{student.name}</TableCell>
                 <TableCell>{student.gender}</TableCell>
                 <TableCell>
                             <button
                               onClick={() => handleStudentDetails(student)}
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
      {showButton && (
         <button onClick={handleEdit} className="text-xl px-12 py-2 text-white bg-blue-500 rounded-3xl bottom-6 absolute">Edit</button>
      )}
     
      {showEditSection && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-80">
        <div className="mt-[20%] border p-2 bg-white rounded-md">
            <button onClick={disableEdit} className="text-xl right-6 top-12 absolute rounded-md bg-black w-8 text-white">X</button>
          <h2 className="text-lg font-bold mb-2">Edit Class {className}</h2>
          <form className="mt-6 flex gap-4 flex-col" onSubmit={handleFileUpload}>
            <label>Upload Class list</label>
            <input type="file"  onChange={handleFileChange} required />
            <button
              className="bg-[#7352FF] text-white active:bg-blue-600 font-bold uppercase text-sm py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none"
              type="submit"
            >
              Upload and Save
            </button>
          </form>
        </div></div>
      )}
      {showAdd && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-80">
        <div className="mt-20 border p-2 w-[320px] mb-12 bg-white rounded-md">
            <div className="flex justify-center">
            <h1 className="text-xl">Add Single Student</h1>
            <button onClick={disableAdd} className="text-xl right-6 absolute rounded-md bg-black w-8 text-white">X</button>
            </div>
         
          <form className="mt-6 flex gap-4 flex-col" onSubmit={handleAddStudent}>
          <label>Class</label>
            {className}
            <label>Student Name</label>
            <input
              type="text"
              className="w-11/12 px-3 py-2 border-b rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label>Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)} required className="w-11/12 px-3 py-2 border-b rounded-md">
              <option value="F">F</option>
              <option value="M">M</option>
            </select>
            <button type="submit" className="text-xl px-12 py-2 text-white bg-blue-500 rounded-3xl"> Save</button>
          </form>
        </div></div>
      )}
    </div>
  );
};

export default Class;
