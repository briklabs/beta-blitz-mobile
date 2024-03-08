import React, { useMemo } from "react";
import { useBetaBlitzContext } from "./BetaBlitzContext";
import { Button, DataTable } from "react-native-paper";

export default function BetaBlitzCompletedRoutes() {
  const { completedRoutes, removeRouteByIndex, items } = useBetaBlitzContext();
  const completed = useMemo<{ label: string; value: string }[]>(
    () =>
      completedRoutes?.map((r) => {
        const item = items.find((i) => i.value === r.value);
        return {
          label: item?.label ?? `${r.value} points`,
          value: String(r.value),
        };
      }) ?? [],
    [completedRoutes]
  );

  function handleRemove(index: number) {
    removeRouteByIndex(index);
  }

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Route</DataTable.Title>
        <DataTable.Title numeric>Points</DataTable.Title>
        <DataTable.Title>
          <></>
        </DataTable.Title>
      </DataTable.Header>

      {completed.map((item, i) => (
        <DataTable.Row key={i}>
          <DataTable.Cell>{item.label}</DataTable.Cell>
          <DataTable.Cell numeric>{item.value}</DataTable.Cell>
          <DataTable.Cell style={{ justifyContent: "flex-end" }}>
            <Button
              mode="text"
              onPress={() => handleRemove(i)}
              icon="trash-can"
            >
              delete
            </Button>
          </DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
}
