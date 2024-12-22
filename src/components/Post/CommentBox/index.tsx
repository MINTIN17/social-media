import React, { useState } from 'react';
import axios from 'axios';
import { successNotification } from '../../Notification';
import styles from './Comment.module.scss';

interface CommentBoxProps {
    parentCommentId: string;
    postId: string;
    onCommentSuccess: () => void; // Callback to notify the parent component
}

const CommentBox: React.FC<CommentBoxProps> = ({ parentCommentId, postId, onCommentSuccess }) => {
    const [comment, setComment] = useState<string>("");

    const sendComment = () => {
        if (!comment.trim()) return;

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
