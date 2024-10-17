import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Post.module.scss';

const cx = classNames.bind(styles);

interface post {
    _id : string,
    user_id : string,
    content : string, 
    stattus : string,
    like_user_id : string[],
    dislike_user_id : string[],
    comment_user_id : string[],
    tag : string[],
    group_id : string,
    created_time : string,
    updateAt : Date,
    __v : 0,
}


const Post: React.FC = () => {
    const [items, setItems] = useState<post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://pbl6-server-nestjs.onrender.com/post');
          const data: post[] = await response.json();
          setItems(data);
          console.log(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
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
                  {item._id}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

export default Post;