import { message } from "antd";
import React, { useEffect, useState } from 'react';
import { notification } from 'antd';
import styles from './Notification.module.scss';
import axios from 'axios';
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

// Định nghĩa kiểu cho tham số message1
export const successNotification = (message1: string): void => {
    message.success(message1);
};

export const errorNotification = (message1: string): void => {
    message.error(message1);
};

export const warningNotification = (message1: string): void => {
    message.warning(message1);
};

interface notification{
    receiver_id: string;  
    content: string;
    type: string;
    link_comment: string;
    link_post: string;       
    link_user: link_user_infor;
}

interface NotificationProps {
    visible: boolean;
    onClose: () => void;
}

interface link_user_infor {
    _id: string;
    username: string;
    image: string;
}

const Notification = () => {
    const user_id = localStorage.getItem("userId");
    const [notifications, setnotifications] = useState<notification[]>([]);
    const [viewMode, setViewMode] = useState<"new" | "all">("new");
    const navigate = useNavigate();
    
    const fetchNotifications = async () => {
        try {
            const response = await axios.get<notification[]>(`${process.env.REACT_APP_link_server}/notification/${user_id}`);
            setnotifications(response.data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const visibleNotifications = viewMode === "new" ? notifications.slice(0, 5) : notifications;
    const LinkClick = (id: string, type: string) => {
        if (type === "addFriend" || type === "acceptFriend")
            navigate(`/profile/${id}`);
    };
    return (
        <div className={cx('notification')}
            style={{padding: '10px'}}
        >
            <div className={cx('header')}
                style={{fontSize: 20, fontWeight: 600, padding: '10px'}}
            >
                Thông báo
            </div>
            <div
                className={cx("type")}
                style={{
                    display: "flex",
                    flexDirection: "row",
                    fontSize: 17,
                    marginBottom: "10px",
                }}
            >
                <div
                    className={cx("new", { active: viewMode === "new" })}
                    style={{
                        padding: 10,
                        backgroundColor: viewMode === "new" ? "#3c8ddf" : "#e0e0e0",
                        borderRadius: 10,
                        marginRight: 10,
                        cursor: "pointer",
                    }}
                    onClick={() => setViewMode("new")}
                >
                    Mới nhất
                </div>
                <div
                    className={cx("all", { active: viewMode === "all" })}
                    style={{
                        padding: 10,
                        backgroundColor: viewMode === "all" ? "#549ae0" : "#e9e9e9",
                        borderRadius: 10,
                        cursor: "pointer",
                    }}
                    onClick={() => setViewMode("all")}
                >
                    Xem tất cả
                </div>
            </div>
            <div
                className={cx("notification-list")}
                style={{
                    maxHeight: viewMode === "all" ? "300px" : "auto",
                    overflowY: viewMode === "all" ? "scroll" : "hidden",
                }}
            >
                {visibleNotifications.length > 0 ? (
                    <ul>
                        {visibleNotifications.map((notification, index) => (
                            <li
                                key={index}
                                style={{
                                marginBottom: "10px",
                                borderBottom: "1px solid #e0e0e0",
                                paddingBottom: "10px",
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center'
                                }}
                                onClick={() => LinkClick(notification.link_user._id, notification.type)}
                            >
                                {/* Avatar */}
                                <div 
                                    className={cx('avatar-img')}
                                    style={{
                                        borderRadius: '50%',
                                        overflow: 'hidden',
                                        width: 50,
                                        height: 50,
                                        marginRight: '10px'
                                }}>
                                    <img
                                        src={notification.link_user.image}
                                        alt={notification.link_user.username}
                                        style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}/>
                                </div>
                        
                                <div>
                                    <strong>{notification.link_user.username}</strong> {notification.content}
                                </div>
                          
                                <div>
                                    <a href={notification.link_post} target="_blank" rel="noopener noreferrer">
                                        {/* Bạn có thể để nội dung trong thẻ <a> nếu muốn */}
                                    </a>
                                </div>
                            </li>
                          
                        ))}
                    </ul>
                ) : (
                    <p style={{padding: 10}}>Không có thông báo nào</p>
                )}
            </div>
        </div>
  );
};

export default Notification;
