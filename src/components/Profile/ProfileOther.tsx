import { Link, useParams } from "react-router-dom";
import Post from "../../components/Post";
import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
import { Menu } from "antd";
import { useEffect, useState } from "react";
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
    const [user, setUser] = useState<user>();
    const [imageUrl, setImageUrl] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    
    const { id } = useParams();
    const apiPostUserUrl = `${process.env.REACT_APP_link_server}/post/user/${id}`;

    const fetchUser = async () : Promise<user | null> => {
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

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchUser(); 
            if (data) {
                setUser(data);
                setImageUrl(data.background_image);
            }
        };
        fetchData();
        console.log(apiPostUserUrl);

    }, []);
    
    return (  
        <div className={cx('wrapper')}>
            <div className={cx('profile-container')}>
                <div className={cx('profile')}>
                    <div className={cx('background-img')}>
                        {imageUrl ? (
                            <img src={imageUrl} alt="Loaded" className={cx('img')}/> 
                        ) : (
                            <p style={{color: '#fff'}}>Không có ảnh bìa</p>
                        )}
                        <div className={cx('user-infor')}>
                            {/* <div className={cx('avatar')}>
                                <img src='/asset/img/avatar.jpg' alt='' className={cx('avatar-img')}></img>
                            </div>
                            <div className={cx('infor')}>
                                <div className={cx('user-name')}><p>{ userName }Nguyen Duc Thang</p></div>
                                <div className={cx('friend-quantity')}><p><span>{ userName } bạn bè</span></p></div>
                            </div> */}
                            <img src='/asset/img/avatar.jpg' alt='' className={cx('avatar-img')}></img>
                            <div className={styles.nameUs}>
                              <p className={styles.nameUser}>{ user?.username }</p>
                              <p className={styles.friendUs}>{ user?.friend.length } Bạn bè</p>
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
            <div className={cx('post')}><Post apiUrl={apiPostUserUrl}/></div>
        </div>
    );
}

export default ProfileOther;