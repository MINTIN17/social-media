import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles)

interface friend_request{
    id : string,
    username: string,
    imageUrl: string
}

function Sidebar() {
    const navigate = useNavigate();
    const [list_friend, setListFriend] = useState<friend_request[]>();

    const GetListUser = async () : Promise<friend_request[]| null> => {
        try {
            const currentUserId = localStorage.getItem('userId');
            const response = await axios.get(`${process.env.REACT_APP_link_server}/account/list-friend/${currentUserId}`);
            const data = response.data;
            console.log(data);
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await GetListUser(); 
            if (data) {
                setListFriend(data);
            }
        };
        fetchData();
    }, []);

    const handleSendFriendConfirm = async (id: string) => {
        try {
            const currentUserId = localStorage.getItem('userId');

            const response = await axios.put(`${process.env.REACT_APP_link_server}/account/confirm-friend`, {
                friendId: id,
                userId: currentUserId,
            });

            const message = response.data;
        } catch (error) {
            console.error('Lỗi kiểm tra trạng thái bạn bè:', error);
        } finally{
            window.location.reload();
        }
    };

    const handleRemoveFriendRequest = async (id: string) => {
        try {
            const currentUserId = localStorage.getItem('userId');

            const response = await axios.put(`${process.env.REACT_APP_link_server}/account/remove-friend-invite`, {
                friendId: id,
                userId: currentUserId,
            });

            const message = response.data;
            console.log(message);

        } catch (error) {
            console.error('Lỗi kiểm tra trạng thái bạn bè:', error);
        } finally {
            window.location.reload();
        }
    };

    const handleProfilePage = () => {
        navigate('/friend');
    };

    const ProfileUser = (id: string)  => {
        navigate(`/profile/${id}`);
    };

    return <aside className={cx('wrapper')}>
        
        <div className={cx('menu')}>
            <div className={cx('invite-fr')}>
                <div> Lời mời kết bạn</div>
                <div className={cx('more')} onClick={handleProfilePage}>
                    Xem tất cả
                </div>
                
            </div>
            <div className={cx('line')}></div>
            {list_friend?.slice(0, 2).map((friend, index) => (
                <div key={friend.id} className={cx('friend-makers')}>
                    <div className={cx('avatar')} onClick={() =>ProfileUser(friend.id)}>
                        <img 
                            src={friend.imageUrl } 
                            alt='avatar-img' 
                            className={cx('avatar-img')} 
                        />
                    </div>
                    <div className={cx('infor')}>
                        <div className={cx('name-time')}>
                            <div className={cx('name')}>{friend.username}</div>
                            <div className={cx('time')}>1 tuần</div> {/* Thời gian mặc định */}
                        </div>
                        <div className={cx('acp-ref')}>
                            <div className={cx('acp')} onClick={() =>handleSendFriendConfirm(friend.id)}>Xác nhận</div>
                            <div className={cx('refuse')} onClick={() =>handleRemoveFriendRequest(friend.id)}>Hủy</div>
                        </div>
                    </div>
                </div>
            ))}
            <div className={cx('read-more')} onClick={handleProfilePage}>XEM THÊM</div>
        </div>

        <div className={cx('friend')}>
            <div className={cx('header')}>
                <div style={{padding: 10}}>Người liên hệ</div>
                <img src='/asset/icon/search.svg' alt='search-icon' className={cx('search-icon')}/>
            </div>
            <div className={cx('line')}></div>
        </div>
        

    </aside>
}

export default Sidebar;