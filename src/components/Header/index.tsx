import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import HoverDiv from '../HoverDiv';

const cx = classNames.bind(styles);

function Header() {
    const navigate = useNavigate(); // Hook để điều hướng

    const DiaryPage = () => {
        navigate('/diary');
    };

    const HomePage = () => {
        navigate('/Home');
    };

    const FriendList = () => {
        navigate('/friend');
    };

    const ProfilePage = () => {
        navigate('/profile');
    };

    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        const userName = localStorage.getItem('userName');

        if (userName) {
            setUserName(userName); // Lấy tên người dùng từ localStorage
        }
    }, []);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('part_1')}>
                <div className={cx('logo')}>Trinity</div>
                <div className={cx('search')}>
                    <input type="text" id="name" name="name" placeholder="Tìm kiếm trên Trinity" />
                    <img src='/asset/icon/search.svg' alt='search-icon' className={cx('search-icon')}/>
                </div>
            </div>
            <div className={cx('part_2')}>
                <div className={cx('menu')}>
                    <HoverDiv hoverText="Trang chủ">
                        <div className={cx('menu-item')} onClick={HomePage}>
                            <img src="/asset/icon/home.svg" alt="home-icon" className={cx('menu-icon')} />
                        </div>
                    </HoverDiv>
                    <HoverDiv hoverText="Bạn bè">
                        <div className={cx('menu-item')} onClick={FriendList}>
                            <img src="/asset/icon/friend.svg" alt="friend-icon" className={cx('menu-icon')} />
                        </div>
                    </HoverDiv>
                    <HoverDiv hoverText="Nhật ký">
                        <div className={cx('menu-item')} onClick={DiaryPage}>
                            <img src="/asset/icon/diary.svg" alt="diary-icon" className={cx('menu-icon')} />
                        </div>
                    </HoverDiv>
                    <HoverDiv hoverText="Thông báo">
                        <div className={cx('menu-item')}>
                            <img
                                src="/asset/icon/notification.svg"
                                alt="notification-icon"
                                className={cx('menu-icon')}
                            />
                        </div>
                    </HoverDiv>
                    <HoverDiv hoverText="Tin nhắn">
                        <div className={cx('menu-item')}>
                            <img src="/asset/icon/message.svg" alt="message-icon" className={cx('menu-icon')} />
                        </div>
                    </HoverDiv>
                </div>
            </div>
            <div className={cx('part_3')}>
                <div className={cx('name')}>
                    <p>
                        <span>{userName}</span>
                    </p>
                </div>
                <HoverDiv hoverText="Tài khoản">
                    <div className={cx('avtar')} onClick={ProfilePage}>
                        <img src="/asset/img/avatar.jpg" alt="group-img" className={cx('img-avatar')} />
                    </div>
                </HoverDiv>
            </div>
        </header>
    );
}

export default Header;
