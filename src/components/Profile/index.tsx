import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { useEffect, useState } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImage'; // Ensure this function is correctly defined
import Post from '../../components/Post';
import uploadFile from '../../api/uploadImage';
import axios from 'axios';

const cx = classNames.bind(styles);
const userId = localStorage.getItem('userId');
const apiPostUserUrl = `${process.env.REACT_APP_link_server}/post/user/${userId}`;
const apiSetBgImgUrl = `${process.env.REACT_APP_link_server}/account/change-background`;

// Define the type for cropped area pixels
interface CroppedAreaPixels {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface user {
    _id: string,
    username: string,
    email: string,
    status: string,
    friend: string[],
    background_image: string,
}

const ProfilePage: React.FC = () => {
    const [userName, setUserName] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string>(""); // Initialize as empty string
    const [cropperOpen, setCropperOpen] = useState<boolean>(false);
    const [image, setImage] = useState<File | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixels | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
        const userName = localStorage.getItem('userName');
        if (userName) {
            setUserName(userName);
        }
    }, []);

    const fetchBgImg = async (img_crop_url: string) => {
        try {
            const payload = {
                backgroundLink: img_crop_url,
                userId: userId
            };
            const response = await axios.put(apiSetBgImgUrl, payload);
            // Uncomment if you need to check the response
            // console.log(response.data);
        } catch (error) {
            setError('Có lỗi xảy ra khi lấy dữ liệu.');
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setImage(file);
            setCropperOpen(true);
        }
    };

    const handleCropComplete = (croppedArea: any, pixels: CroppedAreaPixels) => {
        setCroppedAreaPixels(pixels);
    };

    const handleSaveCrop = async () => {
        if (image && croppedAreaPixels) {
            const croppedImage = await getCroppedImg(image, croppedAreaPixels);
            const uploadedImageUrl = await uploadFile(croppedImage); // Upload cropped image and get URL
            setImageUrl(uploadedImageUrl); // Set the uploaded image URL
            await fetchBgImg(uploadedImageUrl); // Fetch background image with the uploaded URL
            setCropperOpen(false);
        }
    };

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
                        <div className={cx('add-background-img')} onClick={() => document.getElementById('file-input')?.click()}>
                            Thêm ảnh bìa
                        </div>
                        <input 
                            id="file-input" 
                            type="file" 
                            accept="image/*" 
                            style={{ display: 'none' }} 
                            onChange={handleImageChange} 
                        />
                        <div className={cx('user-infor')}>
                            <div className={cx('avatar')}>
                                <img src='/asset/img/avatar.jpg' alt='' className={cx('avatar-img')}></img>
                            </div>
                            <div className={cx('infor')}>
                                <div className={cx('user-name')}><p><span>{userName}</span></p></div>
                                <div className={cx('friend-quantity')}><p><span>{userName} bạn bè</span></p></div>
                            </div>
                            <div className={cx('edit-profile')}>
                                <img src='/asset/icon/edit.svg' alt='edit-icon' className={cx('edit-icon')}/>
                                Chỉnh sửa trang cá nhân
                            </div>
                        </div>
                    </div>  
                    {cropperOpen && (
                        <div className={cx('cropper')}>
                            <Cropper
                                image={URL.createObjectURL(image!)} // Chuyển đổi file thành URL
                                crop={crop}
                                zoom={zoom}
                                aspect={12 / 5}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={handleCropComplete}
                            />
                            <button className={cx('save-button')} onClick={handleSaveCrop}>Lưu ảnh bìa</button>
                        </div>
                    )}
                </div>
            </div>
            <div className={cx('post')}><Post apiUrl={apiPostUserUrl}/></div>
        </div>
    );
};

export default ProfilePage;
