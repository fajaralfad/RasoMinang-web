import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'X-API-Key': API_KEY,
        'Content-Type': 'multipart/form-data',
      },
      timeout: 30000,
    });

    this.setupInterceptors();
  }

  setupInterceptors() {
    this.client.interceptors.response.use(
      (response) => {
        console.log('RAW API RESPONSE:', response.data);
        return response;
      },
      (error) => {
        console.error('API Error:', error.response?.data);
        return Promise.reject(this.handleError(error));
      }
    );
  }

  handleError(error) {
    if (error.response) {
      return {
        message: error.response.data?.detail || `Server error: ${error.response.status}`,
        status: error.response.status,
        data: error.response.data
      };
    } else if (error.request) {
      return {
        message: 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.',
        status: 0
      };
    } else {
      return {
        message: error.message || 'Terjadi kesalahan yang tidak diketahui',
        status: -1
      };
    }
  }

  async classifyImage(imageFile) {
    const formData = new FormData();
    formData.append('file', imageFile);

    console.log('Uploading image:', imageFile.name);

    try {
      const response = await this.client.post('/predict', formData);
      console.log('Classification successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('Classification failed:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();