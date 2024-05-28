import { Button, Menu, Icon, Dropdown } from 'semantic-ui-react';
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
        {/* <Icon name="dollar" /> */}
        收支
      </Menu.Item>

      <Menu.Item as={Link} to="/balances">
        收支查詢
      </Menu.Item>

      {/* <Menu.Item as={Link} to="/notes">
        <Icon name="book" />
        記事本
      </Menu.Item> */}

      <Dropdown text="月" item>
        <Dropdown.Menu>
          <Menu.Item as={Link} to="/credits">
            信用卡
          </Menu.Item>
          <Menu.Item as={Link} to="/dashboard">
            {/* <Icon name="chart bar" /> */}
            收支統計
          </Menu.Item>
          <Menu.Item as={Link} to="/mortgages">
            房貸
          </Menu.Item>
          <Menu.Item as={Link} to="/mortgage-accounts">
            房貸帳戶
          </Menu.Item>
          <Menu.Item as={Link} to="/works">
            工件
          </Menu.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown text="設定" item>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/accounts">
            帳戶
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/cates">
            類別
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/notes">
            記事
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/cates-note">
            記事類別
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/credits-section">
            信用卡期數
          </Dropdown.Item>
          <Dropdown.Item>
            <Dropdown text="舊資料">
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/spending">
                  記帳
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/notebook">
                  記事本
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* <Dropdown text="舊資料" item>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/spending">
            記帳
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/notebook">
            記事本
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown> */}

      {/* <Menu.Item as={Link} to="/balance">
        <Icon name="angle right" />
      </Menu.Item> */}

      {user && (
        <Menu.Item onClick={handleLogout}>
          <Icon name="sign-out" />
        </Menu.Item>
      )}
    </Menu>
  );
}
