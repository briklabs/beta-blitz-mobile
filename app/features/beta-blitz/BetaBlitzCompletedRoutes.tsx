import React, { useMemo } from "react";
import { useBetaBlitzContext } from "./BetaBlitzContext";
import { Button, DataTable, IconButton, Text } from "react-native-paper";
import {
  formatDistance,
  formatDistanceStrict,
  formatDuration,
  intervalToDuration,
} from "date-fns";

export default function BetaBlitzCompletedRoutes() {
  const {
    completedRoutes,
    removeRouteByIndex,
    items,
    inProgress,
    startTimestamp,
  } = useBetaBlitzContext();
  const completed = useMemo(
    () =>
      completedRoutes?.map((r) => {
        const item = items.find((i) => i.value === r.value);
        const duration = formatDistanceStrict(
          startTimestamp,
          r.completedTimestamp,
          {
            addSuffix: false,
          }
        );
        return {
          label: item?.label ?? `${r.value} points`,
          value: String(r.value),
          mark: duration,
        };
      }) ?? [],
    [completedRoutes]
  );

  function handleRemove(index: number) {
    removeRouteByIndex(index);
  }

  return (
    <DataTable collapsable>
      <DataTable.Header>
        <DataTable.Title>Route</DataTable.Title>
        <DataTable.Title>Mark</DataTable.Title>
        <DataTable.Title numeric>Points</DataTable.Title>
        {inProgress && (
          <DataTable.Title>
            <></>
          </DataTable.Title>
        )}
      </DataTable.Header>

      {completed.map((item, i) => (
        <DataTable.Row key={i}>
          <DataTable.Cell>{item.label}</DataTable.Cell>
          <DataTable.Cell>{item.mark}</DataTable.Cell>
          <DataTable.Cell numeric>{item.value}</DataTable.Cell>
          {inProgress && (
            <DataTable.Cell style={{ justifyContent: "flex-end" }}>
              <IconButton
                onPress={() => handleRemove(i)}
                icon="trash-can"
                size={18}
              ></IconButton>
            </DataTable.Cell>
          )}
        </DataTable.Row>
      ))}
    </DataTable>
  );
}
