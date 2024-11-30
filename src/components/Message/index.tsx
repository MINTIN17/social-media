import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Message.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages, faPaperPlane, faXmark, faPlus } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const Message: React.FC = () => {
    const [isMinimized, setIsMinimized] = useState(false); // state to manage minimized view
    const [isClosed, setIsClosed] = useState(false); // state to manage close action

    // Toggle minimized state
    const handleMinimize = () => {
        setIsMinimized(!isMinimized);
    };

    // Handle close action (hide the component)
    const handleClose = () => {
        setIsClosed(true);
    };

    if (isClosed) {
        return null;
    }

    return (
        <div className={cx('wrapper', { minimized: isMinimized })}>
            <div className={cx('headerMe')}>
                <div className={cx('iconMe')}>
                    <img
                        src={`${process.env.PUBLIC_URL}/asset/img/imghome1.png`}
                        alt="imghome1"
                        className={cx('imgHo')}
                    />
                    <p className={cx('nameMe')}>Tao la bo may</p>
                </div>
                <div className={cx('iconMe')}>
                    <button className={cx('btnMini')} onClick={handleMinimize}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <div className={cx('closeMe')} onClick={handleClose}>
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                </div>
            </div>
            <div className={cx('containMes')}>
                {/* Nội dung tin nhắn */}
            </div>
            <div className={cx('botomMes')}>
                <button className={cx('btnSend')}>
                    <FontAwesomeIcon icon={faImages} className={cx('iconBot1')} />
                </button>
                <input
                    type="text"
                    placeholder="Nhập tin nhắn"
                    className={cx('textMes')}
                />
                <button className={cx('btnSend')}>
                    <FontAwesomeIcon icon={faPaperPlane} className={cx('iconBot1')} />
                </button>
            </div>
        </div>
    );
};

export default Message;
