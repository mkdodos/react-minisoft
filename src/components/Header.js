import { Button, Menu, Icon } from 'semantic-ui-react';
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Header() {
  const { currentUser, logout } = useAuth();

  // 取得 user 值
  const user = localStorage.getItem('user');

  const navigate = useNavigate();
  // 登出
  async function handleLogout() {
    try {
      // await logout();
      // 清空 user 值
      localStorage.setItem('user', '');
      navigate('/login');
    } catch {
      // setError("Failed to log out")
    }
  }
  return (
    <Menu pointing secondary>
      <Menu.Item as={Link} to="/balance">
        記帳
      </Menu.Item>
      <Menu.Item as={Link} to="/spending">
        記帳(舊資料)
      </Menu.Item>
      <Menu.Item as={Link} to="/notebook">
        記事本
      </Menu.Item>
      {user && (
        <Menu.Item onClick={handleLogout}>
          <Icon name="sign-out" />
          登出
        </Menu.Item>
      )}
    </Menu>
  );
}
