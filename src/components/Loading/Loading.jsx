import React from 'react';
import "../../Shimmer.css";

const Loading = ({ message = "Mengklasifikasikan gambar..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Main Loading Animation */}
      <div className="relative w-24 h-24 mb-8">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full bg-linear-to-tr from-red-500/20 to-orange-500/20 animate-pulse"></div>
        
        {/* Spinning Gradient Ring 1 */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-red-500 border-r-orange-500 animate-spin"></div>
        
        {/* Spinning Gradient Ring 2 (Reverse) */}
        <div 
          className="absolute inset-2 rounded-full border-4 border-transparent border-b-red-400 border-l-orange-400 animate-spin"
          style={{ animationDirection: 'reverse', animationDuration: '1s' }}
        ></div>
        
        {/* Inner Pulsing Circle */}
        <div className="absolute inset-4 rounded-full bg-linear-to-br from-red-500 to-orange-500 animate-pulse flex items-center justify-center">
          <svg className="w-8 h-8 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
      
      {/* Message */}
      <div className="text-center space-y-4">
        <p className="text-gray-800 font-bold text-xl animate-pulse">{message}</p>
        
        {/* Animated Dots */}
        <div className="flex justify-center gap-2">
          <div 
            className="w-3 h-3 bg-linear-to-br from-red-500 to-red-600 rounded-full animate-bounce shadow-lg"
            style={{ animationDelay: '0ms' }}
          ></div>
          <div 
            className="w-3 h-3 bg-linear-to-br from-orange-500 to-orange-600 rounded-full animate-bounce shadow-lg"
            style={{ animationDelay: '150ms' }}
          ></div>
          <div 
            className="w-3 h-3 bg-linear-to-br from-red-500 to-red-600 rounded-full animate-bounce shadow-lg"
            style={{ animationDelay: '300ms' }}
          ></div>
        </div>
        
        {/* Progress Text */}
        <div className="text-sm text-gray-500 font-medium">
          Mohon tunggu sebentar...
        </div>
        
        {/* Progress Bar */}
        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-linear-to-r from-red-500 via-orange-500 to-red-500 animate-pulse bg-size-[200%_100%]"></div>
        </div>
      </div>
      
      {/* Bottom Icon Animation */}
      <div className="mt-8 flex items-center gap-3 text-gray-400">
        <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="text-xs font-semibold">AI Processing</span>
      </div>
    </div>
  );
};

export default Loading;