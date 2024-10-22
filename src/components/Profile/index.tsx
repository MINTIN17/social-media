import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { useEffect, useState } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImage'; // Ensure this function is correctly defined

const cx = classNames.bind(styles);

// Define the type for cropped area pixels
interface CroppedAreaPixels {
    x: number;
    y: number;
    width: number;
    height: number;
}

const ProfilePage: React.FC = () => {
    const [userName, setUserName] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [cropperOpen, setCropperOpen] = useState<boolean>(false);
    const [image, setImage] = useState<File | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixels | null>(null);
  
    useEffect(() => {
        const userName = localStorage.getItem('userName');
        if (userName) {
            setUserName(userName);
        }
    }, []);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setImage(file);
            setCropperOpen(true);
        }
    };

    // Explicitly type the parameters for handleCropComplete
    const handleCropComplete = (croppedArea: any, pixels: CroppedAreaPixels) => {
        setCroppedAreaPixels(pixels);
    };

    const handleSaveCrop = async () => {
        if (image && croppedAreaPixels) {
            const croppedImageUrl = await getCroppedImg(image, croppedAreaPixels);
            setImageUrl(croppedImageUrl);
            setCropperOpen(false);
        }
    };

    return (  
        <div className={cx('wrapper')}>
            <div className={cx('profile')}>
                <div className={cx('background-img')}>
                    {imageUrl ? (<img src={imageUrl} alt="Loaded" className={cx('img')}/>) 
                    : (<p style={{color: '#fff'}}>Không có ảnh bìa</p>)}
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
                            <div className={cx('user-name')}><p><span>{ userName }</span></p></div>
                            <div className={cx('friend-quantity')}><p><span>{ userName } bạn bè</span></p></div>
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
    );
};

export default ProfilePage;
