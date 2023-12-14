import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Header } from '../components';

const InventoryDetails = () => {

    const { Stock_id, Item_id } = useParams();

    console.log("info: ", Stock_id);
    console.log("item: ", Item_id);
    
    const [data, setData] = useState();



    const [itemNumber, setItemNumber] = useState();
    const [size, setSize] = useState();
    const [location, setLocation] = useState();
    const [pair, setPair] = useState();
    const [fPrice, setFPrice] = useState();
    const [sPrice, seSPrice] = useState();
    const [reorder, setReorder] = useState();
    const [units, setUnits] = useState();

    const [items, setItems ] = useState([]);

    // stock states

    const [selectedItem, setSelectedItem ] = useState();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/client/stocks/${Stock_id}`)
        .then((res) =>{ 
            setData(res.data)
            setSelectedItem(res.data.items.find(item => item._id === Item_id))

            })
        .catch(err => console.log(err))
    }, []);

    const handleUpdate = (e) => {

    }
    console.log("hii", selectedItem);
  return (
    <div className="md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
          <div className="flex justify-between items-center">
          <Header category="Your" title="Inventory Details" />
          </div>
{ selectedItem &&  data &&   (    <div className="flex">
      <div class=" flex-col  mr-[30rem]">
        <label className="block mb-4">
                    Item Number:
                    <input
                      type="text"
                      value={selectedItem.itemNumber}
                      onChange={(e) => {handleUpdate(e)}}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </label>
              <label 
              className="block mb-4"
              >
                    Size:
                    <input
                      type="text"
                      value={selectedItem.size}
                      onChange={(e) => {handleUpdate(e)}}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </label>
                  <label>
                  <div className="p-4">                
                      <select 
                      value={selectedItem.location} 
                      onChange={(e) => {handleUpdate(e)}}
                      className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                      required
                          >
                        
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                      </select>
                  </div>
                  </label>  
                  <label className="block mb-4">
                    Pair/Bag:
                    <input
                      type="number"
                      value={selectedItem.pairOrBag}
                      onChange={(e) => {handleUpdate(e)}}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </label>
                  <label className="block mb-4">
                    Factory Price:
                    <input
                      type="number"
                      value={selectedItem.itemFactoryPrice}
                      onChange={(e) => {handleUpdate(e)}}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </label>
                  <label className="block mb-4">
                    Selling Price:
                    <input
                      type="number"
                      value={selectedItem.itemSellingPrice}
                      onChange={(e) => {handleUpdate(e)}}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </label>
                  <label className="block mb-4">
                    Reorder Level:
                    <input
                      type="number"
                      value={selectedItem.itemReorderLevel}
                      onChange={(e) => {handleUpdate(e)}}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </label>
                  <label className="block mb-4">
                    Units on Hand (Bag):
                    <input
                      type="number"
                      value={selectedItem.unitsOnHand}
                      onChange={(e) => {handleUpdate(e)}}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
            </label>
            <input
                    id="fileInput"
                    type="file"
                    name="image"
                    // onChange={handleFileInputChange}
                    // value={fileInputState}
                    className="form-input"
                />

        {/* {previewSource && (
                <img
                    src={previewSource}
                    alt="chosen"
                    style={{ height: '300px' }}
                />
            )} */}
        </div>
    
        <div className="flex-col">
          <p className="text-3xl font-extrabold tracking-tight text-slate-900">
            Add New Stock
           </p>
           <label className="block mb-4">
                    Stock Date:
                    <input
                      type="text"
                      value={data.stockDate}
                      onChange={(e) => {}}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </label>

                  <label className="block mb-4">
                    Number of Bags:
                    <input
                      type="number"
                      value={data.numberOfBags}
                      onChange={(e) => {}}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </label>
                  <label className="block mb-4">
                    Location:
                    <input
                      type="text"
                      value={data.location}
                      onChange={(e) => {}}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </label>
                  <select 
                      value={selectedItem.description} 
                      onChange={(e) => {}}
                      className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                      required
                          >
                        
                        <option value="Stock In">Stock In</option>
                        <option value="Stock Out">Stock Out</option>
                      </select>
                  <label className="block mb-4">
                    Factory Price:
                    <input
                      type="number"
                      value={data.factoryPrice}
                      onChange={(e) => {}}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </label>
                  <label className="block mb-4">
                    Selling Price:
                    <input
                      type="number"
                      value={data.sellingPrice}
                      onChange={(e) => {}}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </label>

                  <button
                        type="submit"
                        onClick={() => {}}
                        className={`text-white text-lg rounded-[10px] bg-[#7352ff]  p-3 hover:drop-shadow-xl`}
                      >
                      +  Update Transaction
                      </button>
        </div>
      </div>)}
    </div>
  )
}

export default InventoryDetails
