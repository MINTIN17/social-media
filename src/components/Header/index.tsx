import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import HoverDiv from '../HoverDiv';
import axios from 'axios';
import { debounce, result } from 'lodash';
import { Flex } from 'antd';

const cx = classNames.bind(styles);

function Header() {
    const [searchResults, setSearchResults] = useState<any[]>([]);

    const navigate = useNavigate();

    // function ViewProfile (id : string): {
        
    // }

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
                    setSearchResults(response.data);
                    console.log(searchResults);
                }

            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        }
    }, 300); // Adjust debounce time as needed

    const [userName, setUserName] = useState<string | null>(null);
    const [avatar, setAvatar] = useState<string>();

    useEffect(() => {
        const userName = localStorage.getItem('userName');
        const avatar = localStorage.getItem('avatar');

        if (userName) {
            setUserName(userName); // Lấy tên người dùng từ localStorage
        }
        if(avatar){
            setAvatar(avatar)
        }
    }, []);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('part_1')}>
                <div className={cx('logo')}>Trinity</div>
                <div className={cx('search')}>
                    <div className={cx('search-bar', { 'expanded': searchResults.length > 0 })}>
                        <input type="text" id="name" name="name" placeholder="Tìm kiếm trên Trinity" onChange={handleInputChange}/>
                        <img src='/asset/icon/search.svg' alt='search-icon' className={cx('search-icon')}/>
                        {searchResults.length > 0 && (
                            <div className={cx('search-results')}>
                                {searchResults.slice(0, 5).map((result, index) => (                            
                                    <div key={index} className={cx('result-item')} style={{display: 'flex', flexDirection: 'row', alignItems:'center'}}
                                    onClick={() => navigate(`/profile/${result._id}`)}>
                                        <div className={cx('result-avatar')}>
                                            <img  
                                                src={result.image || '/asset/img/avatar.jpg'}
                                                alt="img-avatar" 
                                                className={cx('img-avatar')} 
                                                style={{width: 30, height: 30, borderRadius: '50%'}}
                                                />
                                            
                                        </div>
                                        <div className='user' style={{marginLeft: 30}} key={index}>{result.username}</div>
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
