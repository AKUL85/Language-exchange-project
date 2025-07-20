import React from 'react';
import Navbar from './component/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Fotter from './component/Fotter/Fotter';

function Root(props) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
       
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Fotter></Fotter>
        </div>
    );
}

export default Root;