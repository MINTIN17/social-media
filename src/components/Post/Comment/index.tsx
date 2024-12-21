import React, { useState, useEffect } from 'react';
import styles from './Comment.module.scss';
import CommentBox from '../CommentBox';

interface CommentProps {
    _id: string,
    user: {
        username: string;
        image: string;
    }
    content: string;
    parentCommentId: string;
    postId: string;
    child: CommentProps[];
    onCommentSuccess: () => void;}

const Comment: React.FC<CommentProps> = ({ _id, user, content, parentCommentId, postId, child, onCommentSuccess }) => {
    console.log(parentCommentId)
    const [active, setActive] = useState<boolean>(false)
    return (
        <div>
            <div className={styles.comment}>
                <img className={styles.comment_img} src={user.image != "" ? user.image : '/asset/img/avatar.jpg'}></img>
                <div style={{width: "100%"}}>
                    <div className={styles.comment_box}>
                        <div className={styles.comment_username}>{user.username}</div>
                        <div className={styles.comment_content}>{content}</div>
                    </div>
                    <div>
                        {
                            parentCommentId === "" ?

                                <div style={{ fontSize: "14px", paddingLeft: "20px", paddingTop: "5px", color: "gray", cursor: "pointer" }} onClick={() => { setActive(!active) }}>Bình luận</div>
                                : <div></div>
                        }
                    </div>
                    <div>
                        {child.length > 0 &&
                            child.map((cmt) => (
                                <div key={cmt._id} style={{ paddingLeft: '0px', margin: '10px', marginRight: '0px' }}>
                                    <Comment
                                        _id={cmt._id}
                                        user={cmt.user}
                                        content={cmt.content}
                                        parentCommentId={cmt.parentCommentId}
                                        postId={cmt.postId}
                                        child={cmt.child}
                                        onCommentSuccess={onCommentSuccess}
                                    />
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            {
                parentCommentId === "" && active ?
                    <div style={{ paddingLeft: "60px" }}>
                        <CommentBox parentCommentId={_id} postId={postId} onCommentSuccess={onCommentSuccess} />
                    </div>
                    : <div></div>
            }
        </div>
    )
}

export default Comment;
