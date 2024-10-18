import React from 'react';
import classNames from 'classnames/bind';
import styles from "../Overview/Overview.module.scss"; 
import { useNavigate } from 'react-router-dom'; 

const cx = classNames.bind(styles);  

const Homepage: React.FC = () => {
    const navigate = useNavigate(); 

    const handleLoginClick = (): void => {
        navigate('/Login');
    };

    return (
        <div className={cx('home-container')}> {/* Sử dụng cx */}
            <div className={cx('head-home')}>
                <div>
                    <p className={cx('nick-name')}>Trinity</p>
                </div>
                <button className={cx('btnLo', 'Home')} onClick={handleLoginClick}>Login/SignUp</button>
            </div>
            <div className={cx('content-home')}>
                <div className={cx('head-content')}>
                    <div className={cx('text-head')}>
                        <p className={cx('first')}>Kết nối và chia sẻ</p>
                        <p style={{ marginTop: 20 }}>Trang mạng xã hội trò chuyện để kết nối và chia sẻ với mọi người. 
                        Thách thức bản thân qua các nhiệm vụ và chia sẻ câu chuyện của bạn.</p>
                        <button className={cx('btnLo', 'Home')} id='Truycap' onClick={handleLoginClick}>Truy cập ngay</button>
                        <p className={cx('reminder')}>“Nhanh chóng và hoạt động hoàn hảo mỗi lần.”</p>
                        <p style={{ fontStyle: "italic" }}>--Jack Brown--</p>
                    </div>
                    <div className={cx('img-head')}>
                        <img src={`${process.env.PUBLIC_URL}/asset/img/moinguoi.png`} alt="moinguoi" className={cx('imgHo')}/>
                    </div>
                </div>
                
                <p className={cx('title')}>"Cộng đồng kết nối và chia sẻ - nơi mỗi câu chuyện đều đáng được kể!"</p>
                <p className={cx('title2')}>Trang mạng xã hội trò chuyện để kết nối và chia sẻ với mọi người.</p>

                <div className={cx('head-content')}>
                    <div className={cx('img-body')}>
                        <img src={`${process.env.PUBLIC_URL}/asset/img/imghome1.png`} alt="imghome1" className={cx('imgHo')}/>
                    </div>
                    <div className={cx('text-body')}>
                        <p className={cx('second')}>Thiết kế trang dễ dàng</p>
                        <p style={{ marginTop: 20 }}>Trang mạng xã hội trò chuyện để kết nối và chia sẻ với mọi người. 
                        Thách thức bản thân qua các nhiệm vụ và chia sẻ câu chuyện của bạn.</p>
                    </div>
                </div>

                <div className={cx('head-content')}>
                    <div className={cx('text-head')}>
                        <p className={cx('second')}>Giao tiếp nhanh chóng</p>
                        <p style={{ marginTop: 20 }}>Các công liên lạc như gọi điện, nhắn tin được ứng dụng ngay trên trang web để
                        mọi người dễ dàng sử dụng.</p>
                    </div>
                    <div className={cx('img-head')}>
                        <img src={`${process.env.PUBLIC_URL}/asset/img/imghome2.png`} alt="imghome1" className={cx('imgHo')}/>
                    </div>
                </div>

                <div className={cx('head-content')}>
                    <div className={cx('img-body')}>
                        <img src={`${process.env.PUBLIC_URL}/asset/img/imghome3.png`} alt="imghome2" className={cx('imgHo')}/>
                    </div>
                    <div className={cx('text-body')}>
                        <p className={cx('second')}>Học hỏi và phát triển</p>
                        <p style={{ marginTop: 20 }}>Cung cấp cơ hội học hỏi thông qua các nhóm, 
                        diễn đàn và các khóa học trực tuyến.</p>
                    </div>
                </div>

                <div className={cx('bottom-content')}>
                    <div className={cx('text-bottom')}>
                        <p className={cx('trip')}>Được cộng đồng tin tưởng</p>
                        <p className={cx('texttrip')}>“Mạng Xã Hội Trò Chuyện là một trong những dịch vụ tốt nhất tôi từng sử dụng. </p>
                        <p className={cx('texttrip')}>Trang của tôi được chăm sóc cẩn thận và chuyên nghiệp.” - Yan Scott</p>
                    </div>
                    <button className={cx('btnLo', 'Home')} id='Truycapbottom' onClick={handleLoginClick}>Truy cập trang</button>
                </div>
            </div>
        </div> 
    );
};

export default Homepage;
