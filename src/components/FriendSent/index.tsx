import React, { useEffect, useState } from 'react';
import { successNotification, errorNotification } from '../Notification/index';
import Styles from './friendRequests.module.scss';
import axios from 'axios';

interface Friend {
    id: string;
    username: string;
    imageUrl: string;
}

const ContentFriend: React.FC = () => {
    const [friends, setFriends] = useState<Friend[]>([]);

    const getFriendRequest = async () => {
        try {
            const id = localStorage.getItem('userId');
            const response = await axios.get(`${process.env.REACT_APP_link_server}/account/list-friend-sent/${id}`);
            const data: Friend[] = response.data;
            setFriends(data); // Cập nhật state với danh sách bạn bè
            console.log(data);
        } catch (error) {
            console.error('Error fetching friend requests:', error);
        }
    };


    useEffect(() => {
        getFriendRequest();
    }, []);

    return (
        <div>
            <div className={Styles.containerListFe}>
                <div className={Styles.headList}>
                    <p className={Styles.nameList}>Lời mời kết bạn</p>
                    <p className={Styles.numberList}>{friends.length} Lời mời</p>
                </div>
                <div className={Styles.userListFr}>
                    {friends.map((friend) => (
                        <div className={Styles.iconFr} key={friend.id}>
                            <img src={friend.imageUrl} alt={`avatar-${friend.id}`} className={Styles.imgListFr} />
                            <p className={Styles.nameListFr}>{friend.username}</p>
                            <button className={Styles.btnItemFr}>
                                Hủy lời mời kết bạn
                            </button>
                            <button className={Styles.btnItemPr}>
                                Xem thông tin
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ContentFriend;
function setButtonState(arg0: string) {
    throw new Error('Function not implemented.');
}

