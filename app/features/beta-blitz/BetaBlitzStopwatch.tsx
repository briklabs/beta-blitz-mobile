import React, { useEffect, useMemo, useState } from "react";
import { useBetaBlitzContext } from "./BetaBlitzContext";
import { Text } from "react-native-paper";
import { addMilliseconds, format, formatDuration } from "date-fns";

export default function BetaBlitzStopwatch() {
  const { startTimestamp, endTimestamp } = useBetaBlitzContext();

  const [elapsedTime, setElapsedTime] = useState<number>(0);
  useEffect(() => {
    if (!startTimestamp) return;

    if (endTimestamp) {
      setElapsedTime(() => endTimestamp - startTimestamp);
      return;
    }

    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTimestamp;
      setElapsedTime(elapsed);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startTimestamp, endTimestamp]);

  const stopwatch = useMemo(() => {
    const hours = Math.floor(elapsedTime / 3600000); // 1 hour = 3600000 milliseconds
    const minutes = Math.floor((elapsedTime % 3600000) / 60000); // 1 minute = 60000 milliseconds
    const seconds = Math.floor((elapsedTime % 60000) / 1000); // 1 second = 1000 milliseconds

    return format(new Date(0, 0, 0, hours, minutes, seconds), "HH:mm:ss");
  }, [elapsedTime]);
  return <Text variant="displaySmall">{stopwatch}</Text>;
}
