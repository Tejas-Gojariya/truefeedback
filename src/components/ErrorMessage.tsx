import React from 'react';

const ErrorMessage = ({ message = "No messages to display." }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <p className="text-xl font-bold text-gray-200">
        {message}
      </p>
    </div>
  );
};

export default ErrorMessage;
