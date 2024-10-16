import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './AddImage.module.scss';

const cx = classNames.bind(styles);



interface ImageUploadModalProps {
    onClose: () => void; // Hàm gọi lại khi đóng modal
};

const AddImage: React.FC<ImageUploadModalProps> = ({ onClose }) => {
    const [images, setImages] = useState<File[]>([]);
    const [showAddImageButton, setShowAddImageButton] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setImages((prev) => [...prev, ...files].slice(0, 5)); // Giới hạn tối đa 5 ảnh
        setShowAddImageButton(true); // Hiện nút thêm ảnh khi có ít nhất 1 ảnh
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        setImages((prev) => [...prev, ...files].slice(0, 5)); // Giới hạn tối đa 5 ảnh
        setShowAddImageButton(true); // Hiện nút thêm ảnh khi có ít nhất 1 ảnh
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    return (
        <div className={cx('modal-add-img')} onDrop={handleDrop} onDragOver={handleDragOver}>
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id="upload-input"
            />
            <div 
                className={cx('add-img-button')} 
                onClick={() => document.getElementById('upload-input')?.click()}
            >
                <img src="/asset/icon/addimage.svg" alt="add-img" />
            </div>

            {showAddImageButton ? (
                <button className={cx('add-image-button')} onClick={() => document.getElementById('upload-input')?.click()}>
                    Thêm ảnh
                </button>
            ) : (
                <div className={cx('image-preview')}>
                    {images.slice(0, 4).map((image, index) => (
                        <img key={index} src={URL.createObjectURL(image)} alt="preview" className={cx('preview-img')} />
                    ))}
                    {images.length > 4 && (
                        <div className={cx('more-images')}>
                            <span>+{images.length - 4}</span>
                        </div>
                    )}
                    {images.length > 4 && (
                        <img
                            src={URL.createObjectURL(images[4])}
                            alt="preview"
                            className={cx('preview-img', 'faded')}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default AddImage;
