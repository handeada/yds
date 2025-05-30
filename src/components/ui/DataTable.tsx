import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  PaginationState,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  FilterFn,
  ColumnFiltersState,
  getFacetedRowModel,
  getFacetedUniqueValues,
  ColumnDef,
} from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";
import {
  FiDownload,
  FiSearch,
  FiX,
  FiChevronUp,
  FiChevronDown,
  FiRefreshCw,
} from "react-icons/fi";
import { SkeletonTable } from "./Skeleton";

interface DataTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T, any>[];
  totalCount: number;
  isLoading: boolean;
  error: unknown;
  onPageChange: (pageIndex: number, pageSize: number) => void;
  onRefresh: () => void;
  onExportCSV?: () => void;
  emptyMessage?: string;
  errorMessage?: string;
  exportButtonLabel?: string;
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({ itemRank });
  return itemRank.passed;
};

function DataTable<T extends object>({
  data,
  columns,
  totalCount,
  isLoading,
  error,
  onPageChange,
  onRefresh,
  onExportCSV,
  emptyMessage = "Kayıt bulunamadı",
  errorMessage = "Veriler yüklenirken bir hata oluştu. Lütfen tekrar deneyin.",
  exportButtonLabel = "CSV İndir",
}: DataTableProps<T>) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { pageIndex, pageSize } = pagination;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    globalFilterFn: fuzzyFilter,
    manualPagination: true,
    pageCount: Math.ceil(totalCount / pageSize),
    state: {
      pagination,
      sorting,
      globalFilter,
      columnFilters,
    },
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function" ? updater(pagination) : updater;

      setPagination(newPagination);
      onPageChange(newPagination.pageIndex, newPagination.pageSize);
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
  });

  const pageSizeOptions = [5, 10, 25];

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = Number(e.target.value);
    table.setPageSize(newSize);
  };

  if (isLoading) {
    return (
      <div className="mx-4 py-4">
        <SkeletonTable
          rows={5}
          columns={columns.length > 3 ? 4 : columns.length}
        />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">{errorMessage}</div>;
  }

  if (!data || data.length === 0) {
    return <div className="text-center py-4">{emptyMessage}</div>;
  }

  return (
    <div className="mx-4">
      <div className="mb-3 flex flex-wrap items-center justify-between">
        <div className="flex items-start space-x-2">
          <h3 className="text-sm font-medium text-slate-700">Bulunan kayıt</h3>
          {globalFilter || columnFilters.length > 0 ? (
            <div className="flex items-center space-x-1.5">
              <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                {table.getFilteredRowModel().rows.length} {"/ "}
                {totalCount}
              </span>
            </div>
          ) : (
            <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
              {totalCount}
            </span>
          )}
        </div>
        <div className="flex space-x-2 mt-2 sm:mt-0">
          <button
            onClick={onRefresh}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded text-xs font-medium text-slate-600 flex items-center focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <FiRefreshCw className="h-4 w-4 mr-1.5" />
            Yenile
          </button>
          {onExportCSV && (
            <button
              onClick={onExportCSV}
              className="px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-600 rounded text-xs font-medium flex items-center focus:outline-none focus:ring-1 focus:ring-green-500"
            >
              <FiDownload className="h-4 w-4 mr-1.5" />
              {exportButtonLabel}
            </button>
          )}
        </div>
      </div>

      <div className="mb-3">
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
            <FiSearch className="h-3 w-3 text-slate-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            id="table-global-search"
            name="table-global-search"
            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 text-xs border-slate-300 rounded-md py-1.5 border"
            placeholder="Tüm alanlarda ara..."
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
          {globalFilter && (
            <div
              className="absolute inset-y-0 right-0 pr-2 flex items-center cursor-pointer"
              onClick={() => setGlobalFilter("")}
            >
              <FiX className="h-3 w-3 text-slate-400 hover:text-slate-500" />
            </div>
          )}
        </div>
      </div>

      <div className="rounded-md border border-slate-200 overflow-hidden shadow-sm">
        <div
          className="overflow-x-auto"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <table className="min-w-full divide-y divide-slate-200 text-xs">
            <thead>
              <tr className="bg-slate-50 text-left">
                {table.getHeaderGroups()[0].headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-3 py-2 text-xs font-semibold text-slate-600 tracking-wider"
                  >
                    <div
                      className="flex items-center space-x-1 cursor-pointer hover:text-slate-800"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <span>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </span>
                      <span>
                        {{
                          asc: <FiChevronUp className="h-3 w-3" />,
                          desc: <FiChevronDown className="h-3 w-3" />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
              <tr className="bg-slate-100 border-b border-slate-200">
                {table.getHeaderGroups()[0].headers.map((header) => (
                  <th key={header.id} className="px-2 py-1">
                    <div className="relative">
                      <input
                        type="text"
                        id={`column-filter-${header.id}`}
                        name={`column-filter-${header.id}`}
                        value={
                          (table
                            .getColumn(header.id)
                            ?.getFilterValue() as string) ?? ""
                        }
                        onChange={(e) =>
                          table
                            .getColumn(header.id)
                            ?.setFilterValue(e.target.value)
                        }
                        placeholder=""
                        className="w-full h-6 px-2 text-xs border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                      {(table
                        .getColumn(header.id)
                        ?.getFilterValue() as string) && (
                        <div
                          className="absolute inset-y-0 right-0 pr-2 flex items-center cursor-pointer"
                          onClick={() =>
                            table.getColumn(header.id)?.setFilterValue("")
                          }
                        >
                          <FiX className="h-3 w-3 text-slate-400 hover:text-slate-500" />
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50">
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-3 py-2 text-xs text-slate-600"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={table.getAllColumns().length}
                    className="px-3 py-4 text-center text-slate-500"
                  >
                    Kayıt bulunamadı
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between text-xs">
        <div className="flex items-center space-x-2 mb-2 sm:mb-0">
          <span className="text-slate-600">Sayfa başı:</span>
          <select
            id="page-size-select"
            name="page-size-select"
            value={pageSize}
            onChange={handlePageSizeChange}
            className="border border-slate-300 rounded py-0.5 px-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span className="text-slate-600 hidden sm:inline">kayıt</span>
        </div>

        <div className="flex justify-between sm:justify-end w-full sm:w-auto">
          <div className="flex items-center mr-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-xs text-slate-600">
              <span className="font-medium">
                {globalFilter || columnFilters.length > 0
                  ? table.getFilteredRowModel().rows.length > 0
                    ? `${pageIndex * pageSize + 1}-${Math.min(
                        (pageIndex + 1) * pageSize,
                        table.getFilteredRowModel().rows.length
                      )}`
                    : "0"
                  : totalCount > 0
                  ? `${pageIndex * pageSize + 1}-${Math.min(
                      (pageIndex + 1) * pageSize,
                      totalCount
                    )}`
                  : "0"}
              </span>
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <button
              className="px-1.5 py-0.5 border border-slate-300 rounded text-xs disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              {"<<"}
            </button>
            <button
              className="px-1.5 py-0.5 border border-slate-300 rounded text-xs disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<"}
            </button>
            <span className="px-2 py-0.5 rounded-md bg-blue-50 border border-blue-100 text-xs font-medium text-blue-700">
              {pageIndex + 1} /{" "}
              {globalFilter || columnFilters.length > 0
                ? Math.ceil(
                    table.getFilteredRowModel().rows.length / pageSize
                  ) || 1
                : table.getPageCount() || 1}
            </span>
            <button
              className="px-1.5 py-0.5 border border-slate-300 rounded text-xs disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </button>
            <button
              className="px-1.5 py-0.5 border border-slate-300 rounded text-xs disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onClick={() =>
                table.setPageIndex(
                  globalFilter || columnFilters.length > 0
                    ? Math.ceil(
                        table.getFilteredRowModel().rows.length / pageSize
                      ) - 1
                    : table.getPageCount() - 1
                )
              }
              disabled={!table.getCanNextPage()}
            >
              {">>"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataTable;
