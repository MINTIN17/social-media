import { ReactElement } from 'react';
import classNames from 'classnames/bind';
import Profile from '../../components/Profile';
import styles from './ProfileLayout.module.scss';
import TaskbarAdmin from '../../components/TaskbarAdmin';

const cx = classNames.bind(styles);

interface HeaderOnlyProps {
    children: ReactElement;
}

function HeaderOnly({ children }: HeaderOnlyProps) {
    return (
      <div className={cx("containerLayout")}>
        <div className={cx("taskbar")}><TaskbarAdmin /></div>
        <div className={cx("container")}>
          <div className={cx("content")}><Profile /></div>
          <div className={cx("contentPl")}>{children}</div>
        </div>
      </div>
    );
}

export default HeaderOnly;
