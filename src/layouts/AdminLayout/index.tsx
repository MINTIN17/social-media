import { ReactNode } from 'react';
import styles from "./AdminLayout.module.scss";
import TaskbarAdmin from '../../components/TaskbarAdmin';

interface AdminLayoutProps {
  children: ReactNode;
}

function AdminLayout({ children }: AdminLayoutProps) {  // Sửa lại tên hàm
  return (
      <div className={styles.containerLayout}>
        <div className={styles.taskbar}><TaskbarAdmin /></div>
        <div className={styles.content}>{children}</div>
      </div>
  );
}

export default AdminLayout;
