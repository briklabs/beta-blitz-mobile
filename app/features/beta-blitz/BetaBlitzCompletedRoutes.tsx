import React, { useMemo } from "react";
import { useBetaBlitzContext } from "./BetaBlitzContext";
import { Button, DataTable } from "react-native-paper";

export default function BetaBlitzCompletedRoutes() {
  const { completedRoutes, removeRouteByIndex, items } = useBetaBlitzContext();
  const completed = useMemo<{ label: string; value: string }[]>(
    () =>
      completedRoutes.map((r) => {
        const item = items.find((i) => i.value === r);
        return {
          label: item?.label ?? `${r} points`,
          value: String(r),
        };
      }),
    [completedRoutes]
  );

  function handleRemove(index: number) {
    removeRouteByIndex(index);
  }

  return (
    // <View
    //   style={{
    //     flexDirection: "row",
    //     gap: 4,
    //     flexWrap: "wrap",
    //   }}
    // >
    //   {completed.map((cr, i) => (
    //     <Chip
    //       key={i}
    //       mode="outlined"
    //       avatar={<Avatar.Text label={cr.value} size={24} />}
    //       onPress={() => handlePress(i)}
    //       onClose={editRouteIndex === i ? () => handleRemove(i) : undefined}
    //     >
    //       {cr.label}
    //     </Chip>
    //   ))}
    // </View>

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
