import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { successNotification } from '../../Notification';
import styles from './Comment.module.scss';

interface CommentBoxProps {
    parentCommentId: string;
    postId: string;
    onCommentSuccess: () => void; // Callback to notify the parent component
    user_id: string
}

const CommentBox: React.FC<CommentBoxProps> = ({ parentCommentId, postId, onCommentSuccess, user_id }) => {
    const [comment, setComment] = useState<string>("");
    const [connection, setConnection] = useState<WebSocket>();

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

    const sendNotification = async () => {
        try {

            const currentUserId = localStorage.getItem('userId');
            const response = await axios.get(`${process.env.REACT_APP_link_server}/post/${postId}`);
            console.log(response.data);
            if(response.data.user_id !== currentUserId)
            {
                const res = await axios.post(`${process.env.REACT_APP_link_server}/notification`, {
                    receiver_id: user_id,
                    type: "commentPost",
                    content: "đã bình luận bài viết của bạn",
                    link_post: postId,
                    link_comment: currentUserId,
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
            }

        } catch (err) {
            console.error("Error sending notification:", err);
        }
    };

    const sendNotificationReply = async (sender_id: string, receiver_id : string) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_link_server}/notification`, {
                receiver_id: receiver_id,
                type: "commentPost",
                content: "đã phản hồi bình luận của bạn",
                link_post: postId,
                link_comment: sender_id,
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

    const sendComment = async () => {
        if (!comment.trim()) return;
        const currentUserId = localStorage.getItem('userId');
        axios
            .post(`${process.env.REACT_APP_link_server}/comment`, {
                user_id: localStorage.getItem("userId") || "",
                post_id: postId,
                content: comment,
                parent_comment_id: parentCommentId,
            })
            .then(() => {
                setComment("");
                successNotification("Bình luận thành công");
                onCommentSuccess(); 
            })
            .catch((err) => {
                console.error(err.response); // Handle any errors from the POST request
            });
            
            if(currentUserId != null)
            {
                console.log(parentCommentId);
                if(parentCommentId && typeof parentCommentId === 'string' && parentCommentId.trim() !== '')
                {
                    const response = await axios.get(`${process.env.REACT_APP_link_server}/comment/${parentCommentId}`);
                    if(currentUserId !== response.data.user_id)
                    {
                        sendNotificationReply(currentUserId, response.data.user_id);
                    }  
                }
                else{
                    sendNotification();                   
                }
            }
    };

    return (
        <div>
            <div style={{ position: "relative" }}>
                <input
                    value={comment}
                    style={{ fontSize: "15px" }}
                    placeholder="Nhập bình luận của bạn"
                    onKeyUp={(e) => e.key === "Enter" && sendComment()}
                    onChange={(e) => setComment(e.target.value)}
                />
            </div>
        </div>
    );
};

export default CommentBox;
