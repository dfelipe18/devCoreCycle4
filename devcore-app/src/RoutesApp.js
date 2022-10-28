import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './components/page/Home';
import Login from './components/page/Login';
import SalesComponent from './components/SalesComponent';

const RoutesApp = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Login />}/>
            <Route path="/auth/home" element={<Home />}/>
            <Route path="/auth/sales" element={<SalesComponent />}/>
        </Routes>
    );
}

export default RoutesApp;