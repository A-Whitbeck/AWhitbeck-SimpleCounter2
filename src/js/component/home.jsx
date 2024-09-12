import React, { useState, useEffect } from "react";

const CustomClock = () => {
  const [time, setTime] = useState({
    period: "Morning",
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  useEffect(() => {
    const convertToCustomTime = () => {
      const now = new Date();
      
      // Get the number of milliseconds since midnight
      const msSinceMidnight = now.getTime() - new Date(now.setHours(0, 0, 0, 0)).getTime();

      // Conversion factors
      const totalMsInDay = 20 * 100 * 100 * 100; // 20 hours * 100 minutes * 100 seconds * 100 milliseconds
      const msInCustomHour = 100 * 100 * 100; // 100 minutes * 100 seconds * 100 milliseconds
      const msInCustomMinute = 100 * 100; // 100 seconds * 100 milliseconds
      const msInCustomSecond = 100; // 100 milliseconds

      // Convert the milliseconds since midnight to the custom time system
      const customTime = (msSinceMidnight / 86400000) * totalMsInDay;

      const customHours = Math.floor(customTime / msInCustomHour);
      const customMinutes = Math.floor((customTime % msInCustomHour) / msInCustomMinute);
      const customSeconds = Math.floor((customTime % msInCustomMinute) / msInCustomSecond);
      const customMilliseconds = Math.floor(customTime % msInCustomSecond);

      // Determine if it's morning or evening
      const period = customHours < 10 ? "Morning" : "Evening";

      // Adjust the hours to 0-9 for morning and 0-9 for evening
      const displayHours = customHours % 10;

      setTime({
        period,
        hours: displayHours,
        minutes: customMinutes,
        seconds: customSeconds,
        milliseconds: customMilliseconds,
      });
    };

    const intervalId = setInterval(convertToCustomTime, 10); // Update every 10ms for smooth milliseconds

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (timeUnit) => (timeUnit < 10 ? `0${timeUnit}` : timeUnit);

  return (
    <div style={styles.container}>
      <h1 style={styles.clock}>
        {time.period} {formatTime(time.hours)}:{formatTime(time.minutes)}:
        {formatTime(time.seconds)}.{formatTime(time.milliseconds)}
      </h1>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Full height of the viewport
    backgroundColor: "#f0f0f0", // Optional background color
  },
  clock: {
    fontSize: "5rem", // Make the clock larger
    fontFamily: "monospace", // Use a monospaced font for uniform character width
  },
};

export default CustomClock;
