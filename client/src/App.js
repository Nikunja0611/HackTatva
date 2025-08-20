import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/global.css';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/common/Landing';
import Events from './pages/participants/Events';
import Login from './pages/common/Login';
import Signup from './pages/common/Signup';
import AuthCallback from './pages/common/AuthCallback';
import EmailVerification from './pages/common/EmailVerification';
import Dashboard from './pages/participants/Dashboard';
import SubmitProject from './pages/participants/SubmitProject';
import Leaderboard from './pages/participants/Leaderboard';
import TeamManagement from './pages/participants/TeamManagement';

export default function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/auth-callback" element={<AuthCallback/>}/>
          <Route path="/verify-email" element={<EmailVerification/>}/>

          {/* Protected Routes - Require Authentication */}
          <Route path="/events" element={
            <ProtectedRoute>
              <Events/>
            </ProtectedRoute>
          }/>
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          }/>
          <Route path="/submit-project" element={
            <ProtectedRoute>
              <SubmitProject/>
            </ProtectedRoute>
          }/>
          <Route path="/leaderboard" element={
            <ProtectedRoute>
              <Leaderboard/>
            </ProtectedRoute>
          }/>
          <Route path="/team-management" element={
            <ProtectedRoute>
              <TeamManagement/>
            </ProtectedRoute>
          }/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
