import axiosClient from '../api/axiosClient';
import { ENDPOINTS } from '../constants/ApiEndpoints';

export const loginUser = async (username, password) => {
    // Gửi yêu cầu đăng nhập bằng Basic Auth hoặc Body tùy Backend của bạn
    // Ở đây mình giả sử gửi Body JSON cho chuẩn REST
    const response = await axiosClient.post(ENDPOINTS.LOGIN, {
        username,
        password
    });
    return response.data; // Trả về { accessToken: "..." }
};

export const logoutUser = () => {
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
};