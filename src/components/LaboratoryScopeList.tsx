import React, { useMemo, useState } from "react";
import { useGetLabScopeListQuery } from "@/services/lab-experiment-material-standards";
import { createColumnHelper } from "@tanstack/react-table";
import DataTable from "./DataTable";
import { LabExperimentMaterialStandardItem } from "@/models/domain/lab-experiment-material-standards";

interface LaboratoryScopeListProps {
  fileNumber: number;
}

const LaboratoryScopeList: React.FC<LaboratoryScopeListProps> = ({
  fileNumber,
}) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    data: scopeListData,
    isLoading,
    error,
    refetch,
  } = useGetLabScopeListQuery({
    fileNumber: fileNumber,
    skip: pagination.pageIndex * pagination.pageSize,
    take: pagination.pageSize,
  });

  const columnHelper = createColumnHelper<LabExperimentMaterialStandardItem>();

  const columns = useMemo(
    () => [
      columnHelper.accessor(
        (row) => row.experimentMaterialStandards.experimentMaterial.name,
        {
          id: "experimentMaterial",
          header: "Deney Malzemesi",
          cell: (info) => <span>{info.getValue()}</span>,
          filterFn: "includesString",
        }
      ),
      columnHelper.accessor(
        (row) => row.experimentMaterialStandards.standards.name,
        {
          id: "experimentName",
          header: "Deney Adı",
          cell: (info) => <span>{info.getValue()}</span>,
          filterFn: "includesString",
        }
      ),
      columnHelper.accessor(
        (row) =>
          row.experimentMaterialStandards.experimentMaterial
            .experimentMaterialCategory.name,
        {
          id: "experimentMethod",
          header: "Deney Metodu",
          cell: (info) => <span>{info.getValue()}</span>,
          filterFn: "includesString",
        }
      ),
    ],
    [columnHelper]
  );

  const data = useMemo(() => {
    if (!scopeListData?.items) return [];
    return scopeListData.items;
  }, [scopeListData]);

  const handleRefresh = () => {
    refetch();
  };

  const handleExportCSV = () => {
    if (!scopeListData?.items?.length) return;

    const headers = ["Deney Malzemesi", "Deney Adı", "Deney Metodu"];
    const csvContent = [
      headers.join(","),
      ...scopeListData.items.map((item) =>
        [
          `"${item.experimentMaterialStandards.experimentMaterial.name}"`,
          `"${item.experimentMaterialStandards.standards.name}"`,
          `"${item.experimentMaterialStandards.experimentMaterial.experimentMaterialCategory.name}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `Laboratuvar_Kapsam_Listesi_${fileNumber}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePageChange = (pageIndex: number, pageSize: number) => {
    setPagination({ pageIndex, pageSize });
  };

  return (
    <div className="max-h-[60vh] overflow-y-auto">
      <DataTable
        data={data}
        columns={columns}
        totalCount={scopeListData?.totalCount || 0}
        isLoading={isLoading}
        error={error}
        onPageChange={handlePageChange}
        onRefresh={handleRefresh}
        onExportCSV={handleExportCSV}
        emptyMessage="Bu laboratuvar için kapsam bilgisi bulunamadı."
        errorMessage="Veriler yüklenirken bir hata oluştu. Lütfen tekrar deneyin."
        exportButtonLabel="CSV İndir"
      />
    </div>
  );
};

export default LaboratoryScopeList;
