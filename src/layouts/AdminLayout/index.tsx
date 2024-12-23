import { ReactNode } from 'react';
import styles from "./AdminLayout.module.scss";
import TaskbarAdmin from '../../components/TaskbarAdmin';
import Header from '../../components/Header';

interface AdminLayoutProps {
  children: ReactNode;
}

function AdminLayout({ children }: AdminLayoutProps) {  // Sửa lại tên hàm
  return (
    <div>
      <Header />
      <div className={styles.containerLayout}>
        <div className={styles.taskbar}><TaskbarAdmin /></div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}

export default AdminLayout;
