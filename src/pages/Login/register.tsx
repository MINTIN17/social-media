import React, { useState, ChangeEvent, FormEvent } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import axios from 'axios'
import { successNotification } from '../../components/Notification';
const cx = classNames.bind(styles);

const Register: React.FC = () => {

    // Define the state with explicit typing
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repassword, setRepassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    // Event handler with proper types
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        // Kiểm tra xem có bất kỳ trường nào còn trống không
        if (!name || !email || !password || !repassword) {
            setError('Please fill in all fields.');
        } else if (password !== repassword) { 
            setError('Passwords do not match.');
        } else {
            setError('');
            // In ra các giá trị
            console.log('Email:', email);
            console.log('Password:', password);
            try {
                const response = await axios.post(`${process.env.REACT_APP_link_server}/account/signup`, {
                    username: name,
                    email,
                    password,
                });
                const data = response.data;
                console.log(data);
                
                successNotification("Đăng kí thành công");
            } catch (err: any) {
                if (err.response) {
                    // Lỗi từ server, in chi tiết phản hồi
                    console.log('Server Response:', err.response.data);
                    setError('Đăng kí thất bại: ' + err.response.data.message);
                } else {
                    setError('Có lỗi xảy ra, vui lòng thử lại.');
                }
            }         
        }
    };

    // Function to handle onChange with proper event typing
    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
    const handleRepasswordChange = (e: ChangeEvent<HTMLInputElement>) => setRepassword(e.target.value);

    return (
        <div className={cx('form-container', 'register-container')}>
            <form onSubmit={handleSubmit}> {/* Gán handleSubmit vào sự kiện onSubmit */}
                <h1 className={cx('nick')}>Đăng ký</h1>
                <input 
                    type="text" 
                    placeholder="Tên" 
                    value={name} 
                    onChange={handleNameChange} 
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={handleEmailChange} 
                />
                <input 
                    type="password" 
                    placeholder="Mật khẩu" 
                    value={password} 
                    onChange={handlePasswordChange} 
                />
                <input 
                    type="password" 
                    placeholder="Xác nhận mật khẩu" 
                    value={repassword} 
                    onChange={handleRepasswordChange} 
                />
                {error && <p style={{ color: '#440000', fontSize: '10px' }}>{error}</p>} {/* Hiển thị thông báo lỗi nếu có */}
                <button className={cx('btnLo')} type='submit'>Đăng ký</button>
            </form>
        </div>
    );
};

export default Register;
