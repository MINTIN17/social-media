import { message } from "antd";
import React, { useEffect, useState } from 'react';
import { notification } from 'antd';
import styles from './Notification.module.scss';
import axios from 'axios';
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { link } from "fs";

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
    _id: string,
    receiver_id: string;  
    content: string;
    type: string;
    link_comment: link_user_infor;
    link_post: string;       
    link_user?: link_user_infor;
    is_new: boolean;
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
    const [usernames, setUsername] = useState<string[]>([]);
    const [images, setImages] = useState<string[]>([]);
    const [links, setLinks] = useState<string[]>([]);
    const [is_new, setIs_new] = useState<boolean[]>([]);

const fetchNotifications = async () => {
    try {
        const response = await axios.get<notification[]>(`${process.env.REACT_APP_link_server}/notification/${user_id}`);
        const notifications = response.data;
        
        setnotifications(notifications);
        

        const usernames = notifications.map(notification => {
            if (notification.link_user != null) {
                return notification.link_user.username;
            } else {
                return notification.link_comment.username; 
            }
        });

        const images = notifications.map(notification => {
            if (notification.link_user != null) {
                return notification.link_user.image;
            } else {
                return notification.link_comment.image;
            }
        });

        const links = notifications.map(notification => {
            if (notification.link_user != null) {
                return notification.link_user._id;
            } else {
                return notification.link_post;
            }
        });

        const is_news = notifications.map(notification => {return notification.is_new;});

        setUsername(usernames);
        setImages(images);
        setLinks(links);
        setIs_new(is_news);
    } catch (error) {
        console.error('Error fetching notifications:', error); // In lỗi nếu xảy ra
    }
};

    useEffect(() => {
        fetchNotifications();
    }, []);

    const visibleNotifications = viewMode === "new" ? notifications.slice(0, 4) : notifications;
    const LinkClick = async  (link: string ,type: string, index: number, id: string) => {
        const updatedIsNew = [...is_new];
        updatedIsNew[index] = false;
        setIs_new(updatedIsNew);

        try {
            // Gọi API để cập nhật is_new thành false trong backend
            await axios.put(`${process.env.REACT_APP_link_server}/notification/${id}/is_new`, {
            is_new: false,
            });
        } catch (error) {
            console.error('Error updating notification:', error);
        }

        if (type === "addFriend" || type === "acceptFriend")
        {
            navigate(`/profile/${link}`);
            
        }
        else if(type === "commentPost")
        {
            navigate(`/post/${link}`);
        }
    };

    const handleThreeDotsClick = async  (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, index: number) => {
        // Ngừng sự kiện click lan ra ngoài (để không gây ra sự kiện click trên toàn bộ <li>)
        e.stopPropagation();
    
        const updatedIsNew = [...is_new];
        updatedIsNew[index] = true;
        setIs_new(updatedIsNew);

        try {
            // Gọi API để cập nhật is_new thành false trong backend
            await axios.put(`${process.env.REACT_APP_link_server}/notification/${notifications[index]._id}/is_new`, {
            is_new: true,
            });
        } catch (error) {
            console.error('Error updating notification:', error);
        }
    };

    return (
        <div className={cx('notification')}
            style={{paddingLeft: 10, paddingBottom: 10, paddingTop: 10}}
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
                    maxHeight: viewMode === "all" ? "275px" : "auto",
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
                                alignItems: 'center',
                                position: 'relative'
                                }}
                                onClick={() => LinkClick(links[index], notification.type, index, notification._id)}
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
                                        src={images[index]}
                                        alt={usernames[index]}
                                        style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}/>
                                </div>
                        
                                <div>
                                    <strong>{usernames[index]}</strong> {notification.content}
                                </div>
                          
                                <div>
                                    <a href={notification.link_post} target="_blank" rel="noopener noreferrer">
                                        {/* Bạn có thể để nội dung trong thẻ <a> nếu muốn */}
                                    </a>
                                </div>

                                {is_new[index] && (
                                    <span
                                        style={{
                                            width: '10px',
                                            height: '10px',
                                            backgroundColor: '#3c8ddf',
                                            borderRadius: '50%',
                                            position: 'absolute',
                                            right: 40,
                                            top: 20
                                        }}
                                    />
                                )}

                                {/* Dấu ba chấm */}
                                    <span
                                        onClick={(e) => handleThreeDotsClick(e, index)}  // Xử lý nhấn vào dấu ba chấm
                                        style={{
                                            position: 'absolute',
                                            right: 20,
                                            top: 10,
                                            cursor: 'pointer',
                                            fontSize: '18px',
                                            color: '#000000'
                                        }}
                                    >
                                        ...
                                    </span>
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
