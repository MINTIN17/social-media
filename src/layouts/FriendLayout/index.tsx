import { ReactElement } from 'react';
import classNames from 'classnames/bind';
import Header from '../../components/Header';
import TaskBarFriend from '../../components/TaskbarFriend';
import styles from './FriendLayout.module.scss'; // Nhập CSS module nếu có

interface HeaderOnlyProps {
  children: ReactElement;
}

function HeaderOnly({ children }: HeaderOnlyProps) {
  return (
    <div>
      <div className={styles.header}><Header /></div>
      <div className={styles.container}>
        <div className={styles.taskbar}><TaskBarFriend /></div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default HeaderOnly;
