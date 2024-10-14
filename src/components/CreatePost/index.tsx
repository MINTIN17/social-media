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
        if (isModalVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

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
                    <input onClick={toggleModal} type="text" readOnly id="name" name="name" placeholder="Bạn đang nghĩ gì ?" />
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
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            document.execCommand('insertHTML', false, '<br/><br/>');
            e.preventDefault();
        }
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

                <div className={cx('modal-post-content')} contentEditable="true" onInput={handleInput}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    ref={contentEditableRef}>
                </div>
                {(!content.trim() && !isFocused) && (
                    <div className={cx('placeholder')}>
                        Bạn đang nghĩ gì thế, hãy chia sẻ nào?
                    </div>
                )}
                {isImageVisible && (
                    <div className={cx("modal-add-img")}>
                        <div className={cx('circle')} onClick={() => setIsImageVisible(false)}>
                            <span className={cx('cross')}>&#x2715;</span>
                        </div>
                        <img src="/asset/icon/addimage.svg" alt="add-img" className={cx('add-img')} />
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
                        cursor: content ? 'pointer' : 'not-allowed', 
                        backgroundColor: content ? '#0866FF' : '#505151', 
                        color: content ? '#fff' : '#757676'
                     }}>
                    Đăng
                </div> 
            </div>
        </div>
    );
};

export default CreatePost;
