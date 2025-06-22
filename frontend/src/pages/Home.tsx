import React from 'react';
import AdminDashboard from './AdminDashboard';
import Dashboard from './Dashboard';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
        {
          user?.role === 'admin' ? <AdminDashboard/> : <Dashboard/>
        }
    </>
  );
};

export default Home;