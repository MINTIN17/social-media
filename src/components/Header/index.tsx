import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import HoverDiv from '../HoverDiv';
import axios from 'axios';
import { debounce } from 'lodash';

const cx = classNames.bind(styles);

function Header() {
    const [searchResults, setSearchResults] = useState<any[]>([]);

    const navigate = useNavigate(); // Hook để điều hướng

    const DiaryPage = () => {
        navigate('/diary');
    };

    const HomePage = () => {
        navigate('/Home');
    };

    const FriendList = () => {
        navigate('/friendlist');
    };

    const ProfilePage = () => {
        navigate('/profile');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value; 
        handleSearch(value); 
    };

    const handleSearch = debounce(async (query: string) => {
        setSearchResults([]);
        if (query.length > 0) {

            try {
                let response; 
                if (!query.startsWith('#')) {
                    const payload = {
                        partialName: query
                    };
                    response = await axios.post(`${process.env.REACT_APP_link_server}/account/search`, payload);
                    setSearchResults(response.data.slice(0,3));
                    console.log(searchResults);
                }

            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        }
    }, 300); // Adjust debounce time as needed

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
                    <input type="text" id="name" name="name" placeholder="Tìm kiếm trên Trinity" onChange={handleInputChange}/>
                    <img src='/asset/icon/search.svg' alt='search-icon' className={cx('search-icon')}/>

                    {/* Div ẩn hiển thị kết quả tìm kiếm */}
                {searchResults.length > 0 && (
                    <div className={cx('search-results')}>
                        {searchResults.map((result, index) => (
                            
                            <div key={index} className={cx('result-item')}>
                                <div className='user'>{result.username}</div>
                                {result.name}
                            </div>
                        ))}
                    </div>
                )}
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
