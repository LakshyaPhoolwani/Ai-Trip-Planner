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
    <div style={styles.container}>
      <p style={styles.question}>
        Thanks for sharing! How many days are you planning to spend on this trip to India?
      </p>

      <div style={styles.selector}>
        <p style={styles.label}>How many days do you want to travel?</p>
        <div style={styles.counter}>
          <button style={styles.circleButton} onClick={decreaseDays}>
            −
          </button>
          <span style={styles.daysText}>{days} Days</span>
          <button style={styles.circleButton} onClick={increaseDays}>
            +
          </button>
        </div>
        <button style={styles.confirmButton} onClick={handleConfirm}>
          Confirm
        </button>
      </div>
    </div>
  );
};

// Inline styling
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "20px",
    width: "350px",
    boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
  },
  question: {
    fontSize: "14px",
    marginBottom: "16px",
  },
  selector: {
    border: "1px solid #eee",
    borderRadius: "8px",
    padding: "20px",
    textAlign: "center",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "10px",
  },
  counter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    marginBottom: "15px",
  },
  circleButton: {
    border: "1px solid #ccc",
    borderRadius: "50%",
    width: "36px",
    height: "36px",
    fontSize: "18px",
    cursor: "pointer",
    backgroundColor: "#fff",
  },
  daysText: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  confirmButton: {
    backgroundColor: "#FF4500",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "8px 20px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  },
};

export default SelectDaysUi;
