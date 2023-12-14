import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

import { Header } from '../components';


const DetailsPage = () => {

  const { id } = useParams();

console.log("info: ", id);

const [data, setData] = useState([]);
useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/client/transactions/${id}`)
    .then((res) =>{ 
        setData(res.data)
          // setLoading(false);
        })
    .catch(err => console.log(err))
}, []);
console.log(data.totalAmount);
  return (
    <div className="md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
          <div className="flex justify-between items-center">
          <Header category="Your" title="Order Details" />
          <Link to={`/new-order/${id}`}>
          <button
            className="bg-[#7352FF] text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none"
            type="button"
               >
            Add a New Order
          </button>
      </Link>
          </div>
    <div className="flex">
      <div class="flex-1 h-40 mt-8 mr-8 flex items-center justify-center">
        <div class="text-black text-center">
          <p class="text-lg mt-2 font-bold">Customer Names : {data.customer}</p>
          <p className='mt-2'>Customer Balance: $ {data.balance}</p>
          <p className='mt-2'>Payment Method: {data.method}</p>
        </div>
      </div>

      <div class="flex-1 h-40 mt-8 mr-8 flex items-center justify-center">
        <div class="text-black text-center">
          <p class="text-lg mt-2 font-bold">Total order Amount: ${data.totalAmount}</p>
          <p className='mt-2'>Customer Pay: $ {data.paid}</p>
          <p className='mt-2'>Customer Balance: $ {data.balance}</p>
          <p className='mt-2'>Your Balance: $ {data.balance}</p>
        </div>
  </div>
  </div>
  <p className='mt-2 text-black'>Item Number: </p>

  <Table>
      <TableHead>
        <TableRow>
          <TableCell>Item</TableCell>
          <TableCell>Ordered Bags</TableCell>
          <TableCell>Shipped Bags</TableCell>
          <TableCell>Left Bags</TableCell>
          <TableCell>Pairs/Bag</TableCell>
          <TableCell>Unit Price</TableCell>
          <TableCell>Item Total Amount</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
          
          <TableRow>
            <TableCell>{}</TableCell>
            <TableCell>{data.orderedBags}</TableCell>
            <TableCell>{data.shippedBags}</TableCell>
            <TableCell>{data.leftBags}</TableCell>
            <TableCell>{}</TableCell>
            <TableCell>{}</TableCell>
            <TableCell>{data.totalAmount}</TableCell>
 
          </TableRow>             
       
      </TableBody>
    </Table> 
</div>
  )
}

export default DetailsPage
