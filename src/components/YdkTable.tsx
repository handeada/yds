import React, { useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { useGetYdkListQuery } from "@/services/department";
import DataTable from "./ui/DataTable";
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

  const columnHelper = createColumnHelper<YdkItem>();

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

  const data = useMemo(() => {
    if (!ydkData?.items) return [];

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
    setPagination({ pageIndex, pageSize });
  };

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
