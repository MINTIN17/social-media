import React, { useEffect, useState } from 'react';
import TextEditor from '../../components/TextEditor';
import TaskbarTop from '../../components/TaskbarTop';
import axios from 'axios';
import './diary.scss';

// Define the types for the image URLs as an array of strings
type ImageUrlsType = string[];

const Diary: React.FC = () => {
  const [diaryContent, setDiaryContent] = useState<string>('');  // Type set to string
  const [imageUrls, setImageUrls] = useState<ImageUrlsType>([]);  // Type for image URLs

  // Handle changes in the editor content and images
  const handleChange = (content: string, images: ImageUrlsType) => {
    setDiaryContent(content);
    setImageUrls(images);
    console.log('Updated Diary Content:', content);
    console.log('Updated Image Content:', images);
  };

  // Handle image updates
  const handleImage = (images: ImageUrlsType) => {
    setImageUrls(images);
  };

  useEffect(() => {
    console.log('Updated Diary Content:', diaryContent);
    console.log('Updated Image Content:', imageUrls);
  }, [diaryContent, imageUrls]);

  // Function to remove HTML tags from content
  function removeHtmlTags(input: string): string {
    return input.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  }

  // Handle the form submission to send the diary data
  const handleSubmit = async () => {
    try {
      console.log({
        content: removeHtmlTags(diaryContent),
        images: imageUrls,
        date: new Date().toISOString(),
      });

      const response = await axios.post('http://localhost:5000/predict', {
        text: removeHtmlTags(diaryContent),
        // images: imageUrls,
        // date: new Date().toISOString(),
      });
      console.log('Response from API:', response.data);
    } catch (error) {
      console.error('Error posting diary entry:', error);
    }
  };

  return (
    <div>
      <div className="background">
        <img src="/asset/img/notebook_bg.jpg" alt="Notebook Background" />
        <div className="black-overlay"></div>
      </div>
      <TaskbarTop />
      <div className="diary-container">
        <div className="diary-header">
          <img className="diary-character" src="/asset/img/diary_character.png" alt="Diary Character" />
          <img className="diary-conversation-box" src="/asset/img/conversation_box.png" alt="Conversation Box" />
          <div className="diary-line">Ngày hôm nay của bạn thế nào</div>
          <div className="diary-date">
            <span style={{ marginRight: '20px' }}>Ngày:</span>24/09/2024
          </div>
        </div>
        {/* Pass handleChange and handleImage props to TextEditor */}
        <TextEditor onChange={handleChange} onImageChange={handleImage} />
      </div>
      <div className="diary-footer">
        <div className="diary-button" onClick={handleSubmit}>
          Hoàn thành
        </div>
      </div>
    </div>
  );
};

export default Diary;
