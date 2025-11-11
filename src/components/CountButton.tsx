import React from "react";

interface CountButtonProps {
  count: number;
  onClick: () => void;
}

export const CountButton: React.FC<CountButtonProps> = ({ count, onClick }) => {
  return (
    <button
      className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-teal-600 border border-transparent rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
      onClick={onClick}
    >
      Count is: {count}
    </button>
  );
};
