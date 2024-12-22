import React, { useEffect, useState } from 'react';
import { TeamOutlined, UserAddOutlined, UserSwitchOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import styles from "./TaskbarFriend.module.scss";
import axios from 'axios';

type MenuItem = Required<MenuProps>['items'][number];
interface Friend {
  id: string;
  username: string;
  imageUrl: string;
}
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
  const [friends, setFriends] = useState<Friend[]>([]);

  const [friendCount, setFriendCount] = useState<number>();

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

  const getFriendList = async () => {
    try {
      const id = localStorage.getItem('userId');
      const response = await axios.get(`${process.env.REACT_APP_link_server}/account/list-friend/${id}`);
      const data: Friend[] = response.data;
      setFriends(data); // Cập nhật state với danh sách bạn bè
      console.log(data);
    } catch (error) {
      console.error('Error fetching friend requests:', error);
    }
  };

  useEffect(() => {
    getFriendList();
  }, []);

  return (
    <div className={styles.taskbarList}>
      <div className={styles.headMenu}>
        <p className={styles.nameMenu}>Bạn bè</p>
        <p className={styles.numberFr}>{friends.length} Bạn bè</p>
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
