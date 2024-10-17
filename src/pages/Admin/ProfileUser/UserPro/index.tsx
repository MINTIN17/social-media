import React from 'react';
import styles from './UserPro.module.scss'; // Import SCSS module
import { Menu } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

const UserProfile: React.FC = () => {
  return (
    <div className={styles.containerPro}> {/* Sử dụng class từ SCSS module */}
      <div className={styles.headProfile}>
        <div className={styles.imgavt}>
          <div className={styles.backListUs}>
            <a href="/admin/listUs" className={styles.backLi}>
              <ArrowLeftOutlined />
            </a>
          </div>
          {/* <img src="/Image/background.jpg" alt="BackGround" className={styles.imgbgr} /> */}
          <img src={`${process.env.PUBLIC_URL}/asset/img/background.jpg`} alt="BackGround" className={styles.imgbgr}/>
          <div className={styles.avtvsname}>
            {/* <img src="/Image/avtUs.jpg" alt="Avatar" className={styles.avtNa} /> */}
            <img src={`${process.env.PUBLIC_URL}/asset/img/avtUs.jpg`} alt="Avatar" className={styles.avtNa}/>
            <div className={styles.nameUs}>
              <p className={styles.nameUser}>Nguyen Duc Thang</p>
              <p className={styles.friendUs}>299 Bạn bè</p>
            </div>
          </div>
        </div>
        <div className={styles.headMenu}>
          <Menu mode="horizontal" theme="light" style={{ lineHeight: '64px' }}>
            <Menu.Item key="1">
              <Link to="post">Bài viết</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="about">Giới thiệu</Link>
            </Menu.Item>
            <Menu.Item key="3" className={styles.lastMenuItem}>
              <Link to="setting">Cài đặt</Link>
            </Menu.Item>
          </Menu>
        </div>
      </div>
      <div className={styles.bodyProfileUs}>
        <Outlet />
      </div>
    </div>
  );
}

export default UserProfile;
