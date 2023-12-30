// Class.js
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Class = () => {
  const { className } = useParams();
  const [students, setStudents] = useState([]);
  const [showEditSection, setShowEditSection] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [classData, setClassData] = useState({
    classYear: "",
  });

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/client/students?class=${className}`)
      .then((res) => {
        setStudents(res.data);
      })
      .catch(err => console.log(err));
  }, [className]);

  const handleEdit = () => {
    setShowEditSection(true);
  };
  const disableEdit = () => {
    setShowEditSection(false)
  }
  const handleAdd = () => [
    setShowAdd(true)
  ]
  const disableAdd = () => {
    setShowAdd(false)
  }

  const handleUpload = (e) => {
    e.preventDefault();
    console.log("Uploading and saving data:", classData);
    setShowEditSection(false);
  };

  return (
    <div className="ml-6">
        <div className="flex justify-between">
     <h1 className="text-xl font-bold">Class: {className}</h1>
     <button onClick={handleAdd} className="text-xl px-12 py-2 text-white bg-blue-500 mr-6 rounded-3xl">Add New Student</button>
        </div>
 
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} - 
          </li>
        ))}
      </ul>
       <button onClick={handleEdit} className="text-xl px-12 py-2 text-white bg-blue-500 rounded-3xl bottom-6 absolute">Edit</button>
      {showEditSection && (
        <div className="mt-[20%] border p-2 rounded-md">
            <button onClick={disableEdit} className="text-xl right-6 absolute rounded-md bg-black w-8 text-white">X</button>
          <h2 className="text-lg font-bold mb-2">Edit Class {className}</h2>
          <form className="mt-6 flex gap-4 flex-col" onSubmit={handleUpload}>
            <label>Class Year</label>
            <input
              type="number"
              className="w-[8rem] px-3 py-2 border rounded"
              value={classData.classYear}
              onChange={(e) => setClassData({ ...classData, classYear: e.target.value })}
            />
            <label>Upload Class list</label>
            <input type="file"  required />
            <button
              className="bg-[#7352FF] text-white active:bg-blue-600 font-bold uppercase text-sm py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none"
              type="submit"
            >
              Upload and Save
            </button>
          </form>
        </div>
      )}
      {showAdd && (
        <div className="mt-2 border p-2 w-[320px] right-2 absolute rounded-md">
            <div className="flex justify-center">
            <h1 className="text-xl">Add Single Student</h1>
            <button onClick={disableAdd} className="text-xl right-6 absolute rounded-md bg-black w-8 text-white">X</button>
            </div>
         
          <form className="mt-6 flex gap-4 flex-col">
          <label>Student Id</label>
            <input
              type="number"
              className="w-11/12 px-3 py-2 border-b rounded-md"
              value={classData.classYear}
              onChange={(e) => setClassData({ ...classData, classYear: e.target.value })}
            />
            <label>Student Name</label>
            <input
              type="number"
              className="w-11/12 px-3 py-2 border-b rounded-md"
              value={classData.classYear}
              onChange={(e) => setClassData({ ...classData, classYear: e.target.value })}
            />
            <label>Gender</label>
            <input
              type="number"
              className="w-11/12 px-3 py-2 border-b rounded-md"
              value={classData.classYear}
              onChange={(e) => setClassData({ ...classData, classYear: e.target.value })}
            />
            <button type="submit" className="text-xl px-12 py-2 text-white bg-blue-500 rounded-3xl"> Save</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Class;
