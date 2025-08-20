import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './styles/global.css';
import NavBar from './components/NavBar';
import Landing from './pages/Landing';
import Events from './pages/Events';
import Login from './pages/Login';
import OrganiserLogin from './pages/organisers/login';
import Dashboard from './pages/organisers/dashboard';
import EventManagement from './pages/organisers/eventmanagement';
import ParticipantsTeamsPage from './pages/organisers/participants';
import AnnouncementsPage from './pages/organisers/announcements';
import Leaderboard from './pages/organisers/leaderboard';
import AnalyticsCertificates from './pages/organisers/analytics';
import SubmissionsPage from './pages/organisers/submissions';
import SettingsDashboard from './pages/organisers/settings';
function AppRoutes() {
  const location = useLocation();
  // Hide NavBar on all /organisers/* routes
  const hideNavBar = location.pathname.startsWith('/organisers/');

  return (
    <>
      {!hideNavBar && <NavBar />}
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/events" element={<Events/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/organisers/login" element={<OrganiserLogin/>}/>
        <Route path="/organisers/dashboard" element={<Dashboard />} />
        <Route path="/organisers/eventmanagement" element={<EventManagement/>} />
        <Route path="/organisers/participants" element={<ParticipantsTeamsPage/>} />
        <Route path="/organisers/announcements" element={<AnnouncementsPage/>} />
        <Route path="/organisers/leaderboard" element={<Leaderboard/>} />
        <Route path="/organisers/analytics" element={<AnalyticsCertificates/>} />
        <Route path="/organisers/submissions" element={<SubmissionsPage/>} />
        <Route path="/organisers/settings" element={<SettingsDashboard/>} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}