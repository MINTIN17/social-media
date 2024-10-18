import React, { useState, ChangeEvent, FormEvent } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import styles from './Login.module.scss';
const cx = classNames.bind(styles);

interface account {
    userName: string
    userId: any
    accessToken: string;
}

const Login: React.FC = () => {
    // Tạo state để lưu trữ giá trị của email và password
    const [email, setEmail] = useState<string>(''); // Explicit typing for state variables
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate(); // Hook để điều hướng
    
    // Hàm xử lý khi người dùng nhấn nút "Login"
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        // Proper event typing
        e.preventDefault();

        // Kiểm tra xem email và password có được nhập hay không
        if (!email || !password) {
            setError('Please fill in both email and password.');
        } else {
            setError('');
            // Thực hiện các thao tác khác sau khi kiểm tra thành công, ví dụ như gửi dữ liệu lên server
            console.log('email:', email);
            console.log('Mat khau:', password);

            try {
                const response = await axios.post(`${process.env.REACT_APP_link_server}/account/login`, {
                    email,
                    password,
                });
                const data: account = response.data;
                console.log(data);
                localStorage.setItem('userName', data.userName);
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('accessToken', data.accessToken);
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
    };

    return (
        <div className={cx('form-container', 'login-container')}>
            <form onSubmit={handleSubmit}>
                <h1 className={cx('nick')}>Login here.</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} // Typing for onChange event
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} // Typing for onChange event
                />
                {error && <p style={{ color: '#440000', fontSize: '10px' }}>{error}</p>}{' '}
                {/* Hiển thị thông báo lỗi nếu có */}
                <div className={cx('content')}>
                    <a href="/forgot_password" className={cx('pass-link')}>
                        Forgot password?
                    </a>
                </div>
                <button className={cx('btnLo')} type="submit">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
