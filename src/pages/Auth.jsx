import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';


const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate('/home');
  }, [user, navigate]);

  const handleAuth = async () => {
    if (!email || !password) {
      toast.error('Email and Password are required');
      return;
    }

    setLoading(true);
    let error;

    if (isSignUp) {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: 'http://localhost:5173/home',
        },
      });
      error = signUpError;
    } else {
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      error = loginError;
    }

    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(`${isSignUp ? 'Signup' : 'Login'} successful`);
      navigate('/home');
    }
  };

  return (
    <div>
      <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleAuth} disabled={loading}>
        {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Login'}
      </button>
      <p onClick={() => setIsSignUp(!isSignUp)} style={{ cursor: 'pointer' }}>
        {isSignUp ? 'Have an account? Login' : 'No account? Sign up'}
      </p>
    </div>
  );
};

export default Auth;