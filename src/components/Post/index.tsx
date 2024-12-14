import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Post.module.scss';
import axios from 'axios';
import HoverDiv from '../HoverDiv';
import { useNavigate } from 'react-router-dom';
import { set } from 'lodash';

const cx = classNames.bind(styles);

interface Post {
    _id: string,
    user_id: string,
    content: string,
    status: string,
    userInfo: {
        username: string,
        email: string,
        role: string,
        status: string
    },
    like_user_id: string[],
    dislike_user_id: string[],
    haha_user_id: string[],
    angry_user_id: string[],
    comment_user_id: string[],
    tag: string[],
    group_id: string,
    created_time: string,
    updateAt: Date,
    __v: number,
    photo: string[],
}

interface PostProps {
    apiUrl: string; // URL API sẽ gọi
    initialData?: Post[]; // Dữ liệu có thể được truyền vào từ bên ngoài
}

const Post: React.FC<PostProps> = ({ apiUrl, initialData = [] }) => {
    const [items, setItems] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [images, setImages] = useState<string[]>([]); // Trường này để lưu danh sách ảnh hiện tại
    const navigate = useNavigate();
    const [idPost, setIdPost] = useState("");
    const [reactions, setReactions] = useState<{ [postId: string]: string }>({});
    const currentUserId = localStorage.getItem('userId');

    const fetchPosts = async () => {
        console.log(apiUrl)
        try {
            const response = await axios.get(apiUrl);
            const data: Post[] = await response.data;

            setItems(data);
            console.log(data)
        } catch (error) {
            setError('Có lỗi xảy ra khi lấy dữ liệu.');
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!initialData.length) {
            fetchPosts();
        }
        else {
            setItems(initialData);
        }
    }, [apiUrl]);

    if (loading) {
        return <div style={{ backgroundColor: '#17181C', display: 'flex', justifyContent: 'center', color: '#DFD9D9' }}>Loading...</div>;
    }

    const ReactionPost = async (reaciton: string, postId: string) => {
        const userId = localStorage.getItem('userId');
        try {
            const response = await axios.put(`${process.env.REACT_APP_link_server}/post/${postId}/${reaciton}`, {
                userId: userId
            });
            const data = response.data;
            console.log(data);
            return data;
        } catch (error) {
            setError('Có lỗi xảy ra khi lấy dữ liệu.');
            console.error('Error fetching data:', error);
            return null;
        }
    };

    const formatDate = (isoDate: string): string => {
        const date = new Date(isoDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const openImageModal = (images: string[], index: number) => {
        setImages(images); // Lưu danh sách ảnh vào state
        setSelectedImage(images[index]); // Lưu hình ảnh được chọn
        setCurrentIndex(index); // Lưu chỉ số của hình ảnh hiện tại
    }

    const closeImageModal = () => {
        setSelectedImage(null); // Đóng modal
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
    const goToProfile = (id: any) => {
        navigate(`/profile/${id}`)
    }

    const ChangeReaction = (postId: string, emotion: string) => {
        const user_id = localStorage.getItem('userId');

        // Update the reactions in local state immediately
        setItems((prevItems) =>
            prevItems.map((post) => {
                if (post._id === postId) {
                    // Remove the user from all possible reaction arrays to ensure no duplicates
                    post.like_user_id = post.like_user_id.filter((id) => id !== user_id);
                    post.dislike_user_id = post.dislike_user_id.filter((id) => id !== user_id);
                    post.haha_user_id = post.haha_user_id.filter((id) => id !== user_id);
                    post.angry_user_id = post.angry_user_id.filter((id) => id !== user_id);

                    // Add the user to the appropriate reaction category based on the selected emotion
                    switch (emotion) {
                        case "like":
                            post.like_user_id.push(user_id?.toString() || '');
                            break;
                        case "dislike":
                            post.dislike_user_id.push(user_id?.toString() || '');
                            break;
                        case "haha":
                            post.haha_user_id.push(user_id?.toString() || '');
                            break;
                        case "angry":
                            post.angry_user_id.push(user_id?.toString() || '');
                            break;
                        default:
                            break;
                    }
                }
                return post;
            })
        );
        const currentReaction = reactions[postId] || '';
        if (currentReaction !== emotion) {
            setReactions((prevReactions) => ({
                ...prevReactions,
                [postId]: emotion,
            }));
        }
        ReactionPost(emotion, postId);
    };

    const getUserReaction = (post: Post, userId: string): string => {
        if (post.like_user_id.includes(userId)) return "like";
        if (post.dislike_user_id.includes(userId)) return "dislike";
        if (post.haha_user_id.includes(userId)) return "haha";
        if (post.angry_user_id.includes(userId)) return "angry";
        return "";
    };

    return (
        <div className={cx('wrapper')}>
            {items.length === 0 ? (
                <div className={cx('no-post')}>Không có bài viết nào</div>
            ) : (
                <div className={cx('Posts')}>
                    {items.map((item) => (
                        (() => {
                            const userReaction = getUserReaction(item, currentUserId || '');

                            return (
                                <div key={item._id} className={cx('Post')}>
                                    <div className={cx('post-infor')} onClick={() => goToProfile(item.user_id)}>
                                        <div className={cx('avatar')}>
                                            <img src="/asset/img/avatar.jpg" alt="avatar-img" className={cx('avatar-img')} />
                                        </div>
                                        <div className={cx('name')}>
                                            <div className={cx('user-name')}>{item.userInfo?.username || 'Người dùng không xác định'}</div>
                                            <div className={cx('time-post')}>{formatDate(item.created_time)}</div>
                                        </div>
                                    </div>
                                    {typeof item.content === 'string' && (
                                        <div className={cx('content')}>
                                            {item.content.split('\n').map((line, index) => (
                                                <React.Fragment key={index}>
                                                    {line}
                                                    {index < item.content.split('\n').length - 1 && <br />}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    )}
                                    {item.tag.length > 0 && (
                                        <div className={cx('tag')}>
                                            {item.tag.map((tag_item, index) => (
                                                <span key={index}>#{tag_item}{index < item.tag.length - 1 && ' '}</span>
                                            ))}
                                        </div>
                                    )}
                                    <div className={cx('image-container')}>
                                        {item.photo && item.photo.length > 0 && (
                                            item.photo.length === 1 ? (
                                                <img
                                                    src={item.photo[0]}
                                                    alt="post"
                                                    className={cx('image-item', 'one-image')}
                                                    onClick={() => openImageModal(item.photo, 0)}
                                                />
                                            ) : item.photo.length === 2 ? (
                                                <>
                                                    {item.photo.map((img, index) => (
                                                        <img
                                                            key={index}
                                                            src={img}
                                                            alt={`post-${index}`}
                                                            className={cx('image-item', 'two-images')}
                                                            onClick={() => openImageModal(item.photo, index)}
                                                        />
                                                    ))}
                                                </>
                                            ) : item.photo.length >= 3 ? (
                                                <div className={cx('three-images')}>
                                                    <img
                                                        src={item.photo[0]}
                                                        alt="post-0"
                                                        className={cx('image-item', 'first')}
                                                        onClick={() => openImageModal(item.photo, 0)}
                                                    />
                                                    <div className={cx('two-images')}>
                                                        <img
                                                            src={item.photo[1]}
                                                            alt="post-1"
                                                            className={cx('image-item', 'second')}
                                                            onClick={() => openImageModal(item.photo, 1)}
                                                        />
                                                        <img
                                                            src={item.photo[2]}
                                                            alt="post-2"
                                                            className={cx('image-item', 'third')}
                                                            onClick={() => openImageModal(item.photo, 2)}
                                                        />
                                                        {item.photo.length > 3 && (
                                                            <div className={cx('image-overlay')} onClick={() => openImageModal(item.photo, 2)}>
                                                                <span className={cx('more-count')}>+{item.photo.length - 3}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ) : null
                                        )}
                                    </div>
                                    <div className={cx('infor-post')}>1234</div>
                                    <div className={cx('line')}></div>
                                    <div className={cx('action')}>
                                        <div className={cx('reaction', 'child')}>
                                            <img
                                                src={
                                                    userReaction === 'like' ? '/asset/img/thumb-up.png' :
                                                        userReaction === 'dislike' ? '/asset/img/thumb-down.png' :
                                                            userReaction === 'haha' ? '/asset/icon/Post/haha.svg' :
                                                                userReaction === 'angry' ? '/asset/img/angry.png' :
                                                                    '/asset/icon/like.svg'
                                                }
                                                alt='like-icon'
                                                className={cx('like-icon')}
                                            />
                                            {userReaction === 'like' ? 'Thích' :
                                                userReaction === 'dislike' ? 'Không thích' :
                                                    userReaction === 'haha' ? 'Haha' :
                                                        userReaction === 'angry' ? 'Giận dữ' : 'Thả cảm xúc'}
                                            <div className={cx('reaction-icons')}>
                                                <HoverDiv hoverText='Thích'>
                                                    <img src='/asset/img/thumb-up.png' alt='like-icon' className={cx('like-icon-post')} onClick={() => ChangeReaction(item._id, "like")} />
                                                </HoverDiv>
                                                <HoverDiv hoverText='Không thích'>
                                                    <img src='/asset/img/thumb-down.png' alt='dislike-icon' className={cx('dislike-icon')} onClick={() => ChangeReaction(item._id, "dislike")} />
                                                </HoverDiv>
                                                <HoverDiv hoverText='Ha ha'>
                                                    <img src='/asset/icon/Post/haha.svg' alt='haha-icon' className={cx('haha-icon')} onClick={() => ChangeReaction(item._id, "haha")} />
                                                </HoverDiv>
                                                <HoverDiv hoverText='Phẫn nộ'>
                                                    <img src='/asset/img/angry.png' alt='angry-icon' className={cx('angry-icon')} onClick={() => ChangeReaction(item._id, "angry")} />
                                                </HoverDiv>
                                            </div>
                                        </div>
                                        <div className={cx('comment', 'child')}>
                                            <img src='/asset/icon/comment.svg' alt='comment-icon' className={cx('comment-icon')} />
                                            Bình luận
                                        </div>
                                        <div className={cx('share', 'child')}>
                                            <img src='/asset/icon/share.svg' alt='share-icon' className={cx('share-icon')} />
                                            Chia sẻ
                                        </div>
                                    </div>
                                </div>
                            );
                        })()
                    ))}

                </div>
            )}
            {selectedImage && (
                <div className={cx('modal')} onClick={closeImageModal}>
                    <div className={cx('modal-content')} onClick={(e) => e.stopPropagation()}>
                        <img src={selectedImage} alt="selected" className={cx('modal-image')} />
                        <button className={cx('prev-button')} onClick={handlePrev}> &lt; </button>
                        <button className={cx('next-button')} onClick={handleNext}> &gt; </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Post;
