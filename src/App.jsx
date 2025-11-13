import React, { useState, useRef } from 'react';
import ImageUpload from './components/ImageUpload/ImageUpload';
import PredictionResult from './components/PredictionResult/PredictionResult';
import Loading from './components/Loading/Loading';
import { useImageClassification } from './hooks/useImageClassification';
import { CLASS_NAMES } from './utils/constants';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageKey, setImageKey] = useState(0);
  const { prediction, loading, error, classifyImage, reset } = useImageClassification();
  const fileInputRef = useRef(null);

  const handleImageSelect = async (imageFile) => {
    setSelectedImage(imageFile);
    
    if (imageFile) {
      try {
        await classifyImage(imageFile);
      } catch (error) {
        console.error('Classification error:', error);
      }
    } else {
      reset();
    }
  };

  const handleNewImage = () => {
    setSelectedImage(null);
    reset();
    setImageKey(prev => prev + 1);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleImageSelect(files[0]);
    }
  };

  const formatFoodName = (key) => {
    return CLASS_NAMES[key].split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-orange-50 to-red-50 flex flex-col">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-red-200/30 to-orange-200/30 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-linear-to-tr from-orange-200/30 to-yellow-200/30 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <header className="relative bg-linear-to-r from-red-600 via-red-500 to-orange-600 text-white shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        
        <div className="container mx-auto px-4 py-10 relative z-10">
          <div className="flex items-center justify-center mb-4">
            <div className="text-6xl animate-bounce">🍛</div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 tracking-tight">
            Klasifikasi Makanan Minangkabau
          </h1>
          <p className="text-lg md:text-xl text-red-50 text-center max-w-3xl mx-auto leading-relaxed">
            Upload gambar makanan Minang untuk mengidentifikasi jenisnya menggunakan model MobileNetV3 dan Fast API
          </p>
          
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-center">
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/20">
              <div className="text-2xl font-bold">8</div>
              <div className="text-xs text-red-100">Jenis Makanan</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/20">
              <div className="text-2xl font-bold">Fast</div>
              <div className="text-xs text-red-100">Detection</div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-linear-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Upload Gambar</h2>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={handleFileInputChange}
                className="hidden"
              />
              
              <ImageUpload
                key={imageKey}
                onImageSelect={handleImageSelect}
                disabled={loading}
                className="mb-6"
                initialImage={selectedImage} // Tambahkan prop ini
              />
              
              {selectedImage && !loading && (
                <button
                  onClick={handleNewImage}
                  className="w-full bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Upload Gambar Baru
                </button>
              )}
            </div>

            <div className="bg-linear-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-3xl p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-blue-900">Jenis Makanan yang Dikenali</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {Object.keys(CLASS_NAMES).map((key, index) => (
                  <div 
                    key={key} 
                    className="flex items-center gap-3 bg-white/60 backdrop-blur-sm p-3 rounded-xl border border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-md group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="shrink-0 w-8 h-8 bg-linear-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                      {formatFoodName(key)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {loading && (
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
                <Loading message="Menganalisis gambar makanan..." />
              </div>
            )}

            {error && (
              <div className="bg-linear-to-br from-red-50 to-pink-50 border-2 border-red-200 rounded-3xl shadow-2xl p-8 text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-red-800 mb-3">Terjadi Kesalahan</h3>
                <p className="text-red-600 mb-6 text-lg">{error}</p>
                <button 
                  onClick={handleNewImage}
                  className="bg-linear-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-3 px-8 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 mx-auto shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Coba Lagi
                </button>
              </div>
            )}

            {prediction && !loading && (
              <PredictionResult prediction={prediction} />
            )}

            {!selectedImage && !loading && !error && !prediction && (
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-12 text-center border border-white/20">
                <div className="w-32 h-32 bg-linear-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <div className="text-7xl">🍛</div>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-3">
                  Siap Mengklasifikasikan
                </h3>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed max-w-md mx-auto">
                  Upload gambar makanan Minangkabau untuk memulai klasifikasi menggunakan AI
                </p>
                <div className="flex flex-col gap-2 text-sm text-gray-500">
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Format: JPG, JPEG, PNG, WEBP</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Ukuran maksimal: 5MB</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="relative bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-8 mt-12 border-t border-gray-700">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-8 h-8 bg-linear-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-xl">🍛</span>
            </div>
            <span className="text-xl font-bold">Klasifikasi Makanan Minang</span>
          </div>
          <p className="text-gray-400 mb-2">
            &copy; 2025 Klasifikasi Makanan Minangkabau. Powered by MobileNetV3 & FastAPI.
          </p>
          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <span>API: {import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;