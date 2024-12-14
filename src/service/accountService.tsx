import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class accountService {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: 'https://api.example.com',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Thêm interceptor nếu cần
        this.axiosInstance.interceptors.request.use(
            (config) => {
                // Thêm token vào headers nếu có
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        this.axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                // Xử lý lỗi toàn cục (ví dụ: thông báo lỗi)
                console.error('API Error:', error.response?.data || error.message);
                return Promise.reject(error);
            }
        );
    }

    // Phương thức GET
    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.axiosInstance.get<T>(url, config);
        return response.data;
    }

    // Phương thức POST
    async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.axiosInstance.post<T>(url, data, config);
        return response.data;
    }

    // Phương thức PUT
    async put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.axiosInstance.put<T>(url, data, config);
        return response.data;
    }

    // Phương thức DELETE
    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.axiosInstance.delete<T>(url, config);
        return response.data;
    }
}

// Tạo một instance của service
const accountApi = new accountService();
export default accountApi;
