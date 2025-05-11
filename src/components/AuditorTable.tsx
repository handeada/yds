import React, { useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { AuditorItem } from "@/models";
import { useGetAuditorListQuery } from "@/services/document-application";
import DataTable from "./DataTable";
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

  // Column definition using TanStack column helper
  const columnHelper = createColumnHelper<AuditorItem>();

  // Define columns for the table
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
          <span className={info.getValue() ? "text-green-500" : "text-red-500"}>
            {info.getValue() ? "Çalışıyor" : "Çalışmıyor"}
          </span>
        ),
        filterFn: "includesString",
      }),
    ],
    []
  );

  // Handle data for the table
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
    // Sayfalama bilgilerini güncelle
    setPagination({ pageIndex, pageSize });
  };

  // Loading state
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
