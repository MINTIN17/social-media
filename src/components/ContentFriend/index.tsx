import React, { useEffect, useState } from 'react';
import Styles from "./ContentFriend.module.scss";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Friend {
    id: number;
    username: string;
    imageUrl: string;
}

const ContentFriend: React.FC = () => {
    const navigate = useNavigate();
    const [friends, setFriends] = useState<Friend[]>([]);


    const handleProfilePage = () => {
        navigate('/profile');
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

    return (
        <div>
            <div className={Styles.containerListFe}>
                <div className={Styles.headList}>
                    <p className={Styles.nameList}>Danh sách bạn bè hiện có</p>
                    <p className={Styles.numberList}>{friends.length} Người bạn</p>
                </div>
                <div className={Styles.userListFr}>
                    {friends.map(friend => (
                        <div className={Styles.iconFr} key={friend.id}>
                            <img src={friend.imageUrl != "" ? friend.imageUrl : '/asset/img/avatar.jpg'} alt={`avatar-${friend.id}`} className={Styles.imgListFr} />
                            <p className={Styles.nameListFr}>{friend.username}</p>
                            <button className={Styles.btnItemFr} onClick={() => handleMessage(friend.id.toString())}>Nhắn tin</button>
                            <button className={Styles.btnItemPr} onClick={handleProfilePage}>Xem trang cá nhân</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ContentFriend;
