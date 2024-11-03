import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import PasswordModal from './PasswordModal';
import './'; // Import your CSS file for styles

interface UserEditModalProps {
    visible: boolean;
    onCancel: () => void;
    onSave: (userData: { username: string; email: string; avatar: string }) => void;
    user: {
        username: string;
        email: string;
        image: string;
    };
}

const UserEditModal: React.FC<UserEditModalProps> = ({ visible, onCancel, onSave, user }) => {
    const [form] = Form.useForm();
    const [avatar, setAvatar] = useState<string>(user.image);
    const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);

    useEffect(() => {
        if (visible) {
            form.setFieldsValue({
                username: user.username,
                email: user.email,
            });
            setAvatar(user.image);
        }
    }, [visible, user, form]);

    const handleFinish = () => {
        form.validateFields()
            .then(values => {
                if (!avatar) {
                    message.error('Vui lòng tải lên avatar.');
                    return;
                }
                onSave({ ...values, avatar });
                form.resetFields();
                onCancel();
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    const handleUploadChange = (info: { fileList: any[] }) => {
        if (info.fileList.length > 0) {
            const file = info.fileList[0].originFileObj;
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCancel = () => {
        setAvatar(user.image);
        onCancel();
    };

    const beforeUpload = (file: File) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            message.error('Bạn chỉ có thể tải lên hình ảnh!');
        }
        return isImage;
    };

    return (
        <>
            <Modal
                title="Sửa Thông Tin Người Dùng"
                visible={visible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form form={form} onFinish={handleFinish}>
                    <Form.Item
                        label="Tên người dùng"
                        name="username"
                        rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                    >
                        <Input readOnly />
                    </Form.Item>

                    <Form.Item label="Avatar">
                        <div className="avatar-container">
                            {avatar && <div className="avatar" style={{ backgroundImage: `url(${avatar})` }} />}
                        </div>
                        <Upload 
                            beforeUpload={beforeUpload}
                            onChange={handleUploadChange}
                            showUploadList={false} // Hide default upload list
                        >
                            <Button icon={<UploadOutlined />}>Tải lên Avatar</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Lưu
                        </Button>
                        <Button style={{ marginLeft: 8 }} onClick={handleCancel}>
                            Hủy
                        </Button>
                    </Form.Item>

                    <Button 
                        type="dashed" 
                        style={{ marginTop: 16, width: '100%' }}
                        onClick={() => setIsPasswordModalVisible(true)}
                    >
                        Sửa mật khẩu
                    </Button>
                </Form>
            </Modal>

            <PasswordModal 
                visible={isPasswordModalVisible}
                onCancel={() => setIsPasswordModalVisible(false)}
            />
        </>
    );
};

export default UserEditModal;
