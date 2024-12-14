import React, { useState } from 'react';
import { TeamOutlined, UserAddOutlined, UserSwitchOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import styles from "./TaskbarFriend.module.scss";

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: '1',
    icon: <TeamOutlined />,
    label: (
      <Link className="link" to="/friend/friendlist">
        Danh sách bạn bè
      </Link>
    ),
  },
  {
    key: '2',
    icon: <UserAddOutlined />,
    label: (
      <Link className="link" to="/friend/friendRequests">
        Lời mời kết bạn
      </Link>
    ),
  },
  {
    key: '3',
    icon: <UserSwitchOutlined />,
    label: (
      <Link className="link" to="/friend/friendsent">
        Lời mời đã gửi
      </Link>
    ),
  },
];

const TaskBarFriend: React.FC = () => {
  const location = useLocation();
  const [friendCount, setFriendCount] = useState<number>(20);

  // Logic để chuyển đổi URL thành key
  const selectedKey = (() => {
    switch (location.pathname) {
      case '/friend/friendlist':
        return '1';
      case '/friend/friendRequests':
        return '2';
      case '/friend/friendsent':
        return '3';
      default:
        return '1'; 
    }
  })();

  return (
    <div className={styles.taskbarList}>
      <div className={styles.headMenu}>
        <p className={styles.nameMenu}>Bạn bè</p>
        <p className={styles.numberFr}>{friendCount} Bạn bè</p>
      </div>
      <Menu
        selectedKeys={[selectedKey]}
        theme="light"
        items={items}
        className={styles.customMenu}
      />
    </div>
  );
};

export default TaskBarFriend;
