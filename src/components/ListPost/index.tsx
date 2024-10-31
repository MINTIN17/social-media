import React from 'react';
import { Table, Button, Input, DatePicker } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { SearchOutlined, DashOutlined } from '@ant-design/icons';
import styles from './ListPost.module.scss';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

interface DataType {
  id: string;
  key: React.Key;
  email: string;
  date: string;
  address: string;
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
      title: 'Mã',
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
      title: 'Ngày đăng',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <DatePicker
            onChange={(date) => {
              const formattedDate = date ? date.format('YYYY-MM-DD') : '';
              setSelectedKeys(formattedDate ? [formattedDate] : []);
              confirm();
            }}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Button onClick={() => confirm()} size="small" type="primary" style={{ width: '100%' }}>
            Tìm kiếm
          </Button>
          <Button onClick={() => clearFilters && clearFilters()} size="small" style={{ width: '100%', marginTop: 8 }}>
            Đặt lại
          </Button>
        </div>
      ),
      onFilter: (value, record) => record.date.startsWith(value as string),
    },
    {
      title: 'Nội dung',
      dataIndex: 'address',
      render: (text: string) => truncateContent(text),
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
      onFilter: (value, record) => record.address.toLowerCase().includes((value as string).toLowerCase()),
      filterSearch: true,
      width: '40%',
    },
    {
      title: 'Xem chi tiết',
      key: 'action',
      render: (_, record) => (
        <div className={styles.buttonContainer}>
          <Button className={styles.btnPrf} onClick={handleLoginClick}>
            <DashOutlined />
          </Button>
        </div>
      ),
    },
  ];

  const data: DataType[] = [
    { key: '1', id: '001', email: 'John Brown', date: '2023-10-01', address: 'New York No. 1 Lake Park, this is a long address that exceeds twenty words to test the truncation functionality effectively.' },
    { key: '2', id: '002', email: 'Jim Green', date: '2023-09-15', address: 'London No. 1 Lake Park' },
    { key: '3', id: '003', email: 'Joe Black', date: '2023-08-20', address: 'Sydney No. 1 Lake Park' },
    { key: '4', id: '004', email: 'Jim Red', date: '2023-07-25', address: 'London No. 2 Lake Park' },
  ];

  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return <Table<DataType> columns={columns} dataSource={data} onChange={onChange} />;
};

export default ListPost;
