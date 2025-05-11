import React, { useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { ExperimentMaterialStandardItem } from "@/models";
import { useGetExperimentMaterialStandardsListQuery } from "@/services/experiment-material-standards";
import DataTable from "./DataTable";
import { createPaginationParams, exportToCSV } from "@/utils";

const ExperimentMaterialStandardsTable: React.FC = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    data: standardsData,
    isLoading,
    error,
    refetch,
  } = useGetExperimentMaterialStandardsListQuery({
    ...createPaginationParams(pagination.pageIndex, pagination.pageSize),
  });

  // Column definition using TanStack column helper
  const columnHelper = createColumnHelper<ExperimentMaterialStandardItem>();

  // Define columns for the table
  const columns = useMemo(
    () => [
      columnHelper.accessor(
        (row) => row.experimentMaterial.experimentMaterialCategory.name,
        {
          id: "categoryName",
          header: "Deney Malzemesi",
          cell: (info) => <span>{info.getValue()}</span>,
          filterFn: "includesString",
        }
      ),
      columnHelper.accessor((row) => row.experimentMaterial.name, {
        id: "materialName",
        header: "Deney Adı",
        cell: (info) => <span>{info.getValue()}</span>,
        filterFn: "includesString",
      }),
      columnHelper.accessor((row) => row.standards.name, {
        id: "standardName",
        header: "Standart",
        cell: (info) => <span>{info.getValue()}</span>,
        filterFn: "includesString",
      }),
      columnHelper.accessor("active", {
        header: "Durum",
        cell: (info) => (
          <span
            className={
              info.getValue()
                ? "bg-[rgb(3,148,135)] text-white px-2 py-1 rounded"
                : "text-red-500"
            }
          >
            {info.getValue() ? "Aktif" : "Pasif"}
          </span>
        ),
        filterFn: "equals",
      }),
    ],
    [columnHelper]
  );

  // Handle data for the table
  const data = useMemo(() => {
    if (!standardsData?.items) return [];
    return standardsData.items;
  }, [standardsData]);

  const handleRefresh = () => {
    refetch();
  };

  const handleExportCSV = () => {
    if (!standardsData?.items?.length) return;

    const headers = ["Kategori", "Deney Adı", "Standart", "Durum"];

    exportToCSV(
      standardsData.items,
      headers,
      "Kapsam_Listesi",
      (item: ExperimentMaterialStandardItem) => [
        item.experimentMaterial.experimentMaterialCategory.name,
        item.experimentMaterial.name,
        item.standards.name,
        item.active ? "Aktif" : "Pasif",
      ]
    );
  };

  const handlePageChange = (pageIndex: number, pageSize: number) => {
    // Sayfalama bilgilerini güncelle
    setPagination({ pageIndex, pageSize });
  };

  return (
    <DataTable
      data={data}
      columns={columns}
      totalCount={standardsData?.totalCount || 0}
      isLoading={isLoading}
      error={error}
      onPageChange={handlePageChange}
      onRefresh={handleRefresh}
      onExportCSV={handleExportCSV}
      emptyMessage="Kapsam listesi bulunamadı."
      errorMessage="Veriler yüklenirken bir hata oluştu. Lütfen tekrar deneyin."
      exportButtonLabel="CSV İndir"
    />
  );
};

export default ExperimentMaterialStandardsTable;
