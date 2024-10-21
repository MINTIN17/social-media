import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Post.module.scss';
import axios from 'axios';

const cx = classNames.bind(styles);

interface Post {
    _id: string,
    user_id: string,
    content: string,
    status: string,
    like_user_id: string[],
    dislike_user_id: string[],
    comment_user_id: string[],
    tag: string[],
    group_id: string,
    created_time: string,
    updateAt: Date,
    __v: number,
    photo: string[],
}

const Post: React.FC = () => {
    const [items, setItems] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [images, setImages] = useState<string[]>([]); // Trường này để lưu danh sách ảnh hiện tại

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_link_server}/post`);
                const data: Post[] = await response.data;
                setItems(data);
            } catch (error) {
                setError('Có lỗi xảy ra khi lấy dữ liệu.');
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return <div style={{ backgroundColor: '#17181C', display: 'flex', justifyContent: 'center', color: '#DFD9D9' }}>Loading...</div>;
    }

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

    return (
        <div className={cx('wrapper')}>
            {items.length === 0 ? (
                <div className={cx('no-post')}>Không có bài viết nào</div>
            ) : (
                <div className={cx('Posts')}>
                    {items.map((item) => (
                        <div key={item._id} className={cx('Post')}>
                            <div className={cx('post-infor')}>
                                <div className={cx('avatar')}>
                                    <img src="/asset/img/avatar.jpg" alt="avatar-img" className={cx('avatar-img')} />
                                </div>
                                <div className={cx('name')}>
                                    <div className={cx('user-name')}>{item.user_id}</div>
                                    <div className={cx('time-post')}>{formatDate(item.created_time)}</div>
                                </div>
                            </div>
                            <div className={cx('content')}>{item.content}</div>
                            <div className={cx('image-container')}>
                                {item.photo && item.photo.length > 0 && (
                                    item.photo.length === 1 ? (
                                        <img 
                                            src={item.photo[0]} 
                                            alt="post" 
                                            className={cx('image-item', 'one-image')} 
                                            onClick={() => openImageModal(item.photo, 0)} // Mở modal khi nhấn vào ảnh
                                        />
                                    ) : item.photo.length === 2 ? (
                                        <>
                                            {item.photo.map((img, index) => (
                                                <img 
                                                    key={index} 
                                                    src={img} 
                                                    alt={`post-${index}`} 
                                                    className={cx('image-item', 'two-images')} 
                                                    onClick={() => openImageModal(item.photo, index)} // Mở modal khi nhấn vào ảnh
                                                />
                                            ))}
                                        </>
                                    ) : item.photo.length >= 3 ? (
                                        <div className={cx('three-images')}>
                                            <img 
                                                src={item.photo[0]} 
                                                alt="post-0" 
                                                className={cx('image-item', 'first')} 
                                                onClick={() => openImageModal(item.photo, 0)} // Mở modal khi nhấn vào ảnh
                                            />
                                            <div className={cx('two-images')}>
                                                <img 
                                                    src={item.photo[1]} 
                                                    alt="post-1" 
                                                    className={cx('image-item', 'second')} 
                                                    onClick={() => openImageModal(item.photo, 1)} // Mở modal khi nhấn vào ảnh
                                                />
                                                <img 
                                                    src={item.photo[2]} 
                                                    alt="post-2" 
                                                    className={cx('image-item', 'third')} 
                                                    onClick={() => openImageModal(item.photo, 2)} // Mở modal khi nhấn vào ảnh
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
                                    <img src='/asset/icon/like.svg' alt='like-icon' className={cx('like-icon')} />
                                    Thích
                                    <div className={cx('reaction-icons')}>
                                        <img src='/asset/icon/like.svg' alt='like-icon' className={cx('like-icon')} />
                                        <img src='/asset/icon/dislike.svg' alt='dislike-icon' className={cx('dislike-icon')} />
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
