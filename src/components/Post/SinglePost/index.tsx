import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Post.module.scss';
import { successNotification } from '../../Notification';
import HoverDiv from '../../HoverDiv';
import CommentSection from '../CommentSection';

interface Post {
    _id: string;
    user_id: string;
    content: string;
    status: string;
    userInfo: {
        username: string;
        email: string;
        role: string;
        status: string;
        image: string;
    };
    like_user_id: string[];
    dislike_user_id: string[];
    haha_user_id: string[];
    angry_user_id: string[];
    comment_user_id: string[];
    tag: string[];
    group_id: string;
    created_time: string;
    updateAt: Date;
    __v: number;
    photo: string[];
    comments: [];
}

const SinglePost: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [active, setActive] = useState(false);
    const currentUserId = localStorage.getItem('userId');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [images, setImages] = useState<string[]>([]);
    const openImageModal = (images: string[], index: number) => {
        setImages(images);
        setSelectedImage(images[index]);
        setCurrentIndex(index);
        console.log(index)
        console.log(images[index])
    }    
    
    const handleNext = () => {
        const nextIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(nextIndex);
        setSelectedImage(images[nextIndex]);
    }

    const handlePrev = () => {
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(prevIndex);
        setSelectedImage(images[prevIndex]);
    }

    const closeImageModal = () => {
        setSelectedImage(null); // Đóng modal
    }

    const fetchPost = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_link_server}/post/${id}`);
            setPost(response.data);
        } catch (err) {
            console.error('Failed to fetch post:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (isoDate: string): string => {
        const date = new Date(isoDate);
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
            .toString()
            .padStart(2, '0')}/${date.getFullYear()}`;
    };

    const toggleActive = () => setActive((prev) => !prev);

    const deletePost = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_link_server}/post/${id}`);
            successNotification('Post deleted successfully');
            navigate('/home');
        } catch (err) {
            console.error('Failed to delete post:', err);
        }
    };

    const sharePost = () => {
        successNotification('Shared successfully!');
    };

    const getUserReaction = (post: Post, userId: string): string => {
        if (post.like_user_id?.includes(userId)) return 'like';
        if (post.dislike_user_id?.includes(userId)) return 'dislike';
        if (post.haha_user_id?.includes(userId)) return 'haha';
        if (post.angry_user_id?.includes(userId)) return 'angry';
        return '';
    };

    useEffect(() => {
        fetchPost();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!post) {
        return <div>No post found.</div>;
    }

    const userReaction = getUserReaction(post, currentUserId || '');

    return (
        <div style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            padding: "50px",
            backgroundColor: "#DFD9D9"
        }}>

            <div className={styles.Post}>
                <div className={styles['post-infor']}>
                    <div className={styles.avatar} onClick={() => navigate(`/profile/${post.user_id}`)}>
                        <img
                            src={post.userInfo?.image || '/asset/img/avatar.jpg'}
                            alt="avatar-img"
                            className={styles['avatar-img']}
                        />
                    </div>
                    <div className={styles.name} onClick={() => navigate(`/profile/${post.user_id}`)}>
                        <div className={styles['user-name']}>{post.userInfo?.username || 'Unknown User'}</div>
                        <div className={styles['time-post']}>{formatDate(post.created_time)}</div>
                    </div>
                    {post.user_id === currentUserId ? (
                        <div className={styles.option}>
                            <div onClick={() => console.log('Edit post')}>
                                <HoverDiv hoverText="Edit Post">...</HoverDiv>
                            </div>
                            <div onClick={deletePost}>
                                <HoverDiv hoverText="Delete Post">...</HoverDiv>
                            </div>
                        </div>
                    ) : null}
                </div>
                <div className={styles.content}>
                    {post.content?.split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            <br />
                        </React.Fragment>
                    ))}
                </div>
                <div>
                    {post.tag.length > 0 && (
                        <div className={styles.tag}>
                            {post.tag.map((tag_item, index) => (
                                <span key={index}>#{tag_item}{index < post.tag.length - 1 && ' '}</span>
                            ))}
                        </div>
                    )}
                </div>
                <div className={styles.image_container}>
                    {post.photo && post.photo.length > 0 && (
                        post.photo.length === 1 ? (
                            <img
                                src={post.photo[0]}
                                alt="post"
                                className={`${styles.image_item} ${styles.one_image}`}
                                onClick={() => openImageModal(post.photo, 0)}
                            />
                        ) : post.photo.length === 2 ? (
                            <>
                                {post.photo.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`post_${index}`}
                                        className={`${styles.image_item} ${styles.two_images}`}
                                        onClick={() => openImageModal(post.photo, index)}
                                    />
                                ))}
                            </>
                        ) : post.photo.length >= 3 ? (
                            <div className={styles.three_images}>
                                <img
                                    src={post.photo[0]}
                                    alt="post_0"
                                    className={`${styles.image_item} ${styles.first}`}
                                    onClick={() => openImageModal(post.photo, 0)}
                                />
                                <div className={styles.two_images}>
                                    <img
                                        src={post.photo[1]}
                                        alt="post_1"
                                        className={`${styles.image_item} ${styles.second}`}
                                        onClick={() => openImageModal(post.photo, 1)}
                                    />
                                    <img
                                        src={post.photo[2]}
                                        alt="post_2"
                                        className={`${styles.image_item} ${styles.third}`}
                                        onClick={() => openImageModal(post.photo, 2)}
                                    />
                                    {post.photo.length > 3 && (
                                        <div className={styles.image_overlay} onClick={() => openImageModal(post.photo, 2)}>
                                            <span className={styles.more_count}>+{post.photo.length + 3}</span>
                                        </div>
                                    )}
                                </div>
                            </div >
                        ) : null
                    )}
                </div >
                <div className={styles.action}>
                    <div className={`${styles.reaction} ${styles.child}`}>
                        <img
                            src={
                                userReaction === 'like'
                                    ? '/asset/img/thumb-up.png'
                                    : userReaction === 'dislike'
                                        ? '/asset/img/thumb-down.png'
                                        : userReaction === 'haha'
                                            ? '/asset/icon/Post/haha.svg'
                                            : userReaction === 'angry'
                                                ? '/asset/img/angry.png'
                                                : '/asset/icon/like.svg'
                            }
                            alt="reaction-icon"
                            className={styles['like-icon']}
                        />
                    </div>
                    <div className={`${styles.comment} ${styles.child}`} onClick={toggleActive}>
                        <img src="/asset/icon/comment.svg" alt="comment-icon" className={styles['comment-icon']} />
                        Comments
                    </div>
                    <div className={`${styles.share} ${styles.child}`} onClick={sharePost}>
                        <img src="/asset/icon/share.svg" alt="share-icon" className={styles['share-icon']} />
                        Share
                    </div>
                </div>
                {
                    active && (
                        <CommentSection
                            comments={post.comments || []}
                            parentCommentId=""
                            postId={post._id}
                            onCommentSuccess={fetchPost}
                            user_id={post.user_id}
                        />
                    )
                }
            </div >
            {selectedImage && (
                <div className={styles.modal} onClick={closeImageModal}>
                    <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
                        <img src={selectedImage} alt="selected" className={styles.modal_image} />
                        <button className={styles.prev_button} onClick={handlePrev}> &lt; </button>
                        <button className={styles.next_button} onClick={handleNext}> &gt; </button>
                    </div>
                </div>
            )}
        </div >
    );
};

export default SinglePost;
