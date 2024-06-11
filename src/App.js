import './App.css';
import Home from "./components/HomePage";
import Resume from "./components/Resume";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';


function App() {
  const [result, setResult] = useState({});
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home setResult={setResult}/>}/>
        <Route path='/resume' element={<Resume result={result}/>}/>
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
