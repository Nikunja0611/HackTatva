import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function EmailVerification() {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [canResend, setCanResend] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { verifyEmail, resendVerification, user } = useAuth();

  // Get email from location state or user context
  const email = location.state?.email || user?.email;

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  // Handle code input
  const handleCodeChange = (index, value) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d{6}$/.test(pastedData)) {
      const newCode = pastedData.split('');
      setVerificationCode([...newCode, ...Array(6 - newCode.length).fill('')]);
    }
  };

  // Verify email
  const handleVerify = async () => {
    const code = verificationCode.join('');
    if (code.length !== 6) {
      setMessage('❌ Please enter the complete 6-digit code');
      return;
    }

    setIsSubmitting(true);
    setMessage('🔄 Verifying your email...');

    try {
      const result = await verifyEmail(email, code);
      
      if (result.success) {
        setMessage('✅ Email verified successfully! Redirecting...');
        setTimeout(() => {
          navigate('/events');
        }, 2000);
      } else {
        setMessage(`❌ ${result.error}`);
      }
    } catch (error) {
      setMessage('❌ Verification failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Resend verification code
  const handleResend = async () => {
    setIsSubmitting(true);
    setMessage('🔄 Sending verification code...');

    try {
      const result = await resendVerification(email);
      
      if (result.success) {
        setMessage('✅ Verification code sent! Check your email.');
        setCountdown(60); // 60 second cooldown
        setCanResend(false);
      } else {
        setMessage(`❌ ${result.error}`);
      }
    } catch (error) {
      setMessage('❌ Failed to send verification code. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!email) {
    return (
      <div style={{
        display: 'flex',
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
          <h2 style={{ color: '#333', marginBottom: '1rem' }}>Email Required</h2>
          <p style={{ color: '#666' }}>Please provide an email address to verify.</p>
          <button 
            onClick={() => navigate('/signup')}
            style={{
              background: '#007bff',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            Go to Signup
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
        maxWidth: '400px',
        width: '100%'
      }}>
        <h2 style={{ color: '#333', marginBottom: '1rem' }}>Verify Your Email</h2>
        <p style={{ color: '#666', marginBottom: '1rem' }}>
          We've sent a 6-digit verification code to:
        </p>
        <p style={{ 
          color: '#007bff', 
          fontWeight: 'bold', 
          marginBottom: '2rem',
          wordBreak: 'break-all'
        }}>
          {email}
        </p>

        {/* Verification Code Input */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem', 
            color: '#333',
            fontWeight: 'bold'
          }}>
            Enter Verification Code:
          </label>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '1rem'
          }}>
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                style={{
                  width: '40px',
                  height: '50px',
                  textAlign: 'center',
                  fontSize: '20px',
                  border: '2px solid #ddd',
                  borderRadius: '5px',
                  outline: 'none'
                }}
                maxLength={1}
                disabled={isSubmitting}
              />
            ))}
          </div>
        </div>

        {/* Message */}
        {message && (
          <div style={{
            padding: '0.75rem',
            borderRadius: '5px',
            marginBottom: '1rem',
            backgroundColor: message.includes('✅') ? '#d4edda' : '#f8d7da',
            color: message.includes('✅') ? '#155724' : '#721c24',
            border: `1px solid ${message.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`
          }}>
            {message}
          </div>
        )}

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={isSubmitting || verificationCode.join('').length !== 6}
          style={{
            background: verificationCode.join('').length === 6 ? '#007bff' : '#ccc',
            color: 'white',
            border: 'none',
            padding: '12px 30px',
            borderRadius: '5px',
            cursor: verificationCode.join('').length === 6 ? 'pointer' : 'not-allowed',
            fontSize: '16px',
            width: '100%',
            marginBottom: '1rem'
          }}
        >
          {isSubmitting ? 'Verifying...' : 'Verify Email'}
        </button>

        {/* Resend Code */}
        <div style={{ marginBottom: '1rem' }}>
          <p style={{ color: '#666', fontSize: '14px' }}>
            Didn't receive the code?
          </p>
          <button
            onClick={handleResend}
            disabled={!canResend || isSubmitting}
            style={{
              background: canResend ? '#28a745' : '#ccc',
              color: 'white',
              border: 'none',
              padding: '8px 20px',
              borderRadius: '5px',
              cursor: canResend ? 'pointer' : 'not-allowed',
              fontSize: '14px'
            }}
          >
            {countdown > 0 ? `Resend in ${countdown}s` : 'Resend Code'}
          </button>
        </div>

        {/* Back to Login */}
        <button
          onClick={() => navigate('/login')}
          style={{
            background: 'transparent',
            color: '#007bff',
            border: '1px solid #007bff',
            padding: '8px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}
