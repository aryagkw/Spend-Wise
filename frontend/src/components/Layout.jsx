import React from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children ? children : <Outlet />}
            </main>
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node
};

export default Layout;
