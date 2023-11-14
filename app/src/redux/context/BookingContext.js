import React, { createContext, useEffect, useState } from "react";
export const BookingContext = createContext();

export const ClipboardProvider = ({ children }) => {
  const [orderBooking, setOrderBooking] = useState([]);
  return (
    <BookingContext.Provider
      value={{
        orderBooking,
        setOrderBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
