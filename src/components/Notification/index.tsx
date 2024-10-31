import { message } from "antd";

// Định nghĩa kiểu cho tham số message1
export const successNotification = (message1: string): void => {
    message.success(message1);
};

export const errorNotification = (message1: string): void => {
    message.error(message1);
};

export const warningNotification = (message1: string): void => {
    message.warning(message1);
};
