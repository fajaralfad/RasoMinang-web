import React, { useCallback, useState, useRef, useEffect } from 'react';
import { VALID_FILE_TYPES, MAX_FILE_SIZE } from '../../utils/constants';

const ImageUpload = ({ onImageSelect, disabled, className = '', initialImage = null }) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (initialImage && initialImage instanceof File) {
      const preview = URL.createObjectURL(initialImage);
      setPreviewUrl(preview);
    }
  }, [initialImage]);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const validateFile = (file) => {
    if (!VALID_FILE_TYPES.includes(file.type)) {
      throw new Error('Format file tidak didukung. Gunakan JPG, JPEG, atau PNG.');
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new Error('Ukuran file terlalu besar. Maksimal 5MB.');
    }

    return true;
  };

  const processFile = (file) => {
    try {
      validateFile(file);
      
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
      onImageSelect(file);
    } catch (error) {
      alert(error.message);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      processFile(files[0]);
    }
  }, [onImageSelect, previewUrl]);

  const handleChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      processFile(files[0]);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current && !disabled) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const removeImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    onImageSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className={`w-full ${className}`}>
      {!previewUrl ? (
        <div
          className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer overflow-hidden group
            ${dragActive 
              ? 'border-red-500 bg-linear-to-br from-red-50 to-orange-50 scale-[1.02] shadow-lg' 
              : 'border-gray-300 bg-linear-to-br from-gray-50 to-gray-100 hover:border-red-400 hover:shadow-md'
            }
            ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleUploadClick}
        >
          <div className="absolute inset-0 bg-linear-to-br from-red-100/0 via-orange-100/0 to-yellow-100/0 group-hover:from-red-100/50 group-hover:via-orange-100/50 group-hover:to-yellow-100/50 transition-all duration-500"></div>
          
          <div className="absolute top-0 left-0 w-32 h-32 bg-red-200/20 rounded-full blur-2xl group-hover:bg-red-300/30 transition-all duration-500 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-orange-200/20 rounded-full blur-2xl group-hover:bg-orange-300/30 transition-all duration-500 translate-x-1/2 translate-y-1/2"></div>
          
          <input
            ref={fileInputRef}
            type="file"
            id="file-upload"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={handleChange}
            disabled={disabled}
            className="hidden"
          />
          
          <div className="cursor-pointer block relative z-10">
            <div className="mb-6 relative">
              <div className="w-20 h-20 mx-auto bg-linear-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="absolute inset-0 w-20 h-20 mx-auto bg-linear-to-br from-red-500 to-orange-500 rounded-2xl animate-ping opacity-20"></div>
            </div>
            
            <div className="space-y-3">
              <p className="text-xl font-bold text-gray-800">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-orange-600 group-hover:from-red-500 group-hover:to-orange-500 transition-all duration-300">
                  Klik untuk upload atau drag & drop </span>
              </p>
              
              <p className="text-gray-500 text-sm font-medium">
                JPG, JPEG, PNG, WEBP (Maks. 5MB)
              </p>
              
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-xs font-semibold border border-blue-200 mt-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Upload gambar makanan untuk memulai</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"></div>
          
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-full h-96 object-cover block transform group-hover:scale-105 transition-transform duration-500" 
          />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Gambar siap dianalisis</span>
            </div>
          </div>
          
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 shadow-xl z-20 flex items-center gap-2 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed group/btn backdrop-blur-sm"
            disabled={disabled}
          >
            <svg className="w-5 h-5 group-hover/btn:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Hapus</span>
          </button>
          
          <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-2 rounded-xl text-sm font-bold shadow-lg z-20 flex items-center gap-2 backdrop-blur-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Uploaded</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;