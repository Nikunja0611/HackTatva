import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/global.css';
import Landing from './pages/common/Landing';
import Events from './pages/participants/Events';
import Login from './pages/common/Login';
import Signup from './pages/common/Signup';
import Dashboard from './pages/participants/Dashboard';
import SubmitProject from './pages/participants/SubmitProject';
import Leaderboard from './pages/participants/Leaderboard'; 
import TeamManagement from './pages/participants/TeamManagement';


export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/events" element={<Events/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/submit-project" element={<SubmitProject/>}/>
        <Route path="/leaderboard" element={<Leaderboard/>}/>
        <Route path="/team-management" element={<TeamManagement/>}/>
      </Routes>
    </BrowserRouter>
  );
}
