import React, { useEffect, useState } from 'react';
import TextEditor from '../../components/TextEditor';
import TaskbarTop from '../../components/TaskbarTop';
import axios from 'axios';
import './diary.scss';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

type ImageUrlsType = string[];

const Diary: React.FC = () => {
  const [diaryContent, setDiaryContent] = useState<string>('');  // Type set to string
  const [imageUrls, setImageUrls] = useState<ImageUrlsType>([]);  // Type for image URLs
  const [date, setDate] = useState<Date>(new Date());  // Set initial date to today
  const [topLabel, setTopLabel] = useState<any>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());  // Store selected items
  const [images, setImages] = useState<string[]>([]);
  const location = useLocation();
  const { year, month, day } = location.state || {};
  const navigate = useNavigate();

  // Handle changes in the editor content and images
  const handleChange = (content: string, images: ImageUrlsType) => {
    setDiaryContent(content);
    setImageUrls(images);
  };

  // Handle image updates
  const handleImage = (images: ImageUrlsType) => {
    setImageUrls(images);
  };

  useEffect(() => {
    console.log('Updated Diary Content:', diaryContent);
    console.log('Updated Image Content:', imageUrls);
    console.log(year, month, day)
  }, [diaryContent, imageUrls]);

  function removeHtmlTags(input: string): string {
    return input.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:7000/predict', {
        text: removeHtmlTags(diaryContent),
        date: date.toISOString(),
      })
      .then(res => {
        const top = res.data.top_labels;
        setTopLabel(top)
        setIsModalVisible(true)
      })
      .catch(err => {
        console.error(err);
      })
    } catch (error) {
      console.error('Error posting diary entry:', error);
    }
  };

  const handleEmotionSelect = (index: number) => {
    setSelectedItems(prevState => {
      const newSelectedItems = new Set(prevState);
      if (newSelectedItems.has(index)) {
        newSelectedItems.delete(index);  // Remove from selection if already selected
      } else {
        newSelectedItems.add(index);  // Add to selection if not selected
      }
      return newSelectedItems;
    });
  };

  const confirmEmotion = () => {
    let emotion: { emotion_name: any; emotion_percent: any; }[] = [];
    selectedItems.forEach(index => {
      emotion.push({
        emotion_name: topLabel[index].label,
        emotion_percent: topLabel[index].probability
      });
    });
    
    console.log(topLabel)
    console.log(emotion); // Debugging: Ensure the correct structure of the emotion array.
    const diaryDay = new Date(year, month - 1, day)
    axios.post(`${process.env.REACT_APP_link_server}/diary`, {
      user_id: localStorage.getItem('userId'),
      content: diaryContent, // Ensure `diaryContent` is properly defined elsewhere.
      emotion: emotion,  // Pass the dynamically created emotion array.
      day: diaryDay,
      images: imageUrls,
    })
    .then(response => {
      console.log('Diary entry created successfully:', response.data);
      setIsModalVisible(false);
      console.log(day, month, year, diaryDay)
    })
    .catch(error => {
      console.error('Error creating diary entry:', error);
    })
    .finally(
      () => {
        navigate('/calendar')
      }
    )
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
        </div>
        <div style={{
          fontWeight: "500",
          fontSize: "20px",
          marginBottom: " 5px"
        }}>Ngày: {day}/{month}/{year}</div>
        <TextEditor onChange={handleChange} onImageChange={handleImage} />
      </div>
      <div className="diary-footer">
        <div className="diary-button" onClick={handleSubmit}>
          Hoàn thành
        </div>
      </div>

      {isModalVisible ? (
        <div className="diary-modal">
          <div className="modal-content">
            <div className="modal-text">
              Các cảm xúc nhận diện được của bạn<span>{':>'}</span>
            </div>
            <div className="option_container">
              {topLabel.map((item: { label: string; probability: number }, index: number) => (
                <div className={`emotion `} key={index} onClick={() => handleEmotionSelect(index)}>
                  <div className={`emotion_item ${selectedItems.has(index) ? 'emotion_item_selected' : 'emotion_item_unselected'}`}>
                    <span 
                      className={`emotion_item_option ${selectedItems.has(index) ? 'emotion_item_option_enable' : 'emotion_item_option_unenable'}`}
                    >
                    </span>
                    <div className="emotion_item_number">{index + 1}</div>
                    <div className="emotion_item_index">
                      <div className="emotion_item_index_label">{item.label}</div>
                      <div className="emotion_item_index_probability">{(item.probability).toFixed(2)}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='modal_confirm'>
              <div className='modal_confirm_button' onClick={confirmEmotion}>
                Xác nhận
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Diary;
