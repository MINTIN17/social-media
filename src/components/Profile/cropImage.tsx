const getCroppedImg = (image: File, crop: { x: number; y: number; width: number; height: number }): Promise<File> => {
    return new Promise((resolve, reject) => {
        const imageElement = document.createElement('img');
        imageElement.src = URL.createObjectURL(image);

        imageElement.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                reject(new Error("Failed to get canvas context"));
                return;
            }

            // Tính toán kích thước canvas dựa trên crop
            const scaleX = imageElement.naturalWidth / imageElement.width;
            const scaleY = imageElement.naturalHeight / imageElement.height;

            canvas.width = crop.width;
            canvas.height = crop.height;

            ctx.drawImage(
                imageElement,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height
            );

            canvas.toBlob((blob) => {
                if (blob) {
                    // Tạo một File từ blob với tên và type
                    const croppedImageFile = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });
                    resolve(croppedImageFile);
                } else {
                    reject(new Error("Failed to create blob"));
                }
            }, 'image/jpeg');
        };

        imageElement.onerror = () => {
            reject(new Error("Failed to load image"));
        };
    });
};

export default getCroppedImg;
