import React, { useState } from 'react';
import {
  AppstoreOutlined,
  MailOutlined,
  CloseCircleOutlined,
  MessageOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import type { MenuProps } from 'antd'; 
import styles from "./Taskbaradmin.module.scss";
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const TaskbarAdmin: React.FC = () => {
  const location = useLocation(); // Lấy đường dẫn hiện tại
  const [mode] = useState<'vertical' | 'inline'>('inline');

  // Xác định key của mục dựa trên đường dẫn hiện tại
  const getSelectedKey = () => {
    switch (location.pathname) {
      case '/admin/listUs':
        return ['1'];
      case '/admin/listPo':
        return ['2'];
      default:
        return []; // Không có mục nào được chọn
    }
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
              Bài viết bị report
            </Link>
          ),
        },
      ],
    },
  ];

  return (
    <div className={cx('taskbar-admin')}>
      <Menu 
        mode={mode} 
        items={items} 
        defaultSelectedKeys={getSelectedKey()} 
      />
    </div>
  );
};

export default TaskbarAdmin;
