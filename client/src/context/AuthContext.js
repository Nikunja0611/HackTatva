import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

// Create the auth context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          // Set token in axios headers
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // You can add an endpoint to verify token and get user info
          // For now, we'll just set the token and assume it's valid
          setUser({ token }); // This will be replaced with actual user data
        } catch (error) {
          console.error('Token verification failed:', error);
          logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [token]);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.post('/auth/login', { email, password });
      
      const { token: newToken, user: userData } = response.data;
      
      // Store token in localStorage
      localStorage.setItem('token', newToken);
      
      // Set token in axios headers
      api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      
      // Update state
      setToken(newToken);
      setUser(userData);
      
      return { success: true, user: userData };
      
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Login with token (for OAuth callbacks)
  const loginWithToken = async (newToken, userData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Store token in localStorage
      localStorage.setItem('token', newToken);
      
      // Set token in axios headers
      api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      
      // Update state
      setToken(newToken);
      setUser(userData);
      
      return { success: true, user: userData };
      
    } catch (error) {
      const errorMessage = 'Token login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.post('/auth/register', userData);
      
      const { token: newToken, user: userInfo, requiresVerification } = response.data;
      
      // Store token in localStorage
      localStorage.setItem('token', newToken);
      
      // Set token in axios headers
      api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      
      // Update state
      setToken(newToken);
      setUser(userInfo);
      
      return { 
        success: true, 
        user: userInfo, 
        requiresVerification: requiresVerification || false 
      };
      
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Registration failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Resume upload function
  const uploadResume = async (file) => {
    try {
      setLoading(true);
      setError(null);
      
      const formData = new FormData();
      formData.append('resume', file);
      
      const response = await api.post('/auth/upload-resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return { success: true, data: response.data };
      
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Resume upload failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Email verification function
  const verifyEmail = async (email, code) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.post('/auth/verify-email', { email, code });
      
      const { token: newToken, user: userData } = response.data;
      
      // Update token and user data
      localStorage.setItem('token', newToken);
      api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      setToken(newToken);
      setUser(userData);
      
      return { success: true, user: userData };
      
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Email verification failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Resend verification email
  const resendVerification = async (email) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.post('/auth/resend-verification', { email });
      
      return { success: true, data: response.data };
      
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to resend verification email';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Forgot password
  const forgotPassword = async (email) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.post('/auth/forgot-password', { email });
      
      return { success: true, data: response.data };
      
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to send password reset email';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (email, code, newPassword) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.post('/auth/reset-password', { email, code, newPassword });
      
      return { success: true, data: response.data };
      
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to reset password';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Google OAuth login function
  const loginWithGoogle = () => {
    window.location.href = `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/google`;
  };

  // Logout function
  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Remove token from axios headers
    delete api.defaults.headers.common['Authorization'];
    
    // Clear state
    setToken(null);
    setUser(null);
    setError(null);
  };

  // Clear error function
  const clearError = () => {
    setError(null);
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!token && !!user;
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return user?.role === role;
  };

  // Check if email is verified
  const isEmailVerified = () => {
    return user?.isEmailVerified === true;
  };

  // Context value
  const value = {
    user,
    token,
    loading,
    error,
    login,
    loginWithToken,
    register,
    uploadResume,
    verifyEmail,
    resendVerification,
    forgotPassword,
    resetPassword,
    loginWithGoogle,
    logout,
    clearError,
    isAuthenticated,
    hasRole,
    isEmailVerified,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
