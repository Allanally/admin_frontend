import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useStateContext } from '../contexts/ContextProvider';
import ShopIcon from '@mui/icons-material/Shop';

const BuyForm = ({ ID, name, price }) => {

  const {  dispatchs, dispatch,customers } = useStateContext();

  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);

  //states for orders form
  const [cust, useCust] = useState('');
  const [method, setMethod] = useState();
  const [paid, setPaid] = useState();
  const [topay, setTopay] = useState(0);
  const [balance, setBalance] = useState(0);
  const [unitsTaken, setUnitsTaken] = useState(0);

  // console.log(parseInt(price, 10) * parseInt(products.unitsTaken, 10));
  // console.log(parseInt(price, 10));
  //console.log("topay", topay, "paid", paid, (topay - paid));
  

  
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/client/customers`)
    .then((res) =>{ 
      dispatch({ type: 'GET_CUSTOMERS', payload: res.data })
    })
    .catch(err => console.log(err))
}, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setProducts([{ id: ID, unitsTaken: unitsTaken, customer: cust, balance: balance, topay: topay, paid: paid, method: method}])
    console.log(products);
    axios.post(`${import.meta.env.VITE_BASE_URL}/client/transactions`,  { products })
      .then(res => {
        if (res.status === 201) { // Check the response status
          dispatchs({ type: 'CREATE_TRANSACTION', payload: res }); // Dispatch res.data
          alert(`Purchase done for ${products[0].unitsTaken}  items of ${name}`);
          setProducts({products: []});
          location.reload()
        } else {
          console.error("Transaction creation failed");
           setProducts({products: []});
        }
      })
      .catch(err => {
        console.error(err)
       setProducts({products: []})
      })
      .finally(() => setIsOpen(false)); // Always close the modal, regardless of success or failure
  };
  
 // console.log(products);

  return (
    <div>
      <button
        className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none"
        type="button"
      onClick={() => {
          setIsOpen(true);
           }}
           >
          <ShopIcon/>
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-3xl mx-auto my-6">
            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid rounded-t">
                <h3 className="text-3xl font-semibold">
                  SELL
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
                      <div className="p-4">                
                      <select value={cust} 
                      onChange={(e) =>  useCust(e.target.value)}
                      className="block appearance-none w-[18rem] bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                      required
                          >
                        <option>Select customer</option>
                        {customers && customers.map((info) => (
                        <option key={info._id}>{info.name}</option>
                        ))}
                      </select>
                  </div>

                  <div className="p-4">                
                      <select value={method} 
                      onChange={(e) => setMethod(e.target.value)}
                      className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                      required
                          >
                        <option value="">Select a payment method</option>
                        <option value="Bank">Bank</option>
                        <option value="Cash">Cash</option>
                      </select>
                  </div>
                
        
                  <label className="block mb-4">
                    Ordered Bags:
                    </label>
                    <input
                      type="number"
                      value={unitsTaken}
                    onChange={(e) =>{
                     // setProducts([{ id: ID, unitsTaken: e.target.value }])
                     setUnitsTaken(e.target.value)
                      setTopay(price * e.target.value)
                     } }
                      className="w-full px-3 py-2 border rounded"
                    />
                  <label className="block mb-4">
                    Amount to pay:
                    </label>
                    <input
                      type="number"
                      value={topay}
                      className="w-full px-3 py-2 border rounded"
                    />
                  <label className="block mb-4">
                    Paid:
                    </label>
                    <input
                      type="number"
                      value={paid}
                      className="w-full px-3 py-2 border rounded"
                      onChange={(e) =>{
                        setPaid(e.target.value)
                        setBalance(topay - e.target.value)
                       }}
                    />
                  <label className="block mb-4">
                    Balance:
                    </label>
                    <input
                      type="number"
                      value={balance}
                      className="w-full px-3 py-2 border rounded"

                    />

                  <div className="flex justify-between items-center">                   
                        <button
                        type="submit"
                        onClick={() => handleSubmit}
                        className={`text-white rounded-[10px] bg-[#7352ff]  p-3 hover:drop-shadow-xl`}
                      >
                        BUY NOW
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

export default BuyForm;
