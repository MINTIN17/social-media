import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './CreatePost.module.scss';

const cx = classNames.bind(styles);

const CreatePost: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    useEffect(() => {
        // Khóa thanh cuộn khi modal mở
        document.body.style.overflow = isModalVisible ? 'hidden' : 'auto';

        // Cleanup khi component unmount
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isModalVisible]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('create-post')}>
                <div className={cx('content')}>
                    <div className={cx('avatar')}>
                        <img src="/asset/img/avatar.jpg" alt="avatar-img" className={cx('avatar-img')} />
                    </div>
                    <input
                        onClick={toggleModal}
                        type="text"
                        readOnly
                        id="name"
                        name="name"
                        placeholder="Bạn đang nghĩ gì ?"
                    />
                </div>
            </div>

            <div className={cx('post')} />

            {isModalVisible && <Modal onClose={toggleModal} />}
        </div>
    );
};

interface ModalProps {
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
    const [selectedOption, setSelectedOption] = useState<string>('Công khai');
    const [content, setContent] = useState<string>('');
    const [isFocused, setIsFocused] = useState(false);
    const contentEditableRef = useRef<HTMLDivElement>(null);
    const [isImageVisible, setIsImageVisible] = useState(false);
    const [images, setImages] = useState<File[]>([]);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };

    const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
        const content = e.currentTarget.innerText;
        setContent(content);
    };

    const handleFocus = () => {
        setIsFocused(true);
        const range = document.createRange();
        const selection = window.getSelection();
        if (contentEditableRef.current && selection) {
            range.setStart(contentEditableRef.current, 0);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    };

    const handleBlur = () => {
        if (content.trim() === '') {
            setContent('');
            setIsFocused(false);
        }
    };

    const toggleImageVisibility = () => {
        setIsImageVisible(!isImageVisible);
        setImages([]);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            document.execCommand('insertHTML', false, '<br/><br/>');
            e.preventDefault();
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setImages((prev) => [...prev, ...files].slice(0, 10)); // Giới hạn tối đa 5 ảnh
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        setImages((prev) => [...prev, ...files].slice(0, 10)); // Giới hạn tối đa 5 ảnh
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    return (
        <div className={cx('modal-overlay')}>
            <div className={cx('modal-content', { 'expanded': isImageVisible })}>
                <div className={cx('modal-title')}>
                    <h3>Tạo bài viết</h3>
                    <div className={cx('circle')} onClick={onClose}>
                        <span className={cx('cross')}>&#x2715;</span>
                    </div>
                </div>

                <hr className={cx('custom-line')} />

                <div className={cx('modal-user-infor')}>
                    <div className={cx('modal-avatar')}>
                        <img src="/asset/img/avatar.jpg" alt="avatar-img" className={cx('modal-avatar-img')} />
                    </div>
                    <div className={cx('modal-status')}>
                        <div className={cx('modal-username')}>Nguyen</div>
                        <div className={cx('modal-user-status')}>
                            <select value={selectedOption} onChange={handleChange}>
                                <option value="Công khai" className={cx('option-with-icon option1')}>Công khai</option>
                                <option value="Bạn bè" className={cx('option-with-icon option2')}>Bạn bè</option>
                                <option value="Chỉ mình tôi" className={cx('option-with-icon option3')}>Chỉ mình tôi</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div 
                    className={cx('modal-post-content')} 
                    contentEditable="true" 
                    onInput={handleInput}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    ref={contentEditableRef}
                />
                
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                    id="upload-input"
                />
                
                {(!content.trim() && !isFocused) && (
                    <div className={cx('placeholder')}>
                        Bạn đang nghĩ gì thế, hãy chia sẻ nào?
                    </div>
                )}
                
                {isImageVisible && (
                    <div 
                        className={cx("modal-add-img")} 
                        onDrop={handleDrop} 
                        onDragOver={handleDragOver}
                        onClick={() => {
                            if (images.length === 0) {  // Nếu chưa có ảnh nào thì mở input
                                document.getElementById('upload-input')?.click();
                            }
                        }}
                    >
                        {images.length === 0 && (
                            <img src="/asset/icon/addimage.svg" alt="add-img" />
                        )}
                        {images.length > 0 && (
                            <div className={cx('edit-img')}
                    
                            > Chỉnh sửa ảnh</div>
                        )}
                        {images.length > 0 && (
                            <div className={cx('add-more-img')}
                            onClick={() => { document.getElementById('upload-input')?.click();}}
                            >Thêm ảnh</div>
                        )}
                        <div className={cx('circle')} onClick={toggleImageVisibility}>
                            <span className={cx('cross')}>&#x2715;</span>
                        </div>
                        <div className={cx('image-preview')}>
                            {images.slice(0, 4).map((image, index) => (
                                <img 
                                    key={index} 
                                    src={URL.createObjectURL(image)}  
                                    alt="preview" 
                                    className={cx('preview-img')}
                                />
                            ))}
                            {images.length > 4 && (
                                <div className={cx('more-images')}>
                                    <img
                                        src={URL.createObjectURL(images[4])}
                                        alt="preview"
                                        className={cx('preview-img')} // Làm mờ ảnh thứ 5 nếu số lượng ảnh > 5
                                    />
                                    {images.length > 5 && (
                                        <div className={cx('image-overlay')}>
                                            <span className={cx('more-count')}>+{images.length - 5}</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className={cx("modal-add-other")}>
                    <h4>Thêm vào bài viết của bạn</h4>
                    <div onClick={toggleImageVisibility}>
                        <img src="/asset/icon/img.svg" alt="img" className={cx('img')} />
                    </div>
                </div>

                <div className={cx("button-post")} 
                    style={{
                        cursor: (content.trim() || images.length > 0) ? 'pointer' : 'not-allowed', 
                        backgroundColor: (content.trim() || images.length > 0) ? '#0866FF' : '#505151', 
                        color: (content.trim() || images.length > 0) ? '#fff' : '#757676'
                    }}>
                    Đăng
                </div>

            </div>
        </div>
    );
};

export default CreatePost;
