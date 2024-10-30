import React, { useState, useEffect } from "react";

export default function StarRate({ handleRateStar, initialRating }) {
  const [rate, setRate] = useState(initialRating || 5);

  useEffect(() => {
    setRate(initialRating || 5);
  }, [initialRating]);

  const handleCheckStar = (value) => {
    handleRateStar(value);
    setRate(value);
  };

  return (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <i
        style={{ color: "orange", fontSize: "2.4rem" }}
        className={rate >= 1 ? "fa-solid fa-star" : "fa-regular fa-star"}
        onClick={() => handleCheckStar(1)}
      ></i>
      <i
        style={{ color: "orange", fontSize: "2.4rem" }}
        className={rate >= 2 ? "fa-solid fa-star" : "fa-regular fa-star"}
        onClick={() => handleCheckStar(2)}
      ></i>
      <i
        style={{ color: "orange", fontSize: "2.4rem" }}
        className={rate >= 3 ? "fa-solid fa-star" : "fa-regular fa-star"}
        onClick={() => handleCheckStar(3)}
      ></i>
      <i
        style={{ color: "orange", fontSize: "2.4rem" }}
        className={rate >= 4 ? "fa-solid fa-star" : "fa-regular fa-star"}
        onClick={() => handleCheckStar(4)}
      ></i>
      <i
        style={{ color: "orange", fontSize: "2.4rem" }}
        className={rate >= 5 ? "fa-solid fa-star" : "fa-regular fa-star"}
        onClick={() => handleCheckStar(5)}
      ></i>
    </div>
  );
}
