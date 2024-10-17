import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import {
  SettingOutlined,
  LikeOutlined,
  CommentOutlined,
  ShareAltOutlined,
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
        <div className={styles.headPost}>
          <img src={`${process.env.PUBLIC_URL}/asset/img/avtUs.jpg`} alt="avata" className={styles.avtPostUser}/>
          <p className={styles.namePostUser}>Nguyen Duc Thang</p>
          <Button className={styles.btnPostUs} onClick={showModal}>
            <SettingOutlined />
          </Button>
        </div>
        <div className={styles.contentPostUs}>
          <p className={styles.tusPostUs}>
            Thì ngại gì không nhận 1 vai
            Đúng thì nai mà sai thì cáo
            Cuộc đời nó láo
            Mình bát nháo để thêm vui
          </p>
          <img src={`${process.env.PUBLIC_URL}/asset/img/giaotiep.jpg`} alt="Post" className={styles.imgPostUs}/>
        </div>
        <hr />
        <div className={styles.iconPostUs}>
          <Button className={styles.btnPostUser} id={styles.noneClick}>
            <LikeOutlined />Like
          </Button>
          <Button className={styles.btnPostUser}>
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
