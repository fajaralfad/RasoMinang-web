import { useState, useCallback } from 'react';
import { apiService } from '../services/api';

export const useImageClassification = () => {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const classifyImage = useCallback(async (imageFile) => {
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      console.log('tarting image classification...');
      const result = await apiService.classifyImage(imageFile);
      console.log('Classification result:', result);
      setPrediction(result);
      return result;
    } catch (err) {
      console.error('Hook error:', err);
      
      let errorMessage = 'Terjadi kesalahan saat mengklasifikasikan gambar';
      
      if (err.status === 0) {
        errorMessage = 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.';
      } else if (err.status === 413) {
        errorMessage = 'File terlalu besar. Maksimal 5MB.';
      } else if (err.status === 415) {
        errorMessage = 'Format file tidak didukung. Gunakan JPG, JPEG, atau PNG.';
      } else if (err.status === 422) {
        errorMessage = 'Data yang dikirim tidak valid.';
      } else if (err.status >= 500) {
        errorMessage = 'Server sedang mengalami masalah. Silakan coba lagi nanti.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setPrediction(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    prediction,
    loading,
    error,
    classifyImage,
    reset
  };
};