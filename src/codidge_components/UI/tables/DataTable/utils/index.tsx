import { ReactNode } from "react";
import { DataTableType, ITableRow } from "../interfaces";

export const renderCellContent = (row: ITableRow, col: any) => {
  const colType = col.type ?? DataTableType.text;

  switch (colType) {
    case DataTableType.text:
      return (
        <div className="text-sm">
          {row[col.accessor].widgetToShow as ReactNode}
        </div>
      );
    case DataTableType.widget:
      return <div className="text-sm">{row[col.accessor].widgetToShow}</div>;
    default:
      return <>-</>;
  }
};
