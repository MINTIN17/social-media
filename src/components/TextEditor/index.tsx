import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import uploadFile from '../../api/uploadImage';

// Define props interface for TextEditor
interface TextEditorProps {
    onChange: (content: string, images: string[]) => void;
    onImageChange: (images: string[]) => void;
}

const images: string[] = [];

const uploadImage = function () {
    let fileInput: HTMLInputElement | null = null;
    if (fileInput == null) {
        fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
        fileInput.classList.add('ql-image');

        fileInput.addEventListener('change', async () => {
            if (fileInput?.files != null && fileInput.files[0] != null) {
                const file = fileInput.files[0];

                try {
                    const res = await uploadFile(file);
                    const url = res;

                    const imgElement = document.createElement('img');
                    imgElement.src = url;
                    imgElement.alt = 'photo';
                    imgElement.style.width = '250px';
                    imgElement.style.margin = '5px';

                    const imagesContainer = document.getElementById('imagesContainer');
                    if (imagesContainer) {
                        imagesContainer.appendChild(imgElement);
                    }

                    images.push(url);

                    console.log('Image URL:', url);
                } catch (err) {
                    console.error(err);
                }
            }
        });
    }

    fileInput.click();
}

const modules = {
    toolbar: {
        container: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" }
            ],
            ["link", "image", "video"],
            ["code-block"],
            ["clean"],
        ],
        handlers: {
            image: uploadImage
        }
    },
    clipboard: {
        matchVisual: false,
    },
}

const TextEditor: React.FC<TextEditorProps> = ({ onChange, onImageChange }) => {
    const [value, setValue] = useState<string>('');

    const handleChange = (content: string) => {
        setValue(content);
        onChange(content, images); // Pass updated content and images
        console.log('Current Editor Content:', content);
        console.log('Current Editor Images:', images);
    };

    return (
        <div>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={handleChange}
                modules={modules}
            />
            <div
                id="imagesContainer"
                style={{
                    maxHeight: '250px',
                    overflowX: 'scroll',
                    border: '1px solid #ccc',
                    marginTop: '10px',
                    padding: '5px',
                    display: 'flex',
                }}
            >
                {/* Images will be appended here */}
            </div>
        </div>
    );
}

export default TextEditor;
