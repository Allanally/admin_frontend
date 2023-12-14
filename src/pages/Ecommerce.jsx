import React from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import { Button } from '../components';
import { earningData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';

const Ecommerce = () => {

  const { currentColor, currentMode } = useStateContext();

  return (
    <div className="mt-24">
      <div className="flex  justify-center gap-5 ">
         <div className="flex m-3  justify-between gap-10 items-center">
          {earningData.map((item) => (
              <div key={item.title} className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
                <Link to={`/${item.title}`}>
                <button
                    type="button"
                    style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                    className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
                  >
                    {item.icon}
                  </button>

                  <p className="text-lg text-gray-400  mt-5">{item.title}</p>
                </Link>
              </div>
            ))}
         </div>
      </div> 
    </div>
  )
}

export default Ecommerce
