import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Login from './login';
import Register from './register';
import Taskbar from '../../components/TaskbarTop';

const cx = classNames.bind(styles);


const LoginPage: React.FC = () => {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);

    // Function to handle the register button click
    const handleRegisterClick = () => {
        setIsRightPanelActive(true);
    };

    // Function to handle the login button click
    const handleLoginClick = () => {
        setIsRightPanelActive(false);
    };



    return (
        <div className={cx('containers')}>
            {/* <Taskbar /> */}
            <div className={cx('login-body')}>
                <div className={cx('container', { 'right-panel-active': isRightPanelActive })} id="container">
                    <Login />
                    <Register />
                    <div className={cx('overlay-container')}>
                        <div className={cx('overlay')}>
                            <div className={cx('overlay-panel', 'overlay-left')}>
                                <h1 className={cx('title')}>
                                    Xin chào <br /> bạn tôi
                                </h1>
                                <p className={cx('note')}>Nếu đã có tài khoản, hãy đăng nhập và cùng giao lưu nào</p>
                                <button className={cx('btnLo', 'ghost')} onClick={handleLoginClick}>
                                    Đăng nhập
                                    <i className={cx('lni', 'lni-arrow-left', 'login')}></i>
                                </button>
                            </div>
                            <div className={cx('overlay-panel', 'overlay-right')}>
                                <h1 className={cx('title')}>
                                    Bắt đầu <br /> kỉ niệm <br/>của bạn
                                </h1>
                                <p className={cx('note')}>
                                    Nếu chưa có tài khoản, vui lòng đăng ký tại đây.
                                </p>
                                <button className={cx('btnLo', 'ghost')} onClick={handleRegisterClick}>
                                    Đăng ký
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
