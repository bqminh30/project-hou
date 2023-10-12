import { Calendar, LocaleConfig } from "react-native-calendars";
import React, { useState } from "react";

const RoomList = () => {
  const [selected, setSelected] = useState("");

  return (
    
    <Calendar
      // Customize the appearance of the calendar
      style={{
        borderWidth: 1,
        borderColor: "gray",
        height: 350,
        marginTop: 200
      }}
      // Specify the current date
      current={"2012-03-01"}
      // Callback that gets called when the user selects a day
      onDayPress={(day) => {
        console.log("selected day", day);
      }}
      // Mark specific dates as marked
      markingType="period"
      hideExtraDays={true}
    //   minDate={new Date()}
      hideArrows={false}
      markedDates={{
        "2012-03-01": {  marked: true, color: "lightgreen", startingDay: true },
        "2012-03-02": {  marked: true, color: "lightgreen" },
        "2012-03-03": {  marked: true, color: "lightgreen", endingDay: true },
      }}
    />
  );
};
export default RoomList;
