import React, { useState, ChangeEvent, FormEvent } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';

import styles from '../ForgotPassword/ForgotPassword.module.scss';
import TaskbarTop from '../../components/TaskbarTop';

const cx = classNames.bind(styles);

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');

    // Hàm xử lý khi người dùng nhấn nút "Login"
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        // Proper event typing
        e.preventDefault();

        // Kiểm tra xem email và password có được nhập hay không
        if (!email) {
            setError('Please fill in both email.');
        } else {
            setError('');
            // Thực hiện các thao tác khác sau khi kiểm tra thành công, ví dụ như gửi dữ liệu lên server
            console.log('email:', email);

            try {
                const response = await axios.post('https://pbl6-server-nestjs.onrender.com/account/forgot-password', {
                    email,
                });
                console.log(response.data);
                // navigate('/reset_password')
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
    };

    return (
        <div className={cx('container')}>
            <TaskbarTop />
            <div className={cx('form-container', 'forgot-password-container')}>
                <form onSubmit={handleSubmit}>
                    <h1 className={cx('nick')}>Nhập email đã đăng kí</h1>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} // Typing for onChange event
                    />
                    {error && <p style={{ color: '#440000', fontSize: '10px' }}>{error}</p>}{' '}

                    <button className={cx('btnLo')} type="submit">
                        Forgot Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
