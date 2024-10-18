import React from 'react';
import {
  TeamOutlined,
  UserAddOutlined,
  UserSwitchOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import styles from "./TaskbarFriend.module.scss"

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  { key: '1', icon: <TeamOutlined />, label: 'Danh sách bạn bè' },
  { key: '2', icon: <UserAddOutlined />, label: 'Lời mời kết bạn' },
  { key: '3', icon: <UserSwitchOutlined />, label: 'Lời mời đã gửi' },
];

const App: React.FC = () => {

  return (
    <div className={styles.taskbarList}>
      {/* Thêm tiêu đề bảng */}
      <div className={styles.headMenu}>
        <p className={styles.nameMenu}>Bạn bè</p>
        <p className={styles.numberFr}>20 Ban be</p>
      </div>
      <Menu
        defaultSelectedKeys={['1']}
        // mode="inline"
        theme="light"
        items={items}
        className={styles.customMenu}
      />
    </div>
  );
};

export default App;
