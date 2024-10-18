import React, { useState } from 'react';
import {
  AppstoreOutlined,
  MailOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import type { MenuProps } from 'antd'; 
import styles from "./Taskbaradmin.module.scss";
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);  

// Định nghĩa interface cho props
interface TaskbarAdminProps {
  children: React.ReactNode; // Chấp nhận prop children
}

const TaskbarAdmin: React.FC<TaskbarAdminProps> = ({ children }) => {
  const [mode, setMode] = useState<'vertical' | 'inline'>('inline');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const changeMode = (value: boolean): void => {
    setMode(value ? 'vertical' : 'inline');
  };

  const changeTheme = (value: boolean): void => {
    setTheme(value ? 'dark' : 'light');
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      icon: <MailOutlined />,
      label: (
        <Link className="link" to="/admin/listUs">
          Danh sách người dùng
        </Link>
      ),
    },
    {
      key: 'sub1',
      label: 'Danh sách bài viết',
      icon: <AppstoreOutlined />,
      children: [
        {
          key: '2',
          icon: <CloseCircleOutlined />,
          label: (
            <Link className="pass-link" to="/admin/listPo">
              Bài viết chưa duyệt
            </Link>
          ),
        },
      ],
    },
    {
      key: '4',
      icon: <MailOutlined />,
      label: (
        <Link className="pass-link" to="/forgot">
          Hồ sơ cá nhân
        </Link>
      ),
    },
  ];

  return (
    <div className={cx('taskbar-admin')}>
      <Menu mode={mode} theme={theme} items={items} />
      <div className={cx('children-container')}>
        {children} {/* Hiển thị children ở đây */}
      </div>
    </div>
  );
};

export default TaskbarAdmin;
