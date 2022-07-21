import React, { useState } from 'react';
import { useMoralis, useWeb3Contract } from 'react-moralis';
import { Route, Navigate, Routes } from "react-router-dom";

import classes from './App.module.css';
import Header from "./components/Header"
import abi from "./constants/abi.json"

// ! Pages Imports
import EnterPage from './pages/EnterPage';

function App() {
  return (
    <div>
      <Header />
      <body className={classes.body1}>
        <Routes>
          <Route path="/enter-lottery" exact element={<EnterPage />} />
          <Route path="*" element={<Navigate to="/enter-lottery" replace />} />
        </Routes>
      </body>
    </div>
  );
}

export default App;
