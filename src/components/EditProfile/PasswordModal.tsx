import { Modal, Form, Input, Upload, Button, message } from 'antd';

interface PasswordModalProps {
    visible: boolean;
    onCancel: () => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ visible, onCancel }) => {
    const [form] = Form.useForm();

    const handlePasswordChange = (values: { currentPassword: string; newPassword: string; confirmPassword: string }) => {
        if (values.newPassword !== values.confirmPassword) {
            message.error('Mật khẩu mới và xác nhận mật khẩu không khớp!');
            return;
        }
        // Gửi dữ liệu tới API để đổi mật khẩu
        message.success('Đổi mật khẩu thành công!');
        form.resetFields();
        onCancel();
    };

    return (
        <Modal
            title="Đổi Mật Khẩu"
            visible={visible}
            onCancel={onCancel}
            footer={null}
        >
            <Form form={form} onFinish={handlePasswordChange} layout="vertical">
                <Form.Item
                    label="Mật khẩu hiện tại"
                    name="currentPassword"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' }]}
                >
                    <Input.Password placeholder="Nhập mật khẩu hiện tại" />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu mới"
                    name="newPassword"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}
                >
                    <Input.Password placeholder="Nhập mật khẩu mới" />
                </Form.Item>

                <Form.Item
                    label="Xác nhận mật khẩu mới"
                    name="confirmPassword"
                    rules={[{ required: true, message: 'Vui lòng xác nhận mật khẩu mới!' }]}
                >
                    <Input.Password placeholder="Xác nhận mật khẩu mới" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Đổi mật khẩu
                    </Button>
                    <Button style={{ marginLeft: 8 }} onClick={onCancel}>
                        Hủy
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default PasswordModal;
