import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Space, Tooltip } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { SearchOutlined, DeleteOutlined, UnlockOutlined } from '@ant-design/icons';
import styles from './ListPost.module.scss';
import axios from 'axios';
import { successNotification, errorNotification } from '../Notification';

interface DataType {
  key: React.Key;
  id: string;
  email: string;
  number: number;
  postId: string;
}

const ListPost: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);

  const handleDeletePost = async (postId: string) => {
    const token = localStorage.getItem('accessToken');
    try {
      await axios.delete(`${process.env.REACT_APP_link_server}/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Xóa bài viết trong danh sách hiện tại
      setData((prevData) => prevData.filter((item) => item.postId !== postId));
      successNotification('Đã xóa vĩnh viễn bài viết');
    } catch (error) {
      errorNotification('Error')
      console.error('Error deleting post:', error);
    }
  };

  const handleUnlockReport = async (postId: string) => {
    const token = localStorage.getItem('accessToken');
    try {
      await axios.delete(`${process.env.REACT_APP_link_server}/post/report/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Cập nhật danh sách dữ liệu sau khi mở report
      setData((prevData) => prevData.filter((item) => item.postId !== postId));
      successNotification('Đã xóa bài viết khỏi danh sách report');
    } catch (error) {
      errorNotification('Error');
      console.error('Error unlocking report:', error);
    }
  };
  
  

  const fetchDataReportPost = async () => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await axios.get(`${process.env.REACT_APP_link_server}/post/report`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Xử lý dữ liệu trả về từ API
      const fetchedData = response.data.map((item: any, index: number) => ({
        key: index + 1,
        id: item.post_owner.user_id,
        email: item.post_owner.email,
        number: item.report_count,
        postId: item.post_id,
      }));

      setData(fetchedData);
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  };

  useEffect(() => {
    fetchDataReportPost();
  }, []);

  const columns: TableColumnsType<DataType> = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }: any) => (
        <div style={{ padding: 8 }}>
          <Input
            autoFocus
            placeholder="Nhập từ khóa"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              confirm({ closeDropdown: false });
            }}
            onPressEnter={confirm}
            onBlur={confirm}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Button onClick={confirm} icon={<SearchOutlined />} size="small" type="primary">
            Tìm kiếm
          </Button>
          <Button onClick={clearFilters} size="small">
            Đặt lại
          </Button>
          <Button type="link" size="small" onClick={close}>
            Đóng
          </Button>
        </div>
      ),
      onFilter: (value, record) => record.email.toLowerCase().includes((value as string).toLowerCase()),
    },
    {
      title: 'Lượt report',
      dataIndex: 'number',
      key: 'number',
      sorter: (a, b) => a.number - b.number,
    },
    {
      title: 'Quản lý bài viết',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Mở report bài viết">
              <Button className={styles.btnPrf} style={{ background: "greenyellow" }} onClick={() => handleUnlockReport(record.postId)}>
                <UnlockOutlined style={{ color: "#fff" }}/>
              </Button>
            </Tooltip>
          <Tooltip title="Xóa bài viết">
            <Button
              className={styles.btnPrf}
              style={{ background: 'red' }}
              onClick={() => handleDeletePost(record.postId)} // Gọi hàm xóa
            >
              <DeleteOutlined style={{ color: "#fff" }} />
            </Button>
          </Tooltip>
          <Tooltip title="Xem bài viết">
            <a href={`/post/view/${record.postId}`}>View</a>
          </Tooltip>
        </Space>
      ),
    }    
  ];

  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return <Table<DataType> columns={columns} dataSource={data} onChange={onChange} />;
};

export default ListPost;
