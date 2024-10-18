import React from 'react';
import classNames from 'classnames/bind';
import styles from './TaskbarTop.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const TaskbarTop: React.FC = () => {
    const navigate = useNavigate(); // Hook điều hướng

    const handleBackClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        navigate(-1); // Quay lại trang trước
    };

    return (
        <nav className={cx('taskbar')}>
          <a
            href="/"
            onClick={handleBackClick}
            className={cx('exi')}
            aria-label="Go back to previous page"
          >
            Back
          </a>
        </nav>
    );
};

export default TaskbarTop;
 