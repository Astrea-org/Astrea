import React from "react";

interface LoadingProgressBarProps {
  loading: boolean;
  progress: number;
}

const LoadingProgressBar: React.FC<LoadingProgressBarProps> = ({
  loading,
  progress,
}) => {
  return (
    <div className="w-full h-4 bg-gray-200 rounded-md overflow-hidden">
      {loading && (
        <div
          className="h-full bg-blue-500"
          style={{ width: `${progress}%` }}
        ></div>
      )}
    </div>
  );
};

export default LoadingProgressBar;
