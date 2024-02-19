import React, { useEffect, useMemo, useState } from "react";
import { useBetaBlitzContext } from "./BetaBlitzContext";
import { Text } from "react-native-paper";
import { addMilliseconds, format } from "date-fns";

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

  const stopwatch = useMemo(
    () => format(addMilliseconds(0, elapsedTime), "mm:ss"),
    [elapsedTime]
  );
  return <Text variant="displaySmall">{stopwatch}</Text>;
}
