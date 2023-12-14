import React, { useState } from 'react';
import axios from 'axios';

import { useStateContext } from '../contexts/ContextProvider'

const Form = () => {

  const { currentColor, currentMode,  dispatch } = useStateContext();

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    phoneNumber: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_BASE_URL}/client/customers`, {...formData})
    .then(res =>     {
      // location.reload();
      dispatch({ type: 'CREATE_CUSTOMER', payload: res });
      alert(`${res.data.name} is added to your customers`);
    })
    .catch(err => console.log(err))
    setIsOpen(false);
  };

  return (
    <div>
      <button
        className="bg-[#7352FF] text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        Add a new Permission
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-3xl mx-auto my-6">
            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid rounded-t">
                <h3 className="text-3xl font-semibold">
                  Permission Form
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              <div className="relative p-6 flex-auto">
                <form onSubmit={handleSubmit}>
                  {/* Render form inputs here */}
                  <label className="block mb-4">
                    Name:
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </label>
                  <label className="block mb-4">
                    email:
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </label>
                  <label className="block mb-4">
                    Phone Number:
                    <input
                      type="telephone"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, phoneNumber: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded"

                    />
                  </label>

                  <div className="p-4">                
                      <select value={formData.country} 
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                      required
                          >
                        <option value="">Select a country</option>
                        <option value="Rwanda">Rwanda</option>
                        <option value="Uganda">Uganda</option>
                        <option value="Tanzania">Tanzania</option>
                      </select>
                  </div>
                  <div className="flex justify-between items-center">                   
                        <button
                        type="submit"
                        onClick={() => handleSubmit}
                        className={`text-white rounded-[10px] bg-[#7352ff]  p-3 hover:drop-shadow-xl`}
                      >
                        Add
                      </button>
                    </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
