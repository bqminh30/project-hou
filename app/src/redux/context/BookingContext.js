import React, { createContext, useEffect, useState, useContext } from "react";
export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [booking, setBooking] = useState(null);

  const saveBooking = (newBooking) => {
    setBooking(newBooking);
  };

  console.log('newBooking', booking)
  return (
    <BookingContext.Provider value={{ booking, saveBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

// Tạo custom hook để sử dụng Context trong các component
export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
