import React, { useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { DistributionResponse } from "@/models/distribution.model";
import { useGetDistributionListQuery } from "@/services/distribution";
import DataTable from "./DataTable";
import { exportToCSV } from "@/utils";

interface DistributionTableProps {
  cityId: number | null;
}

const DistributionTable: React.FC<DistributionTableProps> = ({ cityId }) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    data: distributionData = [],
    isLoading,
    error,
    refetch,
  } = useGetDistributionListQuery(cityId || 0, { skip: !cityId });

  const columnHelper = createColumnHelper<DistributionResponse>();

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("tr-TR");
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("dagitim_tarihi", {
        header: "Dağıtım Tarihi",
        cell: (info) => <span>{formatDate(info.getValue())}</span>,
        filterFn: "includesString",
      }),
      columnHelper.accessor("havuzgrup", {
        header: "Havuz Grup",
        cell: (info) => <span>{info.getValue()}</span>,
        filterFn: "includesString",
      }),
      columnHelper.accessor("yibfid", {
        header: "YİBF",
        cell: (info) => <span>{info.getValue()}</span>,
        filterFn: "includesString",
      }),
      columnHelper.accessor("belgeno", {
        header: "Belge No",
        cell: (info) => <span>{info.getValue()}</span>,
        filterFn: "includesString",
      }),
      columnHelper.accessor("unvan", {
        header: "Firma Unvanı",
        cell: (info) => <span>{info.getValue()}</span>,
        filterFn: "includesString",
      }),
      columnHelper.accessor("m2", {
        header: "Alan (m²)",
        cell: (info) => <span>{info.getValue().toLocaleString("tr-TR")}</span>,
        filterFn: "includesString",
      }),
      columnHelper.accessor("il_name", {
        header: "İl Adı",
        cell: (info) => <span>{info.getValue()}</span>,
        filterFn: "includesString",
      }),
    ],
    []
  );

  const handleRefresh = () => {
    refetch();
  };

  const handleExportCSV = () => {
    if (!distributionData?.length) return;

    const headers = [
      "Dağıtım Tarihi",
      "Havuz Grup",
      "YİBF",
      "Belge No",
      "Firma Unvanı",
      "Alan (m²)",
      "İl Adı",
    ];

    exportToCSV(
      distributionData,
      headers,
      `DENETÇİ_LİSTESİ_${cityId}`,
      (item: DistributionResponse) => [
        formatDate(item.dagitim_tarihi),
        item.havuzgrup.toString(),
        item.yibfid.toString(),
        item.belgeno.toString(),
        item.unvan,
        item.m2.toString(),
        item.il_name,
      ]
    );
  };

  const handlePageChange = (pageIndex: number, pageSize: number) => {
    setPagination({ pageIndex, pageSize });
  };

  const paginatedData = useMemo(() => {
    const start = pagination.pageIndex * pagination.pageSize;
    const end = start + pagination.pageSize;
    return distributionData.slice(start, end);
  }, [distributionData, pagination]);

  if (!cityId)
    return <div className="text-center py-4">Lütfen bir il seçin</div>;

  return (
    <DataTable
      data={paginatedData}
      columns={columns}
      totalCount={distributionData.length}
      isLoading={isLoading}
      error={error}
      onPageChange={handlePageChange}
      onRefresh={handleRefresh}
      onExportCSV={handleExportCSV}
      emptyMessage="Bu il için dağıtım kaydı bulunamadı."
      errorMessage="Veriler yüklenirken bir hata oluştu. Lütfen tekrar deneyin."
      exportButtonLabel="CSV İndir"
    />
  );
};

export default DistributionTable;
