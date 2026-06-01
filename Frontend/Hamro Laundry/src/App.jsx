import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'
import Home from "./pages/Home";
import About from "./pages/About";
import Book from "./pages/Book";

function App() {

  return(
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/About" element={< About/>}/>
         <Route path="/book" element={<Book />} />

      </Routes> 
    </BrowserRouter>

  )
}

export default App
