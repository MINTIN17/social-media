import { Link, useParams } from "react-router-dom";
import Post from "../../components/Post";
import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
import { Menu, Modal } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const cx = classNames.bind(styles);

interface user {
    _id: string,
    username: string,
    email: string,
    friend: string[],
    image: string,
    background_image: string,
}

function ProfileOther() {
    const navigate = useNavigate();
    const [user, setUser] = useState<user>();
    const [imageUrl, setImageUrl] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [buttonState, setButtonState] = useState<string>(''); // 'friend', 'pending', 'send', 'sent'
    const [friendRequestSent, setFriendRequestSent] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisiblePending, setIsModalVisiblePending] = useState(false);
    const [isModalVisibleSent, setIsModalVisibleSent] = useState(false);

    const { id } = useParams();
    const apiPostUserUrl = `${process.env.REACT_APP_link_server}/post/user/${id}`;

    const showModal = () => setIsModalVisible(true);
    const handleCancel = () => setIsModalVisible(false);
    const showModalPending = () => setIsModalVisiblePending(true);
    const handleCancelPending = () => setIsModalVisiblePending(false);
    const showModalSent = () => setIsModalVisibleSent(true);
    const handleCancelSent = () => setIsModalVisibleSent(false);

    const fetchUser = async (): Promise<user | null> => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_link_server}/account/user/${id}`);
            const data = response.data;
            console.log(data);
            return data;
        } catch (error) {
            setError('Có lỗi xảy ra khi lấy dữ liệu.');
            console.error('Error fetching data:', error);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const checkFriendStatus = async () => {
        try {
            const currentUserId = localStorage.getItem('userId');

            const response = await axios.post(`${process.env.REACT_APP_link_server}/account/friend-status`, {
                senderId: currentUserId,
                receiverId: id,
            });

            const { isFriend, isPending, isRequestSent } = response.data;

            // Kiểm tra ưu tiên: đã là bạn bè > đang chờ phản hồi > đã gửi yêu cầu
            if (isFriend) {
                setButtonState('friend'); // Đã là bạn bè
            } else if (isPending) {
                setButtonState('pending'); // Đang chờ phản hồi
            } else if (isRequestSent) {
                setButtonState('sent'); // Đã gửi lời mời kết bạn
            } else {
                setButtonState('send'); // Chưa gửi yêu cầu
            }
        } catch (error) {
            console.error('Lỗi kiểm tra trạng thái bạn bè:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchUser();
            checkFriendStatus();
            if (data) {
                setUser(data);
                setImageUrl(data.background_image);
            }
        };
        fetchData();
        console.log(apiPostUserUrl);

    }, [id]);

    const handleSendFriendRequest = async () => {
        try {
            const currentUserId = localStorage.getItem('userId');

            const response = await axios.put(`${process.env.REACT_APP_link_server}/account/add-friend`, {
                friendId: id,
                userId: currentUserId,
            });

            const response1 = await axios.post(`${process.env.REACT_APP_link_server}/notification`, {
                receiver_id: id,
                type: "addFriend",
                content: "đã gửi lời mời kết bạn đến bạn",
                link_user: currentUserId
            });

            const message = response.data;
            if (message === "Friend added successfully")
                setButtonState("pending");

        } catch (error) {
            console.error('Lỗi kiểm tra trạng thái bạn bè:', error);
        } finally {
            window.location.reload();
        }
    };

    const handleMessage = async () => {
        try {
            const currentUserId = localStorage.getItem('userId');

            const response = await axios.post(`${process.env.REACT_APP_link_server}/conversation`, {
                user_id_1: id,
                user_id_2: currentUserId,
            }).then(res => {
                navigate(`/message/${res?.data._id}`)

            });
        } catch (error) {
            console.error('Lỗi kiểm tra trạng thái bạn bè:', error);
        } finally {
        }
    };

    const handleRemoveFriendRequest = async () => {
        try {
            const currentUserId = localStorage.getItem('userId');

            const response = await axios.put(`${process.env.REACT_APP_link_server}/account/remove-friend-invite`, {
                friendId: currentUserId,
                userId: id,
            });

            const message = response.data;
            if (message === "Xóa bạn thành công")
                setButtonState("send");
            console.log(message);

        } catch (error) {
            console.error('Lỗi kiểm tra trạng thái bạn bè:', error);
        } finally {
            window.location.reload();
        }
    };

    const handleRemoveFriendRequestSent = async () => {
        try {
            const currentUserId = localStorage.getItem('userId');

            const response = await axios.put(`${process.env.REACT_APP_link_server}/account/remove-friend-invite`, {
                friendId: id,
                userId: currentUserId,
            });

            const message = response.data;
            if (message === "Xóa bạn thành công")
                setButtonState("send");
            console.log(message);

        } catch (error) {
            console.error('Lỗi kiểm tra trạng thái bạn bè:', error);
        } finally {
            window.location.reload();
        }
    };

    const handleRemoveFriend = async () => {
        try {
            const currentUserId = localStorage.getItem('userId');

            const response = await axios.put(`${process.env.REACT_APP_link_server}/account/unfriend`, {
                friendId: currentUserId,
                userId: id,
            });

            const message = response.data;
            if (message === "Xóa bạn thành công")
                setButtonState("send");
            console.log(message);

        } catch (error) {
            console.error('Lỗi kiểm tra trạng thái bạn bè:', error);
        } finally {
            setIsModalVisible(false);
            window.location.reload();
        }
    };

    const handleSendFriendConfirm = async () => {
        try {
            const currentUserId = localStorage.getItem('userId');

            const response = await axios.put(`${process.env.REACT_APP_link_server}/account/confirm-friend`, {
                friendId: id,
                userId: currentUserId,
            });

            const message = response.data;
        } catch (error) {
            console.error('Lỗi kiểm tra trạng thái bạn bè:', error);
        } finally {
            window.location.reload();
        }
    };


    return (
        <div className={cx('wrapper')}>
            <div className={cx('profile-container')}>
                <div className={cx('profile')}>
                    <div className={cx('background-img')}>
                        {imageUrl ? (
                            <img src={imageUrl} alt="Loaded" className={cx('img')} />
                        ) : (
                            <p style={{ color: '#fff' }}>Không có ảnh bìa</p>
                        )}
                        <div className={cx('user-infor')}>
                            <img src={user?.image !== "" ? user?.image : "asset/img/avatar.jpg"} alt='' className={cx('avatar-img')}></img>
                            <div className={styles.nameUs}>
                                <p className={styles.nameUser}>{user?.username}</p>
                                <p className={styles.friendUs}>{user?.friend.length} Bạn bè</p>
                            </div>

                            <div className={cx('button-container')}>
                                <button
                                    className={cx('friend-request-btn', 'send-btn')}
                                    onClick={() => handleMessage()}
                                >
                                    Nhắn tin
                                </button>
                                {buttonState === 'send' && (
                                    <button
                                        className={cx('friend-request-btn', 'send-btn')}
                                        onClick={() => handleSendFriendRequest()}
                                    >
                                        Gửi lời mời kết bạn
                                    </button>
                                )}
                                {buttonState === 'pending' && (
                                    <button className={cx('friend-request-btn', 'pending-btn')}
                                        onClick={showModalPending}
                                    >
                                        Đang chờ phản hồi
                                    </button>
                                )}
                                {buttonState === 'sent' && (
                                    <button
                                        className={cx('friend-request-btn', 'sent-btn')}
                                        onClick={showModalSent}
                                    >
                                        Phản hồi yêu cầu
                                    </button>
                                )}
                                {buttonState === 'friend' && (
                                    <button className={cx('friend-request-btn', 'friend-btn')}
                                        onClick={showModal}
                                    >
                                        Bạn bè
                                    </button>
                                )}

                                {/* Modal xác nhận xóa bạn bè */}
                                <Modal
                                    title="Xác nhận"
                                    visible={isModalVisible} // Hiển thị modal nếu isModalVisible là true
                                    onOk={handleRemoveFriend} // Khi nhấn "OK", gọi API xóa bạn bè
                                    onCancel={handleCancel} // Khi nhấn "Hủy", đóng modal
                                    okText="Xóa"
                                    cancelText="Hủy"
                                >
                                    <p>Bạn có chắc chắn muốn xóa bạn bè?</p>
                                </Modal>

                                {/* Modal xác nhận hủy gửi lời mời */}
                                <Modal
                                    title="Xác nhận"
                                    visible={isModalVisiblePending}
                                    onOk={handleRemoveFriendRequest}
                                    onCancel={handleCancelPending}
                                    okText="Xóa"
                                    cancelText="Hủy"
                                >
                                    <p>Bạn có chắc chắn muốn hủy lời mời kết bạn?</p>
                                </Modal>
                                {/* Modal xác nhận lời mời */}
                                <Modal
                                    title="Xác nhận"
                                    visible={isModalVisibleSent}
                                    onOk={handleSendFriendConfirm}
                                    onCancel={handleRemoveFriendRequestSent}
                                    okText="Chấp nhận"
                                    cancelText="Hủy"
                                >
                                    <p>Bạn có muốn chấp nhận kết bạn?</p>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.headMenu}>
                    <Menu mode="horizontal" theme="light" defaultSelectedKeys={['1']} style={{ lineHeight: '64px' }}>
                        <Menu.Item key="1">
                            <Link to="post">Bài viết</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="about">Giới thiệu</Link>
                        </Menu.Item>
                    </Menu>
                </div>
            </div>
            <div className={cx('post')}><Post apiUrl={apiPostUserUrl} /></div>
        </div>
    );
}

export default ProfileOther;