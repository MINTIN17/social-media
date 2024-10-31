import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Message.module.scss';

const cx = classNames.bind(styles);

const Message: React.FC = () => {
    

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('avatar')}>
                    <img src="/asset/img/avatar.jpg" alt="avatar-img" className={cx('avatar-img')} />
                </div>
                <div className={cx('name')}>
                    Minh Tin
                </div>
                <div className={cx('detail')}>
                    <img src='/asset/icon/other.svg' alt='other-icon' />
                </div>
                {/* <div className={cx('detail')}></div>  */}
            </div>
        </div>
    );
};
export default Message;