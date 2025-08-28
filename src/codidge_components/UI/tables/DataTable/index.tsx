import {
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  flexRender,
  Row,
  getFilteredRowModel,
} from "@tanstack/react-table";

import { ITableConfig, ITableRow, ITansTaskTableBodyProps } from "./interfaces";

import { renderCellContent } from "./utils";
import { tableMetaData } from "./meta";
import Input from "../../form/input/InputField";
import { Filter, Settings, SortAsc } from "lucide-react";
import { useState } from "react";
import Checkbox from "../../form/input/Checkbox";

import { rankItem } from "@tanstack/match-sorter-utils";
import type { FilterFn } from "@tanstack/react-table";
import CheckBoxMultiSelect from "../../form/selects/checkBoxMultiSelect";
import OutlineButton from "../../button/OutlineButton";
import { TableHeader, TableRow, TableCell, TableBody, Table } from "../Common";
import { PageLoading } from "../../loading/pageLoading";

const fuzzyFilter: FilterFn<unknown> = (row, columnId, value) => {
  const cellValue = row.getValue(columnId);
  return rankItem(String(cellValue), String(value)).passed;
};

export default function DataTable({
  columns,
  tableData,
  onRowClick,
  rowLoadingIds,
  leftMenuActions,
  rightMenuActions,
  title,
  titleRightActions,
  height,
  footer,
  allowRowSelection,
  allowColumnFiltering,
  allowColumnSorting,
  allowSearch,
  singleRowSelection,
  loadingTableBody,
  cellsPadding,
  displayColumnsDisplayHandler,
}: ITableConfig) {
  const columnHelper = createColumnHelper<unknown>();

  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >(() =>
    columns.reduce((acc, col) => {
      acc[col.accessor] = col.visible ?? true;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const tableColumns = columns.reduce((acc: unknown[], colData, index) => {
    const isLast = index === columns.length - 1;

    acc.push(
      columnHelper.accessor((row: any) => row[colData.accessor].value, {
        id: colData.accessor,
        enableGlobalFilter: true,
        filterFn: "includesString",
        meta: {
          header: colData?.header ?? "",
        },
        header: () => colData.header,
        cell: (info) =>
          renderCellContent(info.row.original as ITableRow, colData),
        size: isLast
          ? (colData.size ?? tableMetaData.defaultColumnWidth) + 30
          : colData.size ?? tableMetaData.defaultColumnWidth,
      })
    );

    return acc;
  }, []);

  if (allowRowSelection) {
    tableColumns.unshift(
      columnHelper.display({
        id: "__row_selection__",
        header: ({ table }) =>
          !singleRowSelection && (
            <Checkbox
              checked={table.getIsAllRowsSelected()}
              onChange={table.getToggleAllRowsSelectedHandler()}
            />
          ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
        size: 20,
      })
    );
  }

  const table = useReactTable({
    columns: tableColumns as ColumnDef<unknown, unknown>[],
    data: tableData,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter, //
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    onColumnVisibilityChange: setColumnVisibility,
    enableMultiRowSelection: !singleRowSelection,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: allowRowSelection ?? false,
  });

  const tableHeightOrigin = footer ? "85vh" : "90vh";

  const selectedRows = table
    .getSelectedRowModel()
    .rows.map((r) => r.original as ITableRow);

  const selectedRowIds = table.getSelectedRowModel().rows.map((r) => r.id);

  const columnOptions = table.getAllLeafColumns().map((col) => {
    const meta = col.columnDef.meta as any;
    return {
      value: col.id,
      text: meta?.header ?? "",
      checked: col.getIsVisible(),
    };
  });

  const handleColumnVisibilityChange = (selectedValues: string[]) => {
    table.getAllLeafColumns().forEach((col) => {
      const shouldBeVisible = selectedValues.includes(col.id);
      col.toggleVisibility(shouldBeVisible);
    });
  };
  return (
    <div className="space-y-3">
      <div className="w-full px-3 flex justify-between items-center">
        <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
          {title}
        </h3>
        <div>{titleRightActions}</div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div
          className="rounded-xl overflow-auto"
          style={{
            height: height ?? `calc(${tableHeightOrigin} - 72px - 32px)`,
          }}
        >
          {
            <div
              className={`flex justify-between ${
                (leftMenuActions ||
                  allowSearch ||
                  allowColumnFiltering ||
                  allowColumnSorting) &&
                "p-3"
              }`}
            >
              <div>
                {leftMenuActions ? leftMenuActions(table, selectedRows) : null}
              </div>
              <div className="flex gap-3">
                {allowSearch && (
                  <Input
                    className="min-w-[300px]"
                    name="Search"
                    onChange={(e) => {
                      table.setGlobalFilter(e.target.value);
                    }}
                    value={globalFilter}
                    clearable={true}
                    placeholder={`Search ${title}`}
                  />
                )}
                {allowColumnSorting && (
                  <OutlineButton>
                    <SortAsc size={16} className="mr-3" /> Sort
                  </OutlineButton>
                )}
                {allowColumnFiltering && (
                  <OutlineButton>
                    <Filter size={16} className="mr-3" /> Filter
                  </OutlineButton>
                )}
                {rightMenuActions ?? ""}
                {displayColumnsDisplayHandler && (
                  <CheckBoxMultiSelect
                    defaultSelected={columnOptions.map((opt) => {
                      if (opt.checked && opt.value) {
                        return opt.value;
                      }
                      return "";
                    })}
                    label={<Settings size={16} />}
                    options={columnOptions}
                    onChange={(selected) =>
                      handleColumnVisibilityChange(selected)
                    }
                  />
                )}
              </div>
            </div>
          }
          {!loadingTableBody ? (
            <Table className="">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableHeader
                  key={headerGroup.id}
                  className="sticky top-0 z-10 bg-gray-50 border-b border-gray-100 dark:border-white/[0.05]"
                >
                  <TableRow>
                    {headerGroup.headers.map((headItem) => (
                      <TableCell
                        key={headItem.id}
                        isHeader
                        width={`${headItem.column.getSize()}px`}
                        className="px-4 py-3 font-semibold text-gray-500 text-start text-theme-sm dark:text-gray-400"
                      >
                        {flexRender(
                          headItem.column.columnDef.header,
                          headItem.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHeader>
              ))}
              <TankStacktableBody
                columns={columns}
                tableData={table}
                onRowClick={onRowClick}
                cellsPadding={cellsPadding}
                rowLoadingIds={rowLoadingIds}
                selectedRowIds={selectedRowIds}
                allowRowSelection={allowRowSelection}
              />
            </Table>
          ) : (
            <PageLoading />
          )}
        </div>
        {footer && (
          <div className="rounded-b-xl bg-gray-50 border-t border-gray-100 dark:border-white/[0.05] px-4 py-3 text-sm text-gray-500">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

const TankStacktableBody = ({
  tableData,
  onRowClick,
  rowLoadingIds,
  cellsPadding,
  selectedRowIds,
}: ITansTaskTableBodyProps) => {
  return (
    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
      {tableData.getRowModel().rows.map((row: Row<unknown>) => {
        const isRowSelected = selectedRowIds.includes(row.id);

        const hoverClass =
          tableData.options.enableRowSelection || onRowClick
            ? "cursor-pointer hover:bg-gray-100"
            : "";

        return (
          <TableRow
            onClick={() => {
              if (tableData.options.enableRowSelection) {
                row.toggleSelected();
              }
              if (onRowClick) {
                onRowClick(row.original as ITableRow);
              }
            }}
            key={row.id}
            className={
              isRowSelected ? `bg-gray-100 ${hoverClass}` : `${hoverClass}`
            }
          >
            {row.getVisibleCells().map((cell) => {
              const originalRow = row.original as {
                id: {
                  value: string;
                };
              };
              const rowId = originalRow.id;

              const isLoading =
                rowLoadingIds &&
                rowLoadingIds.length > 0 &&
                rowLoadingIds?.includes(rowId.value);

              if (isLoading) {
                return <td className="bg-gray-50 h-[60px]"></td>;
              }
              return (
                <TableCell
                  key={cell.id}
                  width={`${cell.column.getSize()}px`}
                  className={`${
                    cellsPadding ? `px-${cellsPadding}` : "px-4"
                  } py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400`}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
};
