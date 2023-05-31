import { Button } from 'semantic-ui-react'
import React from 'react'
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Header() {

  const { currentUser, logout } = useAuth();

  const user = localStorage.getItem('login')

  const navigate = useNavigate()
  async function handleLogout() { 

    try {
      // await logout();
      localStorage.setItem('login','')
      navigate('/login');
    } catch {
      // setError("Failed to log out")
    }
  }
  return (
    <div>
      {user &&  <Button onClick={handleLogout}>登出</Button> }
     
    </div>
  )
}
