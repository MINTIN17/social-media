import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import HoverDiv from '../HoverDiv';
import axios from 'axios';
import { debounce, delay } from 'lodash';
import { TIMEOUT } from 'dns';
import { useLocation } from 'react-router-dom'; 

const cx = classNames.bind(styles);

function Header() {
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [selected, setSelected] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const DiaryPage = () => {
        navigate('/calendar');
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value; 
        handleSearch(value); 
    };

    const handleSearch = debounce(async (query: string) => {
        setSearchResults([]);  // Clear previous results
        if (query.length > 0) {
            const userId = localStorage.getItem('userId');
            try {
                let response; 
                if (!query.startsWith('#')) {
                    const payload = {
                        partialName: query,
                        selfId: userId,
                    };
                    response = await axios.post(`${process.env.REACT_APP_link_server}/account/search`, payload);
                    setSearchResults(response.data);
                    console.log(response.data);  // Log the fetched results
                }
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        }
    }, 300); // Debounced search

    const [userName, setUserName] = useState<string | null>(null);
    const [avatar, setAvatar] = useState<string | undefined>(undefined);

    useEffect(() => {
        const userName = localStorage.getItem('userName');
        const avatar = localStorage.getItem('avatar');
        if (userName) {
            setUserName(userName); // Get username from localStorage
        }
        if (avatar) {
            setAvatar(avatar); // Get avatar from localStorage
        }
    }, []);

    const handleSearchResultClick = (id: string) => {
        setSearchResults([]);
        navigate(`/profile/${id}`);
    };

    useEffect(() => {
        // Theo dõi sự thay đổi của URL và cập nhật selected
        switch (location.pathname) {
            case '/friend':
            case '/friend/friendlist':
            case '/friend/friendRequests':
            case '/friend/friendsent':
                setSelected('friend');
                break;
            case '/calendar':
                setSelected('diary');
                break;
            case '/Home':
                setSelected('home');
                break;
            default:
                setSelected('');
        }
    }, [location.pathname]);

    const handleMenuClick = (menu: string) => {
        setSelected(menu); 
        console.log(selected);
        switch (menu) {
            case 'home':
                HomePage();
                break;
            case 'friend':
                FriendList();
                break;
            case 'diary':
                DiaryPage();
                break;
            default:
                break;
        }
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('part_1')}>
                <div className={cx('logo')} onClick={() => handleMenuClick('home')}>Trinity</div>
                <div className={cx('search')}>
                    <div className={cx('search-bar', { 'expanded': searchResults.length > 0 })}>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            placeholder="Tìm kiếm trên Trinity" 
                            onChange={handleInputChange}
                        />
                        <img src='/asset/icon/search.svg' alt='search-icon' className={cx('search-icon')}/>
                        {searchResults.length > 0 && (
                            <div className={cx('search-results')}>
                                {searchResults.slice(0, 5).map((result, index) => (
                                    <div 
                                        key={index} 
                                        className={cx('result-item')}
                                        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                                        onClick={() => handleSearchResultClick(result._id)}
                                    >
                                        <div className={cx('result-avatar')}>
                                            <img  
                                                src={result.image || '/asset/img/avatar.jpg'}
                                                alt="img-avatar" 
                                                className={cx('img-avatar')} 
                                                style={{ width: 30, height: 30, borderRadius: '50%' }}
                                            />
                                        </div>
                                        <div className='user' style={{ marginLeft: 30 }}>
                                            {result.username}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>    
            </div>
            <div className={cx('part_2')}>
                <div className={cx('menu')}>
                    <HoverDiv hoverText="Trang chủ">
                        <div 
                            className={cx('menu-item', { 'selected': selected === 'home' })} 
                            onClick={() => handleMenuClick('home')}
                        >
                            <img src="/asset/icon/home.svg" alt="home-icon" className={cx('menu-icon')} />
                        </div>
                    </HoverDiv>
                    <HoverDiv hoverText="Bạn bè">
                        <div 
                            className={cx('menu-item', { 'selected': selected === 'friend' })} 
                            onClick={() => handleMenuClick('friend')}
                        >
                            <img src="/asset/icon/friend.svg" alt="friend-icon" className={cx('menu-icon')} />
                        </div>
                    </HoverDiv>
                    <HoverDiv hoverText="Nhật ký">
                        <div 
                            className={cx('menu-item', { 'selected': selected === 'diary' })} 
                            onClick={() => handleMenuClick('diary')}
                        >
                            <img src="/asset/icon/diary.svg" alt="diary-icon" className={cx('menu-icon')} />
                        </div>
                    </HoverDiv>
                    <HoverDiv hoverText="Thông báo">
                        <div className={cx('menu-item', { 'selected': selected === 'notification' })}>
                            <img
                                src="/asset/icon/notification.svg"
                                alt="notification-icon"
                                className={cx('menu-icon')}
                            />
                        </div>
                    </HoverDiv>
                    <HoverDiv hoverText="Tin nhắn">
                        <div className={cx('menu-item', { 'selected': selected === 'message' })}>
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
                        <img 
                            src={avatar || '/asset/img/avatar.jpg'} 
                            alt="img-avatar" 
                            className={cx('img-avatar')} 
                        />
                    </div>
                </HoverDiv>
            </div>
        </header>
    );
}

export default Header;
