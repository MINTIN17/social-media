import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Post.module.scss';
import axios from 'axios';

const cx = classNames.bind(styles);

interface post {
    _id : string,
    user_id : string, 
    content : string, 
    status : string,
    like_user_id : string[],
    dislike_user_id : string[],
    comment_user_id : string[],
    tag : string[],
    group_id : string,
    created_time : string,
    updateAt : Date,
    __v : number,
}


const Post: React.FC = () => {
    const [items, setItems] = useState<post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
  
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const Posts = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_link_server}/post`);
          const data: post[] = await response.data;
          setItems(data);
        } catch (error) {
          setError('Có lỗi xảy ra khi lấy dữ liệu.');
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };

      Posts();
    }, []);
  
    if (loading) { 
      return <div style={{backgroundColor : '#17181C', display: 'flex', justifyContent : 'content', color : '#fff'}}>Loading...</div>;
    }

    const formatDate = (isoDate: string): string => {
      const date = new Date(isoDate);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
  
    return (
      <div className={cx('wrapper')}>
        {items.length === 0 ? (
          <div className={cx('no-post')}>Không có bài viết nào</div>
        ) : (
          <div className={cx('Posts')}>
            {items.map((item) => (
              <div key={item._id} className={cx('Post')}>
                <div className={cx('post-infor')}>
                  <div className={cx('avatar')}>
                    <img src="/asset/img/avatar.jpg" alt="avatar-img" className={cx('avatar-img')} />
                  </div>
                  <div className={cx('name')}>
                    <div className={cx('user-name')}>
                      Nguyen
                    </div>
                    <div className={cx('time-post')}>
                      {formatDate(item.created_time)}
                    </div>
                  </div>
                </div>
                <div className={cx('content')}>
                  {item.content}
                </div>
                <div className={cx('image-container')}>
                  
                </div>
                <div className={cx('infor-post')}> 
                  1234
                </div>
                <div className={cx('line')}></div>
                <div className={cx('action')}>
                  <div className={cx('reaction', 'child')}>
                    <img src='/asset/icon/like.svg' alt='like-icon' className={cx('like-icon')}/>
                    Thích
                    </div>
                  <div className={cx('comment', 'child')}>
                    <img src='/asset/icon/comment.svg' alt='comment-icon' className={cx('comment-icon')}/>
                    Bình luận
                  </div>
                  <div className={cx('share', 'child')}>
                    <img src='/asset/icon/share.svg' alt='share-icon' className={cx('share-icon')}/>
                    Chia sẻ</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

export default Post;