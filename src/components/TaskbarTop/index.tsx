import React from 'react';
import classNames from 'classnames/bind';
import styles from './TaskbarTop.module.scss';

const cx = classNames.bind(styles);

const TaskbarTop: React.FC = () => {
    return (
        <nav className={cx('taskbar')}>
            <a href="/" className={cx('exi')} aria-label="Go back to homepage">Back</a>
        </nav>
    );
};

export default TaskbarTop;
 