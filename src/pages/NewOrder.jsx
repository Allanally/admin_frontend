import React, { useState } from 'react';
import axios from 'axios';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { readXLSXFile } from './FileReader'; 

const NewOrder = () => {
  const [classData, setClassData] = useState({
    className: '',
    classYear: '',
    students: [],
  });

  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      readXLSXFile(file, (data) => {
        console.log('XLSX Data:', data);
        const studentsData = data.map((row) => {
          return {
            name: row[0], 
            secondName: row[1], 
            gender: row[2]
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
  const handleAddStudent = () => {
    // Implement logic to add a new student to the classData state
    // You can use setClassData to update the state with the new student data
  };

  const handleUpload = async (e) => {
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
  };
  
  return (
    <div className="md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className="flex justify-between">
        <div>
          <h1 className="mt-2 flex text-xl font-bold">Class Name</h1>
          
          <form className="mt-6 flex gap-4 flex-col" onSubmit={handleUpload}>
            <label>Class Year</label>
            <input
              type="number"
              className="w-[8rem] px-3 py-2 border rounded"
              value={classData.classYear}
              onChange={(e) => setClassData({ ...classData, classYear: e.target.value })}
            />
            <label>Upload Class list</label>
            <input type="file" onChange={handleFileChange} required />
            <button
              className="bg-[#7352FF] text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none"
              type="submit"
            >
              Upload and Save
            </button>
          </form>
        </div>
        <div>
          <button
            className="bg-[#7352FF] text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none"
            onClick={handleAddStudent}
          >
            Add Student
          </button>
        </div>
      </div>
      <div>
        {/* Display class data or student list */}
        <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Second Name</TableCell>
              <TableCell>Gender</TableCell>
              {/* Add more table header cells based on your data */}
            </TableRow>
          </TableHead>
          <TableBody>
            {classData.students.map((student, index) => (
              <TableRow key={index}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.secondName}</TableCell>
                <TableCell>{student.gender}</TableCell>
                {/* Add more table cells based on your data */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      </div>
    </div>
  );
};

export default NewOrder;
