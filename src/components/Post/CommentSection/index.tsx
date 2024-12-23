import React from 'react';
import Comment from '../Comment';
import CommentBox from '../CommentBox';

interface CommentSectionProps {
    comments: any[]; // Array of comments
    postId: string;
    parentCommentId: string;
    onCommentSuccess: () => void; // Callback to refetch posts
    user_id: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, postId, parentCommentId, onCommentSuccess,user_id }) => {
    return (
        <div style={{ padding: '20px' }}>
            <div style={{maxHeight: '500px', overflowY: "scroll", paddingRight: '10px'}}>
                {comments.map((comment) => (
                    <Comment key={comment._id} {...comment} parentCommentId='' postId={postId} onCommentSuccess={onCommentSuccess} user_id={user_id}/>
                ))}

            </div>
            <CommentBox
                parentCommentId={parentCommentId}
                postId={postId}
                onCommentSuccess={onCommentSuccess}
                user_id={user_id}
            />
        </div>
    );
};

export default CommentSection;
