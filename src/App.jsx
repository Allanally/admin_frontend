import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';

import { Navbar, Footer, Class, Sidebar, ThemeSettings } from './components';
import { Ecommerce, Students, Discipline, Home, Main, Pending, DetailsPage, Staff, InventoryDetails, NewOrder } from './pages';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";


const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <BrowserRouter>
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>

              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>

            
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              {themeSettings && (<ThemeSettings />)}

              <Routes>
                {/* dashboard  */}
                <Route path="/" element={(<Ecommerce />)} />
                <Route path="/home" element={(<Ecommerce />)} />
                <Route path="/staff" element={(<Staff />)} />
                <Route path="/inventory/:Stock_id/:Item_id" element={(<InventoryDetails />)} />

                {/* pages  */}
                <Route path="/students" element={<Students />} />
                <Route path='/Main' element={<Main />} />
                <Route path="/PERMISSIONS" element={<Pending />} />
                <Route path="/class/:className" element={<Class />} />
                <Route path="/DISCIPLINE" element={<Discipline />} />
                <Route path='/orders/:id' element={<DetailsPage />} />
                <Route path='/new-order/:id' element={<NewOrder />} />
                <Route path='/new-order' element={<NewOrder />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;