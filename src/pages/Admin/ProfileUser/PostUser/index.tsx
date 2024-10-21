import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import {
  SettingOutlined,
  LikeOutlined,
  CommentOutlined,
  ShareAltOutlined,
  LikeFilled
} from '@ant-design/icons';
import styles from './ListPostUser.module.scss'; // Import SCSS module

const PostUser: React.FC = () => {
  // State quản lý modal 
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Hàm mở modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Hàm đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className={styles.containerPostUs}> 
      <div className={styles.PostUser}>
        <div className={styles.headP}>
          <div className={styles.headPost}>
            <img src={`${process.env.PUBLIC_URL}/asset/img/avtUs.jpg`} alt="avata" className={styles.avtPostUser}/>
            <div>
              <p className={styles.namePostUser} id={styles.noneClick}>Nguyen Duc Thang</p>
              <p className={styles.timePostUser} id={styles.noneClick}>16/10/2024</p>
            </div>
            <Button className={styles.btnPostUs} onClick={showModal} id={styles.noneClick}>
              <SettingOutlined />
            </Button>
          </div>
          <div className={styles.contentPostUs}>
            <p className={styles.tusPostUs} id={styles.noneClick}> Thế gian mỹ nhân nhiều vô kể – Bụng mỡ như em được mấy người.</p>
            {/* <p className={styles.tusPostUs} id={styles.noneClick}>  Đúng thì nai mà sai thì cáo</p>
            <p className={styles.tusPostUs} id={styles.noneClick}>  Cuộc đời nó láo</p>
            <p className={styles.tusPostUs} id={styles.noneClick}>  Mình bát nháo để thêm vui</p> */}
          </div>
        </div>
        <img src={`${process.env.PUBLIC_URL}/asset/img/tushay.png`} alt="Post" className={styles.imgPostUs}/>
        <div className={styles.showLike}>
          <p className={styles.like} id={styles.noneClick}><LikeFilled className={styles.iconShow}/> 299</p>
          <div className={styles.showCmt}>
            <p className={styles.cmt} id={styles.noneClick}>10 Binh luan</p>
            <p className={styles.cmt} id={styles.noneClick}>10 Share</p>
          </div>
        </div>
        <hr/>
        <div className={styles.iconPostUs}>
          <Button className={styles.btnPostUser} id={styles.noneClick}>
            <LikeOutlined />Like
          </Button>
          <Button className={styles.btnPostUser} id={styles.noneClick}>
            <CommentOutlined />Comment
          </Button>
          <Button className={styles.btnPostUser} id={styles.noneClick}>
            <ShareAltOutlined />Share
          </Button>
        </div>
      </div>

      {/* Modal hiển thị khi nhấn vào nút Setting */}
      <Modal 
        title="Cài đặt bài viết" 
        visible={isModalVisible} 
        onCancel={handleCancel} 
        className={styles.modalSettingPost}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary">
            Save Changes
          </Button>,
        ]}
      >
        <p>Nội dung cấu hình bài viết...</p>
      </Modal>
    </div>
  );
}

export default PostUser;
