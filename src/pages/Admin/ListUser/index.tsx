import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Modal, Space, Tag } from 'antd';
import type { TableProps } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { successNotification, errorNotification, warningNotification } from '../../../components/Notification/index';
import axios from 'axios';

interface DataType {
    key: React.Key;
    id: string;
    email: string;
    gender: string;
    phone: number;
    role: string;
    status: string;
}

const ListUser: React.FC = () => {
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [selectedUser, setSelectedUser] = useState<DataType | null>(null);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const navigate = useNavigate();

    const dataSource: DataType[] = [
        {
            key: '1',
            id: '001',
            email: 'mike@example.com',
            gender: 'Nam',
            phone: 1234567890,
            role: 'Quản trị viên',
            status: 'Chưa khóa',
        },
        {
            key: '2',
            id: '002',
            email: 'john@example.com',
            gender: 'Nữ',
            phone: 987654321,
            role: 'Người dùng',
            status: 'Đã khóa',
        },
        {
            key: '3',
            id: '003',
            email: 'alice@example.com',
            gender: 'Nữ',
            phone: 1122334455,
            role: 'Quản trị viên',
            status: 'Chưa khóa',
        },
        {
            key: '4',
            id: '004',
            email: 'bob@example.com',
            gender: 'Nam',
            phone: 2233445566,
            role: 'Người dùng',
            status: 'Đã khóa',
        },
        {
            key: '5',
            id: '005',
            email: 'charlie@example.com',
            gender: 'Nam',
            phone: 3344556677,
            role: 'Người dùng',
            status: 'Chưa khóa',
        },
        {
            key: '6',
            id: '006',
            email: 'diana@example.com',
            gender: 'Nữ',
            phone: 4455667788,
            role: 'Người dùng',
            status: 'Đã khóa',
        },
        {
            key: '7',
            id: '007',
            email: 'eva@example.com',
            gender: 'Nữ',
            phone: 5566778899,
            role: 'Quản trị viên',
            status: 'Chưa khóa',
        },
        {
            key: '8',
            id: '008',
            email: 'frank@example.com',
            gender: 'Nam',
            phone: 6677889900,
            role: 'Người dùng',
            status: 'Đã khóa',
        },
        {
            key: '9',
            id: '009',
            email: 'grace@example.com',
            gender: 'Nữ',
            phone: 7788990011,
            role: 'Quản trị viên',
            status: 'Chưa khóa',
        },
        {
            key: '10',
            id: '010',
            email: 'henry@example.com',
            gender: 'Nam',
            phone: 889900112,
            role: 'Người dùng',
            status: 'Đã khóa',
        },
        {
            key: '11',
            id: '011',
            email: 'isabel@example.com',
            gender: 'Nữ',
            phone: 9900112233,
            role: 'Quản trị viên',
            status: 'Chưa khóa',
        },
    ];

    
    const handleViewProfile = (record: DataType) => {
        navigate(`./${record.email}`);
    };

    const showModal = (record: DataType) => {
        setSelectedUser(record);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        if (selectedUser) {
            if (selectedUser.status === 'Đã khóa') {
                warningNotification('Tài khoản đã bị khóa');
            } else {
                successNotification('Khóa tài khoản thành công');
                // Update user status in the data source (if state management is implemented)
            }
            setIsModalVisible(false);
            setSelectedUser(null);
        } else {
            errorNotification('Khóa tài khoản thất bại');
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Mã',
            dataIndex: 'id',
            key: 'id',
            sorter: (a: DataType, b: DataType) => a.id.localeCompare(b.id),
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
            onFilter: (value, record) => record.email.includes(value as string),
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender',
            filters: [
                { text: 'Nam', value: 'Nam' },
                { text: 'Nữ', value: 'Nữ' },
            ],
            onFilter: (value, record) => record.gender.includes(value as string),
        },
        {
            title: 'SĐT',
            dataIndex: 'phone',
            key: 'phone',
            sorter: (a: DataType, b: DataType) => a.phone - b.phone,
        },
        {
            title: 'Chức vụ',
            dataIndex: 'role',
            key: 'role',
            filters: [
                { text: 'Quản trị viên', value: 'Quản trị viên' },
                { text: 'Người dùng', value: 'Người dùng' },
            ],
            onFilter: (value, record) => record.role.includes(value as string),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => <Tag color={status === 'Đã khóa' ? 'red' : 'green'}>{status}</Tag>,
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => handleViewProfile(record)}>Xem hồ sơ</Button>
                    <Button type="primary" danger onClick={() => showModal(record)}>
                        Khóa tài khoản
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table
                columns={columns}
                dataSource={dataSource}
                pagination={{
                    current: page,
                    pageSize: 8,
                    onChange: (page, pageSize) => {
                        setPage(page);
                        setPageSize(pageSize);
                    },
                }}
            />
            <Modal title="Khóa tài khoản" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Bạn có chắc chắn muốn khóa tài khoản của người dùng: {selectedUser?.email}?</p>
            </Modal>
        </>
    );
};

export default ListUser;
