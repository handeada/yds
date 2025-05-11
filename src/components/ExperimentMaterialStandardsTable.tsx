import React, { useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { ExperimentMaterialStandardItem } from "@/models";
import { useGetExperimentMaterialStandardsListQuery } from "@/services/experiment-material-standards";
import DataTable from "./DataTable";

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
    skip: pagination.pageIndex * pagination.pageSize,
    take: pagination.pageSize,
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
          <span className={info.getValue() ? "text-green-500" : "text-red-500"}>
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

    // Create CSV content
    const headers = ["Kategori", "Deney Adı", "Standart", "Durum"];
    const csvContent = [
      headers.join(","),
      ...standardsData.items.map((item: ExperimentMaterialStandardItem) =>
        [
          `"${item.experimentMaterial.experimentMaterialCategory.name}"`,
          `"${item.experimentMaterial.name}"`,
          `"${item.standards.name}"`,
          `"${item.active ? "Aktif" : "Pasif"}"`,
        ].join(",")
      ),
    ].join("\n");

    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "Kapsam_Listesi.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
