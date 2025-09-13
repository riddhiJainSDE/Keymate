import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 w-screen h-screen">
      <div className="relative">
        <div className="w-20 h-20 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-blue-100 border-solid rounded-full animate-spin delay-150"></div>
        <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-blue-700 border-solid rounded-full animate-spin delay-300"></div>
        <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-blue-900 border-solid rounded-full animate-spin delay-450"></div>
      </div>
    </div>
  );
};

export default Loading;
