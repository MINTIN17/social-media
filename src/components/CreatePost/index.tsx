import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './CreatePost.module.scss';
import uploadFile from '../../api/uploadImage';
import { useNavigate } from 'react-router-dom';
import { successNotification } from '../Notification';
import HoverDiv from '../HoverDiv';

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

// interface post {
//     userId: string
//     content: string;
//     groupId: string;
//     tag: string[];
//     status: string;
//     photo: string[];
// }

const Modal: React.FC<ModalProps> = ({ onClose }) => {
    const [selectedOption, setSelectedOption] = useState<string>('Công khai');
    const [content, setContent] = useState<string>('');
    const [isFocused, setIsFocused] = useState(false);
    const contentEditableRef = useRef<HTMLDivElement>(null);
    const [isImageVisible, setIsImageVisible] = useState(false);
    const [isTagFriendVisible, setIsTagFriendVisible] = useState(false);
    const [isTagVisible, setIsTagVisible] = useState(false);
    const [images, setImages] = useState<File[]>([]);
    const [tagFriends, setTagFriend] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const navigate = useNavigate();
    const [isModalimgOpen, setIsModalimgOpen] = useState(false);
    const [userName, setUserName] = useState<string | null>(null);
    const [inputTagValue, setInputTagValue] = useState('');

    useEffect(() => {
        const userName = localStorage.getItem('userName');

        if (userName) {
            setUserName(userName); // Lấy tên người dùng từ localStorage
        }
    }, []);
    const openModalimg = () => setIsModalimgOpen(true);

    const closeModalimg = () => setIsModalimgOpen(false);

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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            document.execCommand('insertHTML', false, '<br/><br/>');
            e.preventDefault();
        }
    };

    const toggleImageVisibility = (e : React.MouseEvent) => {
        setIsImageVisible(!isImageVisible);
        setImages([]);
        e.stopPropagation();
    };

    const toggleTagFriendVisibility = (e : React.MouseEvent) => {
        setIsTagFriendVisible(!isTagFriendVisible);
        setTagFriend([]);
        e.stopPropagation();
    };

        const toggleTagVisibility = (e : React.MouseEvent) => {
            setIsTagVisible(!isTagVisible);
            setTags([]);
            e.stopPropagation();
        };

    const handleInputTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputTagValue(event.target.value);
    };
    
      const handleKeyDownTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && inputTagValue.trim() !== '') {
          setTags([...tags, inputTagValue.trim()]); // Thêm tag mới vào mảng tags
          setInputTagValue(''); // Xóa giá trị trong input sau khi thêm
        }
    };

    const handleRemoveTag = (index: number) => {
        // Xóa tag tại vị trí 'index' trong mảng tags
        const newTags = tags.filter((_, i) => i !== index);
        setTags(newTags);
    };

    const TagOk = (e : React.MouseEvent) => {
        setIsTagVisible(!isTagVisible);
        e.stopPropagation();
    }

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

    const CreateNewPost = async () => {
        try {
            const user_id = localStorage.getItem('userId')
            const group_id = ""
            const tag = tags
            const photo = []
            for (let i = 0; i < images.length; i++)
            {
                const res = await uploadFile(images[i])
                photo.push(res)
            }
            onClose();
            const response = await axios.post(`${process.env.REACT_APP_link_server}/post`, {
                user_id,
                content,
                group_id,
                tag,
                status: selectedOption,
                photo
            });
            setTagFriend([]);
            setTags([]);
            successNotification("Đăng bài thành công");
            navigate("/home");            
        } catch (err: any) {
            if (err.response) {
                // Lỗi từ server, in chi tiết phản hồi
                console.log('Server Response:', err.response.data);
                setError('Đăng nhập thất bại: ' + err.response.data.message);
            } else {
                setError('Có lỗi xảy ra, vui lòng thử lại.');
            }
        } 

    }

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
                        <div className={cx('modal-username')}>{userName}</div>
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
                            onClick={openModalimg}
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

                {isTagFriendVisible && (
                    <div className={cx('modal-add-friend-tag')}>
                        <div className={cx('header')}>
                            Thêm HashTag vào bài viết 1
                            <div className={cx('circle')} onClick={toggleTagFriendVisibility}>
                                <span className={cx('cross')}>&#x2715;</span>
                            </div>
                        </div>
                        <div className={cx('line')}></div>
                        <div className={cx('body')}>
                            <div className={cx('tag-content')}>
                                <input type='text' placeholder='Tìm kiếm bạn bè'/>
                                <img src='/asset/icon/search.svg' alt='search-icon' className={cx('search-icon')}/>
                            </div>
                        </div>
                        <div className={cx('friend-tags')}></div>
                        
                    </div>
                )}

                {isTagVisible && (
                    <div className={cx('modal-add-tag')}>
                        <div className={cx('header')}>
                            Thêm HashTag vào bài viết
                            <div className={cx('circle')} onClick={toggleTagVisibility}>
                                <span className={cx('cross')}>&#x2715;</span>
                            </div>
                        </div>
                        <div className={cx('line')}></div>
                        <div className={cx('body')}>
                            <div className={cx('tag-content')}>
                                <input type='text' placeholder='Thêm HashTag' value={inputTagValue} onChange={handleInputTagChange} onKeyDown={handleKeyDownTag}/>
                            </div>
                        </div>
                        <div className={cx('tag-container')}>
                            <div className={cx('tags')}>
                                {tags.map((tag, index) => (
                                <span key={index} className={cx('tag')}>
                                    #{tag}
                                    <button onClick={() => handleRemoveTag(index)}>
                                        x
                                    </button>
                                </span>
                                ))}
                            </div>
                        </div>
                        <div className={cx('btn-tag')} onClick={TagOk}>OK</div>
                    </div>
                )}

                <div className={cx("modal-add-other")}>
                    <h4>Thêm vào bài viết của bạn</h4>
                    <HoverDiv hoverText='Thêm ảnh'>
                        <div onClick={toggleImageVisibility}>
                            <img src="/asset/icon/img.svg" alt="img" className={cx('img')} />
                        </div>
                    </HoverDiv>
                    <HoverDiv hoverText='Thêm Tag bạn bè'>
                        <div onClick={toggleTagFriendVisibility}>
                            <img src="/asset/img/tagfriend.png" alt="tag-friend" className={cx('tag-friend')} />
                        </div>
                    </HoverDiv>
                    <HoverDiv hoverText='Thêm HashTag'>
                        <div onClick={toggleTagVisibility}>
                            <img src="/asset/img/tag.png" alt="tag" className={cx('tag')} />
                        </div>
                    </HoverDiv>
                </div>

                <div className={cx("button-post")} 
                    style={{
                        cursor: (content.trim() || images.length > 0) ? 'pointer' : 'not-allowed', 
                        backgroundColor: (content.trim() || images.length > 0) ? '#0866FF' : '#505151', 
                        color: (content.trim() || images.length > 0) ? '#fff' : '#757676'
                    }}
                    onClick={CreateNewPost}
                    >
                    Đăng
                </div>
            </div>

            {isModalimgOpen && (
            <div className={cx('modalimg-overlay')} onClick={closeModalimg}>
                <div className={cx('modalimg-content')} onClick={(e) => e.stopPropagation()}>
                    <h2>Chỉnh sửa ảnh</h2>
                    <button onClick={closeModalimg}>Close Modal</button>
                </div>
            </div>
            )}
        </div>
    );
};

export default CreatePost;
function setError(arg0: string) {
    throw new Error('Function not implemented.');
}

