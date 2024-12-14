import React from 'react';
import { successNotification, errorNotification, warningNotification } from '../Notification/index';
import Styles from './friendRequests.module.scss';

interface Friend {
    id: number;
    name: string;
    avatar: string;
}

const friends: Friend[] = [
    { id: 1, name: 'Nguyen Duc Thang', avatar: `${process.env.PUBLIC_URL}/asset/img/avt1.jfif` },
    { id: 2, name: 'Nguyen Duc Thang', avatar: `${process.env.PUBLIC_URL}/asset/img/avt2.jpg` },
    { id: 3, name: 'Nguyen Duc Thang', avatar: `${process.env.PUBLIC_URL}/asset/img/avt3.jpg` },
    { id: 4, name: 'Nguyen Duc Thang', avatar: `${process.env.PUBLIC_URL}/asset/img/avt4.jpg` },
];

const ContentFriend: React.FC = () => {

    const handleConfirm = (friendName: string) => {
      successNotification(`Bạn đã chấp nhận lời yêu cầu kết bạn của ${friendName}`);
    };

    const handleCancel = (friendName: string) => {
      errorNotification(`Bạn đã hủy lời yêu cầu kết bạn của ${friendName}`);
  };

    return (
        <div>
            <div className={Styles.containerListFe}>
                <div className={Styles.headList}>
                    <p className={Styles.nameList}>Lời mời kết bạn</p>
                    <p className={Styles.numberList}>{friends.length} Lời mời</p>
                </div>
                <div className={Styles.userListFr}>
                    {friends.map(friend => (
                        <div className={Styles.iconFr} key={friend.id}>
                            <img src={friend.avatar} alt={`avatar-${friend.id}`} className={Styles.imgListFr} />
                            <p className={Styles.nameListFr}>{friend.name}</p>
                            <button 
                              className={Styles.btnItemFr}
                              onClick={() => handleConfirm(friend.name)}
                            >
                                Xem thông tin
                            </button>
                            <button 
                              className={Styles.btnItemPr}
                              onClick={() => handleCancel(friend.name)}
                            >
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
