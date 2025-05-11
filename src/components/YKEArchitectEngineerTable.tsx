import React, { useMemo, useState } from "react";
import { createColumnHelper, FilterFn } from "@tanstack/react-table";
import { YKEArchitectEngineerItem } from "@/models/domain/account-application/yke-architect-engineer.model";
import { useGetYKEArchitectEngineerListQuery } from "@/services/account-application";
import DataTable from "./DataTable";
import { createPaginationParams, exportToCSV } from "@/utils";

interface YKEArchitectEngineerTableProps {
  cityId: number | null;
}

const YKEArchitectEngineerTable: React.FC<YKEArchitectEngineerTableProps> = ({
  cityId,
}) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    data: ykeArchitectEngineerData,
    isLoading,
    error,
    refetch,
  } = useGetYKEArchitectEngineerListQuery(
    {
      id: cityId || 0,
      ...createPaginationParams(pagination.pageIndex, pagination.pageSize),
    },
    { skip: !cityId }
  );

  const statusFilterFn: FilterFn<YKEArchitectEngineerItem> = (
    row,
    columnId,
    filterValue
  ) => {
    if (!filterValue || filterValue === "") return true;

    const status = row.getValue(columnId) as boolean;
    const displayValue = status ? "Çalışıyor" : "Çalışmıyor";

    return displayValue.toLowerCase().includes(filterValue.toLowerCase());
  };

  const columnHelper = createColumnHelper<YKEArchitectEngineerItem>();

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
    if (!ykeArchitectEngineerData?.items) return [];
    return ykeArchitectEngineerData.items;
  }, [ykeArchitectEngineerData]);

  const handleRefresh = () => {
    refetch();
  };

  const handleExportCSV = () => {
    if (!ykeArchitectEngineerData?.items?.length) return;

    const headers = ["Adı", "Soyadı", "Görev", "Meslek", "Sicil No", "Durumu"];

    exportToCSV(
      ykeArchitectEngineerData.items,
      headers,
      `YKE_Mimar_Muhendis_Listesi_${cityId}`,
      (item: YKEArchitectEngineerItem) => [
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
      totalCount={ykeArchitectEngineerData?.totalCount || 0}
      isLoading={isLoading}
      error={error}
      onPageChange={handlePageChange}
      onRefresh={handleRefresh}
      onExportCSV={handleExportCSV}
      emptyMessage="Bu il için YKE Mimar/Mühendis bulunamadı."
      errorMessage="Veriler yüklenirken bir hata oluştu. Lütfen tekrar deneyin."
      exportButtonLabel="CSV İndir"
    />
  );
};

export default YKEArchitectEngineerTable;
