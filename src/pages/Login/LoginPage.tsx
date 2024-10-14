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
            <Taskbar />
            <div className={cx('login-body')}>
                <div className={cx('container', { 'right-panel-active': isRightPanelActive })} id="container">
                    <Login />
                    <Register />
                    <div className={cx('overlay-container')}>
                        <div className={cx('overlay')}>
                            <div className={cx('overlay-panel', 'overlay-left')}>
                                <h1 className={cx('title')}>
                                    Hello <br /> friends
                                </h1>
                                <p className={cx('note')}>If you have an account, login here and have fun</p>
                                <button className={cx('btnLo', 'ghost')} onClick={handleLoginClick}>
                                    Login
                                    <i className={cx('lni', 'lni-arrow-left', 'login')}></i>
                                </button>
                            </div>
                            <div className={cx('overlay-panel', 'overlay-right')}>
                                <h1 className={cx('title')}>
                                    Start your <br /> journey now
                                </h1>
                                <p className={cx('note')}>
                                    If you don't have an account yet, join us and start your journey.
                                </p>
                                <button className={cx('btnLo', 'ghost')} onClick={handleRegisterClick}>
                                    Sign Up
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
