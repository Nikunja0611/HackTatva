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
import OrganizerDashboard from './pages/organisers/dashboard';
import EventManagement from './pages/organisers/eventmanagement';
import ParticipantsTeamsPage from './pages/organisers/participantteams';
import AnnouncementsPage from './pages/organisers/announcements';
import OrganizerLeaderboard from './pages/organisers/leaderboard';
import AnalyticsCertificates from './pages/organisers/analytics';
import SubmissionsPage from './pages/organisers/submissions';
import SettingsDashboard from './pages/organisers/settings';


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
        <Route path="/organiser/dashboard" element={<OrganizerDashboard/>}/>
        <Route path="/organiser/event-management" element={<EventManagement/>}/>
        <Route path="/organiser/participantteams" element={<ParticipantsTeamsPage/>}/>
        <Route path="/organiser/announcements" element={<AnnouncementsPage/>}/>
        <Route path="/organiser/leaderboard" element={<OrganizerLeaderboard/>}/>
        <Route path="/organiser/analytics-certificates" element={<AnalyticsCertificates/>}/>
        <Route path="/organiser/submissions" element={<SubmissionsPage/>}/>
        <Route path="/organiser/settings" element={<SettingsDashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}
