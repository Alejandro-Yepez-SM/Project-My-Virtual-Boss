import { Table } from "@tanstack/react-table";
import { ReactNode } from "react";

export interface IColumnConfig {
  header: string;
  accessor: string;
  size?: number;
  type?: DataTableType;
  visible?: boolean;
}

export enum DataTableType {
  text,
  widget,
}

interface ITableCell<T = unknown> {
  widgetToShow?: React.ReactNode;
  value: T;
}

export interface ITableRow {
  [key: string]: ITableCell;
}

export interface ITableConfig {
  columns: IColumnConfig[];
  tableData: ITableRow[];
  onRowClick?: (rowId: ITableRow) => void;
  rowLoadingIds?: string[];
  leftMenuActions?: (table: any, selectedRows: any) => ReactNode;
  rightMenuActions?: ReactNode;
  title: string;
  titleRightActions?: ReactNode;
  height?: string;
  footer?: ReactNode;
  allowRowSelection?: boolean;
  allowSearch?: boolean;
  allowColumnSorting?: boolean;
  allowColumnFiltering?: boolean;
  singleRowSelection?: boolean;
  loadingTableBody?: boolean;
  cellsPadding?: number;
  displayColumnsDisplayHandler?: boolean;
}

export interface ITansTaskTableBodyProps {
  tableData: Table<unknown>;
  columns: IColumnConfig[];
  onRowClick?: (rowId: ITableRow) => void;
  rowLoadingIds?: string[];
  allowRowSelection?: boolean;
  cellsPadding?: number;
  selectedRowIds: string[];
}
