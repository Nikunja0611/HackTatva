import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loginWithToken } = useAuth();
  const [status, setStatus] = useState('Processing...');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const token = searchParams.get('token');
        const userParam = searchParams.get('user');
        const error = searchParams.get('error');

        if (error) {
          setStatus('Authentication failed');
          setTimeout(() => {
            navigate('/login?error=oauth_failed');
          }, 2000);
          return;
        }

        if (!token) {
          setStatus('No authentication token received');
          setTimeout(() => {
            navigate('/login?error=no_token');
          }, 2000);
          return;
        }

        setStatus('Completing authentication...');

        // Parse user data
        let userData = null;
        if (userParam) {
          try {
            userData = JSON.parse(decodeURIComponent(userParam));
          } catch (e) {
            console.error('Failed to parse user data:', e);
          }
        }

        // Login with the received token
        const result = await loginWithToken(token, userData);

        if (result.success) {
          setStatus('Authentication successful! Redirecting...');
          setTimeout(() => {
            navigate('/events');
          }, 1500);
        } else {
          setStatus('Authentication failed');
          setTimeout(() => {
            navigate('/login?error=auth_failed');
          }, 2000);
        }

      } catch (error) {
        console.error('Auth callback error:', error);
        setStatus('Authentication failed');
        setTimeout(() => {
          navigate('/login?error=callback_error');
        }, 2000);
      }
    };

    handleCallback();
  }, [searchParams, navigate, loginWithToken]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
        maxWidth: '400px'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '3px solid #f3f3f3',
          borderTop: '3px solid #007bff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 1rem'
        }}></div>
        <h2 style={{ color: '#333', marginBottom: '1rem' }}>Completing Login</h2>
        <p style={{ color: '#666' }}>{status}</p>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
