import React from 'react';
import Styles from "./ContentFriend.module.scss";

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

    return (
        <div>
            <div className={Styles.containerListFe}>
                <div className={Styles.headList}>
                    <p className={Styles.nameList}>Danh sach ban be hien co</p>
                    <p className={Styles.numberList}>{friends.length} Nguoi ban</p>
                </div>
                <div className={Styles.userListFr}>
                    {friends.map(friend => (
                        <div className={Styles.iconFr} key={friend.id}>
                            <img src={friend.avatar} alt={`avatar-${friend.id}`} className={Styles.imgListFr} />
                            <p className={Styles.nameListFr}>{friend.name}</p>
                            <button className={Styles.btnItemFr}>Nhan tin</button>
                            <button className={Styles.btnItemPr}>Xem trang ca nhan</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ContentFriend;
