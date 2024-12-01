import React from 'react';
import { Table, Button, Input, DatePicker, Space, Tooltip } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { SearchOutlined, DashOutlined, DeleteOutlined, UnlockOutlined } from '@ant-design/icons';
import styles from './ListPost.module.scss';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

interface DataType {
  id: string;
  key: React.Key;
  email: string;
  number: string;
  status: string;
}

// Hàm để rút gọn nội dung
const truncateContent = (content: string, limit: number = 10): string => {
  const words = content.split(' ');
  return words.length > limit ? words.slice(0, limit).join(' ') + ' ...' : content;
};

const ListPost: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = (): void => {
    navigate('./post');
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: 'STT',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id.localeCompare(b.id),
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
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: 'Tình trạng',
      dataIndex: 'status',
      
    },
    { 
      title: 'Quản lý bài viết',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
            <Tooltip title="Mở khóa bài viết">
              <Button className={styles.btnPrf} style={{ background: "greenyellow" }}>
                <UnlockOutlined />
              </Button>
            </Tooltip>

            <Tooltip title="Xóa bài viết">
              <Button className={styles.btnPrf} style={{ background: "red" }}>
                <DeleteOutlined />
              </Button>
            </Tooltip>
            <Tooltip title="Xem bài viết">
              <a href="">View</a>
            </Tooltip>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    { key: '1', id: '001', email: 'John Brown', number: '3', status: 'Chưa khóa' },
    { key: '2', id: '002', email: 'Jim Green', number: '4', status: 'Cảnh báo' },
    { key: '3', id: '003', email: 'Joe Black', number: '6', status: 'Cảnh báo' },
    { key: '4', id: '004', email: 'Jim Red', number: '10', status: 'Đã khóa' },
  ];

  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return <Table<DataType> columns={columns} dataSource={data} onChange={onChange} />;
};

export default ListPost;
