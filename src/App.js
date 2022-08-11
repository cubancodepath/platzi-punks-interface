import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./views/home"
import Web3 from "web3/dist/web3.min"
import MainLayout from './layout/main'
function App() {
  
  return (
    <MainLayout>
      <Routes>
        <Route path="/" exact element={<Home/>}/>
      </Routes>
    </MainLayout>
    
  );
}

export default App;
