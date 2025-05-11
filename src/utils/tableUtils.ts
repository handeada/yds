export const exportToCSV = <T>(
  items: T[],
  headers: string[],
  fileName: string,
  mapFunction: (item: T) => (string | number | undefined | null)[]
): void => {
  if (!items?.length) return;

  // Create CSV content
  const csvContent = [
    headers.join(","),
    ...items.map((item) =>
      mapFunction(item)
        .map((value) => `"${value ?? "-"}"`)
        .join(",")
    ),
  ].join("\n");

  // Create and download file
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${fileName}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const createPaginationParams = (
  pageIndex: number,
  pageSize: number
) => ({
  skip: pageIndex * pageSize,
  take: pageSize,
});
