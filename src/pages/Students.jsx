// Students.js
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Header } from "../components";
import Class from "../components/Class";

const Students = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/client/transactions`)
      .then((res) => {
        setData(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const classNames = [
    "S1A", "S1B", "S1C", "S1D",
    "S2A", "S2B", "S2C", "S2D",
    "S3A", "S3B", "S3C", "S3D",
    "S4MCB", "S4MPC", "S4MPG", "S4PCB", "S4PCM",
    "S5MCB", "S5MPC", "S5MPG", "S5PCB", "S5PCM",
    "S6MCB", "S6MPC", "S6MPG", "S6PCB", "S6PCM",
  ];

  return (
    <div className="md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className="flex flex-col ">
        <Header category="Your Current" title="Classes" />
        <div className="grid grid-cols-4 ml-6 text-xl gap-4">
          {classNames.map((className, index) => (
            <Link key={index} to={`/class/${className}`} className="border p-[20px] w-[300px] hover:bg-blue-400 hover:text-white cursor-pointer rounded-md">
              {className}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Students;
