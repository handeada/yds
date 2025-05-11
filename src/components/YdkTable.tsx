import React, { useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { useGetYdkListQuery } from "@/services/department";
import DataTable from "./DataTable";
import { YdkItem } from "@/models";
import { createPaginationParams, exportToCSV } from "@/utils";

interface YdkTableProps {
  cityId: number | null;
}

const YdkTable: React.FC<YdkTableProps> = ({ cityId }) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    data: ydkData,
    isLoading,
    error,
    refetch,
  } = useGetYdkListQuery(
    {
      locationId: cityId || 0,
      ...createPaginationParams(pagination.pageIndex, pagination.pageSize),
    },
    { skip: !cityId }
  );

  // Column definition using TanStack column helper
  const columnHelper = createColumnHelper<YdkItem>();

  // Define columns for the table
  const columns = useMemo(
    () => [
      columnHelper.accessor("fileNumber", {
        header: "Belge No",
        cell: (info) => <span>{info.getValue()}</span>,
        filterFn: "includesString",
      }),
      columnHelper.accessor("name", {
        header: "Ünvanı",
        cell: (info) => <span>{info.getValue()}</span>,
        filterFn: "includesString",
      }),
      columnHelper.accessor("address", {
        header: "Adres",
        cell: (info) => (
          <span className="truncate max-w-xs block">{info.getValue()}</span>
        ),
        filterFn: "includesString",
      }),
      columnHelper.accessor("phone", {
        header: "Telefon",
        cell: (info) => <span>{info.getValue() || "-"}</span>,
        filterFn: "includesString",
      }),
    ],
    []
  );

  // Handle data for the table with phone field added
  const data = useMemo(() => {
    if (!ydkData?.items) return [];

    // Add phone field to each item if missing from API
    return ydkData.items;
  }, [ydkData]);

  const handleRefresh = () => {
    refetch();
  };

  const handleExportCSV = () => {
    if (!ydkData?.items?.length) return;

    const headers = ["Belge No", "Ünvanı", "Adres", "Telefon"];

    exportToCSV(
      ydkData.items,
      headers,
      `YDK_Listesi_${cityId}`,
      (item: YdkItem) => [
        item.fileNumber,
        item.name,
        item.address,
        item.phone || "-",
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
      totalCount={ydkData?.totalCount || 0}
      isLoading={isLoading}
      error={error}
      onPageChange={handlePageChange}
      onRefresh={handleRefresh}
      onExportCSV={handleExportCSV}
      emptyMessage="Bu il için yapı denetim kuruluşu bulunamadı."
      errorMessage="Veriler yüklenirken bir hata oluştu. Lütfen tekrar deneyin."
      exportButtonLabel="CSV İndir"
    />
  );
};

export default YdkTable;
