import axios from 'axios';

const API_URL = 'http://localhost:8080/api/files';

// Hàm lấy Header kèm Token
const getAuthHeader = () => {
    const token = localStorage.getItem('accessToken');
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

// 1. Tải tài liệu lên
export const uploadFile = async (file, isGlobal = false) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('isGlobal', isGlobal);
    formData.append('task', 'upload'); // THÊM DÒNG NÀY để hết lỗi 400

    const res = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
            ...getAuthHeader().headers,
            'Content-Type': 'multipart/form-data'
        }
    });
    return res.data;
};

// 2. Lấy danh sách file
export const getFiles = async () => {
    const res = await axios.get(`${API_URL}/list`, getAuthHeader());
    return res.data;
};
export const downloadFile = async (id, fileName) => {
    const res = await axios.get(`${API_URL}/download/${id}`, {
        ...getAuthHeader(),
        responseType: 'blob', // Quan trọng: Phải là blob
    });

    // Tạo một đường link ảo để kích hoạt việc tải xuống của trình duyệt
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
};
// src/services/fileService.jsx

// 3. Xóa tài liệu (Sửa lại cho khớp với @DeleteMapping("/{id}") bên Java)
export const deleteFile = async (id) => {
    const token = localStorage.getItem('accessToken');
    
    // PHẢI dùng axios.delete và đúng URL /api/files/{id}
    const res = await axios.delete(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
};