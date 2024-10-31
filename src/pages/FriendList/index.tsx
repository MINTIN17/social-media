import React from 'react';
import TaskBarFriend from '../../components/TaskbarFriend';
import ContentFriend from '../../components/ContentFriend';
import Header from '../../components/Header';
const FriendList: React.FC = () => {
  return (
    <div>
      <Header />
      <div style={{
        display: "flex"
      }}>
        <TaskBarFriend />
        <ContentFriend />

      </div>
    </div>
  );
};

export default FriendList;
