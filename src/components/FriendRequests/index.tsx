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

    const handleConfirm = () => {
        successNotification(`Bạn đã chấp nhận lời yêu cầu kết bạn`);
    };

    const handleCancel = () => {
        errorNotification(`Bạn đã hủy lời yêu cầu kết bạn`);
    };

    const getFriendRequest = async () => {
        try {
            const id = localStorage.getItem('userId');
            const response = await axios.get(`${process.env.REACT_APP_link_server}/account/list-friend_request/${id}`);
            const data: Friend[] = response.data;
            setFriends(data); // Cập nhật state với danh sách bạn bè
            console.log(data);
        } catch (error) {
            console.error('Error fetching friend requests:', error);
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
            if (message === "Xóa bạn thành công")
                setButtonState("send");
            console.log(message);
            handleCancel();
        } catch (error) {
            console.error('Lỗi kiểm tra trạng thái bạn bè:', error);
        } finally {
            window.location.reload();
        }
    };

    const handleSendFriendConfirm = async (id: string) => {
        try {
            const currentUserId = localStorage.getItem('userId');

            const response = await axios.put(`${process.env.REACT_APP_link_server}/account/confirm-friend`, {
                friendId: id,
                userId: currentUserId,
            });

            const message = response.data;
            handleConfirm();
        } catch (error) {
            console.error('Lỗi kiểm tra trạng thái bạn bè:', error);
        } finally {
            window.location.reload();
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
                            <img src={friend.imageUrl != "" ? friend.imageUrl : '/asset/img/avatar.jpg'} alt={`avatar-${friend.id}`} className={Styles.imgListFr} />
                            <p className={Styles.nameListFr}>{friend.username}</p>
                            <button className={Styles.btnItemFr} onClick={() => handleSendFriendConfirm(friend.id)}>
                                Xác nhận
                            </button>
                            <button className={Styles.btnItemPr} onClick={() => handleRemoveFriendRequest(friend.id)}>
                                Hủy
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

