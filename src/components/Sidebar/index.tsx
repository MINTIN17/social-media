import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles)
interface Friend {
    id: number;
    username: string;
    imageUrl: string;
}
interface friend_request {
    id: string,
    username: string,
    imageUrl: string
}

function Sidebar() {
    const navigate = useNavigate();
    const [list_friend, setListFriend] = useState<friend_request[]>();
    const [friends, setFriends] = useState<Friend[]>([]);
    const [connection, setConnection] = useState<WebSocket>();

    const GetListUser = async (): Promise<friend_request[] | null> => {
        try {
            const currentUserId = localStorage.getItem('userId');
            const response = await axios.get(`${process.env.REACT_APP_link_server}/account/list-friend_request/${currentUserId}`);
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
                console.log(data)
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

            if(id != null && currentUserId != null)
                sendNotification(id, currentUserId);

            const message = response.data;
        } catch (error) {
            console.error('Lỗi kiểm tra trạng thái bạn bè:', error);
        } finally {
            window.location.reload();
        }
    };

    const sendNotification = async (id: string, currentUserId: string) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_link_server}/notification`, {
                receiver_id: id,
                type: "acceptFriend",
                content: "đã chấp nhận lời mời kết bạn",
                link_user: currentUserId
            });
            
    
            const notificationData = {
                ...res.data,
                type: "notification",
            };
    
            if (connection && connection.readyState === WebSocket.OPEN) {
                connection.send(JSON.stringify(notificationData));

            } else {
                console.error("WebSocket connection is not open. Notification not sent.");
            }
        } catch (err) {
            console.error("Error sending notification:", err);
        }
    };

    useEffect(() => {
        const wsConnection = new WebSocket('ws://localhost:5000');
    
        wsConnection.onopen = () => {
            const userId = localStorage.getItem('userId');
            if (userId) {
                wsConnection.send(JSON.stringify({ type: 'clientId', clientId: userId }));
            }
        };
    
        wsConnection.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Received:', data);
        };
    
        wsConnection.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };
    
        setConnection(wsConnection); // Lưu trữ kết nối WebSocket trong state
    
        return () => {
            if (wsConnection.readyState === WebSocket.OPEN) {
                wsConnection.close();
            }
        };
    }, []);

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

    const ProfileUser = (id: string) => {
        navigate(`/profile/${id}`);
    };

    const getFriendList = async () => {
        try {
            const id = localStorage.getItem('userId');
            const response = await axios.get(`${process.env.REACT_APP_link_server}/account/list-friend/${id}`);
            const data: Friend[] = response.data;
            setFriends(data); // Cập nhật state với danh sách bạn bè
            console.log(data);
        } catch (error) {
            console.error('Error fetching friend requests:', error);
        }
    };

    const handleMessage = async (id: string) => {
        try {
            const currentUserId = localStorage.getItem('userId');

            const response = await axios.post(`${process.env.REACT_APP_link_server}/conversation`, {
                user_id_1: id,
                user_id_2: currentUserId,
            }).then(res => {
                navigate(`/message/${res?.data._id}`)

            });
        } catch (error) {
            console.error('Lỗi kiểm tra trạng thái bạn bè:', error);
        } finally {
        }
    };

    useEffect(() => {
        getFriendList();
    }, []);

    return <aside className={cx('wrapper')}>

        <div className={cx('menu')}>
            <div className={cx('invite-fr')}>
                <div> Lời mời kết bạn</div>
                <div className={cx('more')} onClick={handleProfilePage}>
                    Xem tất cả
                </div>

            </div>
            <div className={cx('line')}></div>
            {list_friend != null && list_friend?.length > 0 ?
                <><div>

                    {list_friend?.slice(0, 2).map((friend: any) => (
                        <div key={friend.id} className={cx('friend-makers')}>
                            <div className={cx('avatar')} onClick={() => ProfileUser(friend.id)}>
                                <img
                                    src={friend?.imageUrl !== "" ? friend.imageUrl : "/asset/img/avatar.jpg"}
                                    alt='avatar-img'
                                    className={cx('avatar-img')} />
                            </div>
                            <div className={cx('infor')}>
                                <div className={cx('name-time')}>
                                    <div className={cx('name')}>{friend.username}</div>
                                    <div className={cx('time')}>1 tuần</div> {/* Thời gian mặc định */}
                                </div>
                                <div className={cx('acp-ref')}>
                                    <div className={cx('acp')} onClick={() => handleSendFriendConfirm(friend.id)}>Xác nhận</div>
                                    <div className={cx('refuse')} onClick={() => handleRemoveFriendRequest(friend.id)}>Hủy</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div><div className={cx('read-more')} onClick={handleProfilePage}>XEM THÊM</div></>
                : <div style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    height: "100%",
                    alignItems: "center",
                    color: "gray"
                }}> Không có lời mời kết bạn nào</div>
            }
        </div>

        <div className={cx('friend')}>
            <div className={cx('header')}>
                <div style={{ padding: 10 }}>Người liên hệ</div>
                {/* <img src='/asset/icon/search.svg' alt='search-icon' className={cx('search-icon')} /> */}
            </div>
            <div className={cx('line')}></div>
            <div style={{
                width: "100%", height: "100%", padding: " 10px", display: "flex",
                flexDirection: "column",
                gap: "5px"
            }}>
                {friends.map((friend) => (
                    <div key={friend.id} className={cx('friend-item')}
                        style={{
                            display: "flex",
                            gap: "20px",
                            alignItems: "center"
                        }}
                        onClick={() => handleMessage(friend.id.toString())}
                        >
                        <div className={cx('avatar')} onClick={() => ProfileUser(friend.id.toString())}>
                            <img
                                src={friend.imageUrl !== '' ? friend.imageUrl : '/asset/img/avatar.jpg'}
                                alt="avatar-img"
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "100%",
                                }}
                            />
                        </div>
                        <div className={cx('info')}>
                            <div className={cx('name')}>{friend.username}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>


    </aside>
}

export default Sidebar;