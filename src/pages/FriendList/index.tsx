import React from 'react';
import TaskBarFriend from '../../components/TaskbarFriend';
import ContentFriend from '../../components/ContentFriend';
const FriendList: React.FC = () => {
  return (
    <div style={{
      display: "flex"
    }}>
      <TaskBarFriend />
      <ContentFriend />

    </div>
  );
};

export default FriendList;
