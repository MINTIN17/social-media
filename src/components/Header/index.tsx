import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


const cx = classNames.bind(styles);

function Header() { 
    const navigate = useNavigate(); // Hook để điều hướng

    const DiaryPage = () => {
        navigate("/diary");
    }

    const HomePage = () => {
        navigate("/Home");
    }

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
                <div className={cx('logo')}>
                    Trinity
                </div>
                <div className={cx('search')}>
                    <input type="text" id="name" name="name" placeholder="Tìm kiếm trên Trinity" />
                    <i className={cx('search-icon')}>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path fillRule="evenodd" clipRule="evenodd" d="M15 10.5C15 12.9853 12.9853 15 10.5 15C8.01472 15 6 12.9853 6 10.5C6 8.01472 8.01472 6 10.5 6C12.9853 6 15 8.01472 15 10.5ZM14.1793 15.2399C13.1632 16.0297 11.8865 16.5 10.5 16.5C7.18629 16.5 4.5 13.8137 4.5 10.5C4.5 7.18629 7.18629 4.5 10.5 4.5C13.8137 4.5 16.5 7.18629 16.5 10.5C16.5 11.8865 16.0297 13.1632 15.2399 14.1792L20.0304 18.9697L18.9697 20.0303L14.1793 15.2399Z" fill="#818387"></path>
                            </g>
                        </svg>
                    </i>
                </div>
            </div>
            <div className={cx('part_2')}>
                <div className={cx('menu')}>
                    <div className={cx('menu-item')} onClick={HomePage}>
                        <img src="/asset/icon/home.svg" alt="home-icon" className={cx('menu-icon')} 
                        />
                    </div>
                    <div className={cx('menu-item')}>
                        <img src="/asset/icon/friend.svg" alt="friend-icon" className={cx('menu-icon')} />
                    </div>
                    <div className={cx('menu-item')} onClick={DiaryPage}>
                        <img src="/asset/icon/diary.svg" alt="diary-icon" className={cx('menu-icon')} />
                    </div>
                    <div className={cx('menu-item')}>
                        <img src="/asset/icon/notification.svg" alt="notification-icon" className={cx('menu-icon')} />
                    </div>
                    <div className={cx('menu-item')}>
                        <img src="/asset/icon/message.svg" alt="message-icon" className={cx('menu-icon')} />
                    </div>
                </div>
            </div>
            <div className={cx('part_3')}>
                <div className={cx('name')}>
                    <p><span>{ userName }</span></p>
                </div>
                <div className={cx('avtar')}>
                    <img src="/asset/img/avatar.jpg" alt="group-img" className={cx('img-avatar')} />
                </div>
                
                
            </div> 

        </header>
    );
}



export default Header;
