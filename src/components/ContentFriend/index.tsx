import React from 'react';
import Styles from "./ContentFriend.module.scss";
import { useNavigate } from 'react-router-dom';

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
    { id: 5, name: 'Nguyen Duc Thang', avatar: `${process.env.PUBLIC_URL}/asset/img/avt5.jfif` },
    { id: 6, name: 'Nguyen Duc Thang', avatar: `${process.env.PUBLIC_URL}/asset/img/avt1.jfif` },
    { id: 7, name: 'Nguyen Duc Thang', avatar: `${process.env.PUBLIC_URL}/asset/img/avt1.jfif` },
];

const ContentFriend: React.FC = () => {
    const navigate = useNavigate();

    const handleProfilePage = () => {
        navigate('/profile');
    };

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
                            <img src={friend.avatar} alt={`avatar-${friend.id}`} className={Styles.imgListFr} />
                            <p className={Styles.nameListFr}>{friend.name}</p>
                            <button className={Styles.btnItemFr}>Nhắn tin</button>
                            <button className={Styles.btnItemPr} onClick={handleProfilePage}>Xem trang cá nhân</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ContentFriend;
