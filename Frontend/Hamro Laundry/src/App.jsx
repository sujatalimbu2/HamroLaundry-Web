import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'
import Home from "./pages/Home";
import Contactus from "./pages/Home";

function App() {

  return(
   <BrowserRouter>
   <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/contactus" element={< Contactus/>}/>

      </Routes> 
   </BrowserRouter>

  )
}

export default App
