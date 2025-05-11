import React, { useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { LaboratoryItem } from "@/models";
import { useGetLaboratoryListQuery } from "@/services/department";
import DataTable from "./ui/DataTable";
import Modal from "./ui/Modal";
import LaboratoryScopeList from "./LaboratoryScopeList";
import { FiClipboard } from "react-icons/fi";
import { createPaginationParams, exportToCSV } from "@/utils";

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
      ...createPaginationParams(pagination.pageIndex, pagination.pageSize),
    },
    { skip: !cityId }
  );

  const handleOpenScopeList = (lab: LaboratoryItem) => {
    setSelectedLab(lab);
    setModalOpen(true);
  };

  const columnHelper = createColumnHelper<LaboratoryItem>();

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
            className="px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded text-xs font-medium flex items-center focus:outline-none focus:ring-1 focus:ring-blue-500"
            title="Kapsam Listesi Görüntüle"
          >
            <FiClipboard className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Görüntüle</span>
          </button>
        ),
      }),
    ],
    [columnHelper]
  );

  const data = useMemo(() => {
    if (!laboratoryData?.items) return [];
    return laboratoryData.items;
  }, [laboratoryData]);

  const handleRefresh = () => {
    refetch();
  };

  const handleExportCSV = () => {
    if (!laboratoryData?.items?.length) return;

    const headers = [
      "Belge No",
      "Ünvanı",
      "İli",
      "Laboratuvar Tipi",
      "Telefon",
    ];

    exportToCSV(
      laboratoryData.items,
      headers,
      `Laboratuvar_Listesi_${cityId}`,
      (item: LaboratoryItem) => [
        item.fileNumber,
        item.name,
        item.locationName,
        item.labType,
        item.phone,
      ]
    );
  };

  const handlePageChange = (pageIndex: number, pageSize: number) => {
    setPagination({ pageIndex, pageSize });
  };

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
