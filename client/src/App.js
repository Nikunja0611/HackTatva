import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/global.css';
import NavBar from './components/NavBar';
import Landing from './pages/Landing';
import Events from './pages/Events';
import Login from './pages/Login';

export default function App(){
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/events" element={<Events/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}
