import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';

const NavBar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  return (
    <nav>
      {/* <Link to="/">Index</Link> */}
      {user ? (
        <>
          <Link to="/home">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/wallet">Wallet</Link>
          <Link to="/alerts">Alerts</Link>
          <Link to="/analytics">Analytics</Link>
          {/* <Link to="/market-trends">Market Trends</Link> */}
          <span style={{ color: 'white' }}>Logged in as {user.email}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <Link to="/auth">Login / Signup</Link>
      )}
    </nav>
  );
};

export default NavBar;
