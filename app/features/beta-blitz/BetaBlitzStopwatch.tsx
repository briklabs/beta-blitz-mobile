import React, { useEffect, useMemo, useState } from "react";
import { useBetaBlitzContext } from "./BetaBlitzContext";
import { Text } from "react-native-paper";
import { add, format, formatDuration, intervalToDuration } from "date-fns";

function Completed() {
  const { startTimestamp, endTimestamp } = useBetaBlitzContext();

  const completionTimestamp = useMemo(() => {
    if (!endTimestamp) return null;
    const duration = intervalToDuration({
      start: startTimestamp,
      end: endTimestamp,
    });
    return formatDuration(duration);
  }, [startTimestamp, endTimestamp]);

  return (
    <Text variant="titleSmall">
      {completionTimestamp ? completionTimestamp : "N/A"}
    </Text>
  );
}

function Countdown() {
  const { startTimestamp } = useBetaBlitzContext();
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTimestamp.getTime();
      setElapsedTime(elapsed);
    }, 1000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [elapsedTime]);

  const elapsed = useMemo(() => {
    const hours = Math.floor(elapsedTime / 3600000); // 1 hour = 3600000 milliseconds
    const minutes = Math.floor((elapsedTime % 3600000) / 60000); // 1 minute = 60000 milliseconds
    const seconds = Math.floor((elapsedTime % 60000) / 1000); // 1 second = 1000 milliseconds

    return format(new Date(0, 0, 0, hours, minutes, seconds), "HH:mm:ss");
  }, [elapsedTime]);

  return <Text variant="titleLarge">{elapsed}</Text>;
}

export default function BetaBlitzStopwatch() {
  const { inProgress } = useBetaBlitzContext();

  if (inProgress) return <Countdown />;

  return <Completed />;
}
