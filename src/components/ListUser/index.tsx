import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Modal, Space, Tag } from 'antd';
import type { TableProps } from 'antd';
import { SearchOutlined, UserOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { successNotification, errorNotification, warningNotification } from '../Notification/index';
import styles from "./ListUser.module.scss";
import axios from 'axios';

interface DataType {
    _id: React.Key;
    email: string;
    username: string;
    created_at: string;
    role: string;
    status: string;
}

const ListUser: React.FC = () => {
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [selectedUser, setSelectedUser] = useState<DataType | null>(null);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const navigate = useNavigate();

    const [dataSource, setDataSource] = useState([]);

    const fetchDataUser = () => {
        const token = localStorage.getItem('accessToken');
        axios
            .get(`${process.env.REACT_APP_link_server}/account`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Replace `token` with your actual token variable
                },
            })
            .then((response) => {
                setDataSource(response.data)
                console.log(response.data);
            })
            .catch((error) => {
                // Handle errors
                console.error('Error fetching user data:', error);
            });
    };

    useEffect(() => {
        fetchDataUser();
    }, []);


    const handleViewProfile = (record: DataType) => {
        navigate(`/profile/${record._id}`);
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
        // {
        //     title: 'Mã',
        //     dataIndex: '_id',
        //     key: '_id',
        //     sorter: (a: DataType, b: DataType) => a._id.localeCompare(b._id),
        // },
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
            title: 'Tên hiển thị',
            dataIndex: 'username',
            key: 'username',
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
            onFilter: (value, record) => record.username.includes(value as string),        
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'created_at',
            key: 'created_at',
            // sorter: (a: DataType, b: DataType) => a.phone - b.phone,
        },
        {
            title: 'Chức vụ',
            dataIndex: 'role',
            key: 'role',
            filters: [
                { text: 'admin', value: 'admin' },
                { text: 'user', value: 'user' },
            ],
            onFilter: (value, record) => record.role.includes(value as string),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => <Tag color={status === 'Đã khóa' ? 'red' : 'green'}>{status}</Tag>,
            filters: [
                { text: 'normal', value: 'normal' },
                { text: 'ban', value: 'ban' },
            ],
            onFilter: (value, record) => record.status.includes(value as string),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <div className={styles.buttonContainer}>
                    <Button className={styles.btnPrf} onClick={() => handleViewProfile(record)}><UserOutlined /></Button>
                    <Button className={styles.btnDel} type="primary" danger onClick={() => showModal(record)}>
                        <DeleteOutlined />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <p className={styles.txtListUs}>Danh sách người dùng</p>
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
        </div>
    );
};

export default ListUser;
