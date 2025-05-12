import React, { useMemo, useState } from "react";
import { createColumnHelper, FilterFn } from "@tanstack/react-table";
import { ControlWorkerItem } from "@/models/domain/account-application/control-worker.model";
import { useGetControlWorkerListQuery } from "@/services/account-application";
import DataTable from "./ui/DataTable";
import { createPaginationParams, exportToCSV } from "@/utils";

interface ControlWorkerTableProps {
  cityId: number | null;
}

const ControlWorkerTable: React.FC<ControlWorkerTableProps> = ({ cityId }) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    data: controlWorkerData,
    isLoading,
    error,
    refetch,
  } = useGetControlWorkerListQuery(
    {
      id: cityId || 0,
      ...createPaginationParams(pagination.pageIndex, pagination.pageSize),
    },
    { skip: !cityId }
  );

  const statusFilterFn: FilterFn<ControlWorkerItem> = (
    row,
    columnId,
    filterValue
  ) => {
    if (!filterValue || filterValue === "") return true;

    const status = row.getValue(columnId) as boolean;
    const displayValue = status ? "Çalışıyor" : "Çalışmıyor";

    return displayValue.toLowerCase().includes(filterValue.toLowerCase());
  };

  const columnHelper = createColumnHelper<ControlWorkerItem>();

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
        header: "Alan",
        cell: (info) => <span>{info.getValue() || "-"}</span>,
        filterFn: "includesString",
      }),
      columnHelper.accessor("occupationalRegistrationNumber", {
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
    if (!controlWorkerData?.items) return [];
    return controlWorkerData.items;
  }, [controlWorkerData]);

  const handleRefresh = () => {
    refetch();
  };

  const handleExportCSV = () => {
    if (!controlWorkerData?.items?.length) return;

    const headers = ["Adı", "Soyadı", "Görev", "Alan", "Sicil No", "Durumu"];

    exportToCSV(
      controlWorkerData.items,
      headers,
      `Yardimci_Kontrol_Elemani_Listesi_${cityId}`,
      (item: ControlWorkerItem) => [
        item.personName,
        item.personSurName,
        item.taskName,
        item.titleName,
        item.occupationalRegistrationNumber,
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
      totalCount={controlWorkerData?.totalCount || 0}
      isLoading={isLoading}
      error={error}
      onPageChange={handlePageChange}
      onRefresh={handleRefresh}
      onExportCSV={handleExportCSV}
      emptyMessage="Bu il için Yardımcı Kontrol Elemanı bulunamadı."
      errorMessage="Veriler yüklenirken bir hata oluştu. Lütfen tekrar deneyin."
      exportButtonLabel="CSV İndir"
    />
  );
};

export default ControlWorkerTable;
