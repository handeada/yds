import React, { useMemo, useState } from "react";
import { createColumnHelper, FilterFn } from "@tanstack/react-table";
import { SiteSupervisorItem } from "@/models/domain/document-application/site-supervisor.model";
import { useGetSiteSupervisorListQuery } from "@/services/site-supervisor";
import DataTable from "./DataTable";
import { createPaginationParams, exportToCSV } from "@/utils";

interface SiteSupervisorTableProps {
  cityId: number | null;
}

const SiteSupervisorTable: React.FC<SiteSupervisorTableProps> = ({
  cityId,
}) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    data: siteSupervisorData,
    isLoading,
    error,
    refetch,
  } = useGetSiteSupervisorListQuery(
    {
      id: cityId || 0,
      ...createPaginationParams(pagination.pageIndex, pagination.pageSize),
    },
    { skip: !cityId }
  );

  const statusFilterFn: FilterFn<SiteSupervisorItem> = (
    row,
    columnId,
    filterValue
  ) => {
    if (!filterValue || filterValue === "") return true;

    const status = row.getValue(columnId) as boolean;
    const displayValue = status ? "Çalışıyor" : "Çalışmıyor";

    return displayValue.toLowerCase().includes(filterValue.toLowerCase());
  };

  const columnHelper = createColumnHelper<SiteSupervisorItem>();

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
    []
  );

  const data = useMemo(() => {
    if (!siteSupervisorData?.items) return [];
    return siteSupervisorData.items;
  }, [siteSupervisorData]);

  const handleRefresh = () => {
    refetch();
  };

  const handleExportCSV = () => {
    if (!siteSupervisorData?.items?.length) return;

    const headers = ["Adı", "Soyadı", "Görev", "Meslek", "Sicil No", "Durumu"];

    exportToCSV(
      siteSupervisorData.items,
      headers,
      `Santiye_Sefi_Listesi_${cityId}`,
      (item: SiteSupervisorItem) => [
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
      totalCount={siteSupervisorData?.totalCount || 0}
      isLoading={isLoading}
      error={error}
      onPageChange={handlePageChange}
      onRefresh={handleRefresh}
      onExportCSV={handleExportCSV}
      emptyMessage="Bu il için Şantiye Şefi bulunamadı."
      errorMessage="Veriler yüklenirken bir hata oluştu. Lütfen tekrar deneyin."
      exportButtonLabel="CSV İndir"
    />
  );
};

export default SiteSupervisorTable;
