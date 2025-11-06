import React from 'react';
import { CLASS_NAMES, FOOD_DESCRIPTIONS } from '../../utils/constants';

const PredictionResult = ({ prediction, className = '' }) => {
  if (!prediction) {
    return null;
  }

  // --- LOGIC FUNCTIONS (Unchanged for consistency) ---

  const extractPredictionData = (pred) => {
    // ... (Logika extractPredictionData tetap sama)
    if (pred.prediction && pred.prediction.predicted_class) {
      return {
        class: pred.prediction.predicted_class,
        confidence: pred.prediction.confidence || 0,
        all_predictions: pred.prediction.all_predictions || []
      };
    }
    
    if (pred.predicted_class) {
      return {
        class: pred.predicted_class,
        confidence: pred.confidence || 0,
        all_predictions: pred.all_predictions || []
      };
    }

    if (pred.class) {
      return {
        class: pred.class,
        confidence: pred.confidence || 0,
        all_predictions: pred.all_predictions || []
      };
    }

    return {
      class: 'unknown',
      confidence: 0,
      all_predictions: []
    };
  };

  const predictionData = extractPredictionData(prediction);
  const { class: predictedClass, confidence, all_predictions } = predictionData;

  const getConfidenceColor = (conf) => {
    if (conf >= 0.8) return 'text-green-600';
    if (conf >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceBgGradient = (conf) => {
    if (conf >= 0.8) return 'from-green-500 to-emerald-500';
    if (conf >= 0.6) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const getConfidenceBadgeColor = (conf) => {
    if (conf >= 0.8) return 'bg-green-100 text-green-700 border-green-200';
    if (conf >= 0.6) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-red-100 text-red-700 border-red-200';
  };

  const formatClassName = (className) => {
    if (!className || className === 'unknown') return 'Tidak Dikenali';
    
    const classEntry = Object.entries(CLASS_NAMES).find(([key, value]) => 
      value === className
    );
    
    if (classEntry) {
      const [, displayName] = classEntry;
      return displayName.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
    }
    
    return String(className).split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const displayConfidence = confidence > 1 ? confidence : confidence * 100;
  const displayClassName = formatClassName(predictedClass);
  const classDescription = FOOD_DESCRIPTIONS[predictedClass] || 
    'Makanan khas Minangkabau yang lezat dan penuh rempah.';

  // --- RENDER COMPONENT ---

  return (
    <div className={`bg-white/90 backdrop-blur-xl rounded-3xl shadow-3xl overflow-hidden border border-gray-100 ${className}`}>
      
      {/* 🚀 Header */}
      <div className="relative bg-linear-to-r from-red-700 via-red-600 to-orange-600 text-white px-8 py-6 overflow-hidden">
        {/* Decorative Grid and Overlay */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 opacity-20 bg-repeat bg-size-[60px_60px] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjMiIHN0cm9rZS13aWR0aD0iMSIvPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc=')]"></div>
        
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight">HASIL KLASIFIKASI</h3>
          </div>
        </div>
      </div>
      
      {/* 🍽️ Content */}
      <div className="p-8 space-y-10">
        
        {/* --- MAIN PREDICTION CARD (BIG) --- */}
        <div className="relative bg-white rounded-3xl p-10 border border-gray-100 shadow-xl overflow-hidden transition-all duration-500 group">
          {/* Decorative Blur Background */}
          <div className="absolute inset-0 opacity-30 transform scale-150 transition-all duration-700 group-hover:opacity-50">
            <div className={`w-full h-full bg-linear-to-br ${getConfidenceBgGradient(confidence)} blur-3xl`}></div>
          </div>
          
          <div className="relative z-10 text-center">
            {/* Food Icon / Container */}
            <div className="mb-6">
              <div className="inline-block p-5 bg-linear-to-br from-red-600 to-orange-600 rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                <span className="text-5xl">🍛</span>
              </div>
            </div>
            
            {/* Food Name & Badge */}
            <h4 className="text-5xl font-extrabold text-gray-900 mb-3 tracking-tighter">
              {displayClassName}
            </h4>
            
            <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-base font-bold border-2 ${getConfidenceBadgeColor(confidence)} shadow-md`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Confidence: {displayConfidence.toFixed(1)}%</span>
            </div>
            
            {/* Confidence Progress Bar */}
            <div className="mt-8 relative max-w-lg mx-auto">
              <div className="h-10 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                <div 
                  className={`h-full bg-linear-to-r ${getConfidenceBgGradient(confidence)} transition-all duration-1000 ease-out relative overflow-hidden`}
                  style={{ width: `${Math.min(displayConfidence, 100)}%` }}
                >
                  {/* Shimmer Effect (Relies on tailwind.config.js) */}
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
                </div>
              </div>
              
              {/* Percentage Label */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-xl font-black drop-shadow-lg ${displayConfidence > 50 ? 'text-white' : 'text-gray-700'}`}>
                  {displayConfidence.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* --- DESCRIPTION CARD --- */}
        <div className="bg-blue-50/70 backdrop-blur-sm rounded-2xl p-6 border-2 border-blue-200 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-blue-800">Detail Makanan</h4>
          </div>
          <p className="text-gray-700 leading-relaxed text-base italic border-l-4 border-blue-400 pl-4">"{classDescription}"</p>
        </div>

        {/* --- ALL PREDICTIONS (Grid) --- */}
        {Array.isArray(all_predictions) && all_predictions.length > 0 && (
          <div className="bg-gray-50/70 backdrop-blur-sm rounded-2xl p-6 border-2 border-gray-200 shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-800">Prediksi Alternatif</h4>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {all_predictions.map((pred, index) => {
                let predClass, predConfidence;
                
                if (typeof pred === 'string') {
                  predClass = pred;
                  predConfidence = 0;
                } else {
                  predClass = pred.class || pred.predicted_class;
                  predConfidence = pred.confidence || 0;
                }
                
                const displayPredConfidence = predConfidence > 1 ? predConfidence : predConfidence * 100;
                
                return (
                  <div 
                    key={index} 
                    className="flex justify-between items-center p-4 bg-white/80 rounded-xl border border-gray-200 hover:border-purple-400 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center font-bold text-purple-600 text-sm shrink-0">
                        {index + 1}
                      </div>
                      <span className="font-semibold text-gray-700 truncate">
                        {formatClassName(predClass)}
                      </span>
                    </div>
                    
                    {predConfidence > 0 && (
                      <div className="flex items-center gap-3 shrink-0">
                        {/* Mini Progress Bar */}
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-linear-to-r ${getConfidenceBgGradient(predConfidence)} transition-all duration-500`}
                            style={{ width: `${Math.min(displayPredConfidence, 100)}%` }}
                          ></div>
                        </div>
                        
                        {/* Percentage */}
                        <span className={`font-bold text-sm min-w-10 text-right ${getConfidenceColor(predConfidence)}`}>
                          {displayPredConfidence.toFixed(1)}%
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionResult;