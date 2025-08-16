// SelectDaysUi.tsx
import React, { useState } from "react";

interface SelectDaysUiProps {
  initialDays?: number;
  minDays?: number;
  maxDays?: number;
  onConfirm?: (days: number) => void; // Passes selected days to parent (e.g., Chatbox)
}

const SelectDaysUi: React.FC<SelectDaysUiProps> = ({
  initialDays = 2,
  minDays = 1,
  maxDays = 30,
  onConfirm,
}) => {
  const [days, setDays] = useState(initialDays);

  const decreaseDays = () => {
    setDays((prev) => (prev > minDays ? prev - 1 : prev));
  };

  const increaseDays = () => {
    setDays((prev) => (prev < maxDays ? prev + 1 : prev));
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(days); // Send selected days to Chatbox
    }
  };

  return (
    <div className="font-sans bg-white rounded-lg p-4 sm:p-5 w-full max-w-sm mx-auto shadow-sm border">
      <p className="text-sm sm:text-base mb-4">
        Thanks for sharing! How many days are you planning to spend on this trip to India?
      </p>

      <div className="border border-gray-200 rounded-lg p-4 sm:p-5 text-center">
        <p className="font-semibold mb-3 text-sm sm:text-base">How many days do you want to travel?</p>
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
          <button 
            className="border border-gray-300 rounded-full w-8 h-8 sm:w-9 sm:h-9 text-lg cursor-pointer bg-white hover:bg-gray-50 transition-colors flex items-center justify-center"
            onClick={decreaseDays}
          >
            −
          </button>
          <span className="text-base sm:text-lg font-semibold min-w-[80px]">{days} Days</span>
          <button 
            className="border border-gray-300 rounded-full w-8 h-8 sm:w-9 sm:h-9 text-lg cursor-pointer bg-white hover:bg-gray-50 transition-colors flex items-center justify-center"
            onClick={increaseDays}
          >
            +
          </button>
        </div>
        <button 
          className="bg-primary text-white border-none rounded-md px-4 sm:px-5 py-2 cursor-pointer text-sm font-semibold hover:bg-primary/90 transition-colors"
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default SelectDaysUi;
