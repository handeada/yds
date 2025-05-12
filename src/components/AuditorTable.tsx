import React, { useMemo, useState } from "react";
import { createColumnHelper, FilterFn } from "@tanstack/react-table";
import { AuditorItem } from "@/models";
import { useGetAuditorListQuery } from "@/services/document-application";
import DataTable from "./ui/DataTable";
import { createPaginationParams, exportToCSV } from "@/utils";

interface AuditorTableProps {
  cityId: number | null;
}

const AuditorTable: React.FC<AuditorTableProps> = ({ cityId }) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    data: auditorData,
    isLoading,
    error,
    refetch,
  } = useGetAuditorListQuery(
    {
      id: cityId || 0,
      ...createPaginationParams(pagination.pageIndex, pagination.pageSize),
    },
    { skip: !cityId }
  );

  const statusFilterFn: FilterFn<AuditorItem> = (
    row,
    columnId,
    filterValue
  ) => {
    if (!filterValue || filterValue === "") return true;

    const status = row.getValue(columnId) as boolean;
    const displayValue = status ? "Çalışıyor" : "Çalışmıyor";

    return displayValue.toLowerCase().includes(filterValue.toLowerCase());
  };

  const columnHelper = createColumnHelper<AuditorItem>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("personName", {
        header: "Adı",
        cell: (info) => <span>{info.getValue()}</span>,
        filterFn: "includesString",
      }),
      columnHelper.accessor("personSurName", {
        header: "Soyadı",
        cell: (info) => <span>{info.getValue()}</span>,
        filterFn: "includesString",
      }),
      columnHelper.accessor("taskName", {
        header: "Görev",
        cell: (info) => (
          <span className="truncate max-w-xs block">{info.getValue()}</span>
        ),
        filterFn: "includesString",
      }),
      columnHelper.accessor("titleName", {
        header: "Meslek",
        cell: (info) => <span>{info.getValue() || "-"}</span>,
        filterFn: "includesString",
      }),
      columnHelper.accessor("id", {
        header: "Sicil No",
        cell: (info) => <span>{info.getValue() || "-"}</span>,
        filterFn: "includesString",
      }),
      columnHelper.accessor("working", {
        header: "Durumu",
        cell: (info) => (
          <span
            className={
              info.getValue()
                ? "bg-[rgb(3,148,135)] text-white px-2 py-1 rounded"
                : "text-red-500"
            }
          >
            {info.getValue() ? "Çalışıyor" : "Çalışmıyor"}
          </span>
        ),
        filterFn: statusFilterFn,
      }),
    ],
    [columnHelper]
  );

  const data = useMemo(() => {
    if (!auditorData?.items) return [];
    return auditorData.items;
  }, [auditorData]);

  const handleRefresh = () => {
    refetch();
  };

  const handleExportCSV = () => {
    if (!auditorData?.items?.length) return;

    const headers = ["Adı", "Soyadı", "Görev", "Meslek", "Sicil No", "Durumu"];

    exportToCSV(
      auditorData.items,
      headers,
      `Denetci_Listesi_${cityId}`,
      (item: AuditorItem) => [
        item.personName,
        item.personSurName,
        item.taskName,
        item.titleName,
        item.id.toString(),
        item.working ? "Çalışıyor" : "Çalışmıyor",
      ]
    );
  };

  const handlePageChange = (pageIndex: number, pageSize: number) => {
    setPagination({ pageIndex, pageSize });
  };

  if (!cityId)
    return <div className="text-center py-4">Lütfen bir il seçin</div>;

  return (
    <DataTable
      data={data}
      columns={columns}
      totalCount={auditorData?.totalCount || 0}
      isLoading={isLoading}
      error={error}
      onPageChange={handlePageChange}
      onRefresh={handleRefresh}
      onExportCSV={handleExportCSV}
      emptyMessage="Bu il için denetçi bulunamadı."
      errorMessage="Veriler yüklenirken bir hata oluştu. Lütfen tekrar deneyin."
      exportButtonLabel="CSV İndir"
    />
  );
};

export default AuditorTable;
