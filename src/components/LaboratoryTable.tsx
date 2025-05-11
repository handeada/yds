import React, { useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { LaboratoryItem } from "@/models";
import { useGetLaboratoryListQuery } from "@/services/department";
import DataTable from "./DataTable";
import Modal from "./Modal";
import LaboratoryScopeList from "./LaboratoryScopeList";

interface LaboratoryTableProps {
  cityId: number | null;
}

const LaboratoryTable: React.FC<LaboratoryTableProps> = ({ cityId }) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLab, setSelectedLab] = useState<LaboratoryItem | null>(null);

  const {
    data: laboratoryData,
    isLoading,
    error,
    refetch,
  } = useGetLaboratoryListQuery(
    {
      locationId: cityId || 0,
      skip: pagination.pageIndex * pagination.pageSize,
      take: pagination.pageSize,
    },
    { skip: !cityId }
  );

  const handleOpenScopeList = (lab: LaboratoryItem) => {
    setSelectedLab(lab);
    setModalOpen(true);
  };

  // Column definition using TanStack column helper
  const columnHelper = createColumnHelper<LaboratoryItem>();

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
      columnHelper.accessor("locationName", {
        header: "İli",
        cell: (info) => <span>{info.getValue()}</span>,
        filterFn: "includesString",
      }),
      columnHelper.accessor("labType", {
        header: "Laboratuvar Tipi",
        cell: (info) => <span>{info.getValue()}</span>,
        filterFn: "includesString",
      }),
      columnHelper.accessor("phone", {
        header: "Telefon",
        cell: (info) => <span>{info.getValue() || "-"}</span>,
        filterFn: "includesString",
      }),
      columnHelper.display({
        id: "scopeList",
        header: "Kapsam Listesi",
        cell: (info) => (
          <button
            onClick={() => handleOpenScopeList(info.row.original)}
            className="text-blue-500 hover:text-blue-700"
            title="Kapsam Listesi Görüntüle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </button>
        ),
      }),
    ],
    [columnHelper]
  );

  // Handle data for the table
  const data = useMemo(() => {
    if (!laboratoryData?.items) return [];
    return laboratoryData.items;
  }, [laboratoryData]);

  const handleRefresh = () => {
    refetch();
  };

  const handleExportCSV = () => {
    if (!laboratoryData?.items?.length) return;

    // Create CSV content
    const headers = [
      "Belge No",
      "Ünvanı",
      "İli",
      "Laboratuvar Tipi",
      "Telefon",
    ];
    const csvContent = [
      headers.join(","),
      ...laboratoryData.items.map((item) =>
        [
          `"${item.fileNumber}"`,
          `"${item.name}"`,
          `"${item.locationName}"`,
          `"${item.labType}"`,
          `"${item.phone || "-"}"`,
        ].join(",")
      ),
    ].join("\n");

    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Laboratuvar_Listesi_${cityId}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePageChange = (pageIndex: number, pageSize: number) => {
    // Sayfalama bilgilerini güncelle
    setPagination({ pageIndex, pageSize });
  };

  // Loading state
  if (!cityId)
    return <div className="text-center py-4">Lütfen bir il seçin</div>;

  return (
    <>
      <DataTable
        data={data}
        columns={columns}
        totalCount={laboratoryData?.totalCount || 0}
        isLoading={isLoading}
        error={error}
        onPageChange={handlePageChange}
        onRefresh={handleRefresh}
        onExportCSV={handleExportCSV}
        emptyMessage="Bu il için laboratuvar bulunamadı."
        errorMessage="Veriler yüklenirken bir hata oluştu. Lütfen tekrar deneyin."
        exportButtonLabel="CSV İndir"
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`Kapsam Listesi ${selectedLab?.fileNumber} - ${selectedLab?.name}`}
      >
        {selectedLab && (
          <LaboratoryScopeList fileNumber={selectedLab.fileNumber} />
        )}
      </Modal>
    </>
  );
};

export default LaboratoryTable;
