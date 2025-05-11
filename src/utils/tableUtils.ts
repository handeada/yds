/**
 * Table utility functions for common table operations
 */

/**
 * Generate and download a CSV file from data
 * @param items Data items to export
 * @param headers CSV column headers
 * @param fileName Name of the CSV file (without extension)
 * @param mapFunction Function to map each item to CSV row values
 */
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

/**
 * Create pagination parameters for API requests
 * @param pageIndex Current page index
 * @param pageSize Items per page
 * @returns Object with skip and take parameters
 */
export const createPaginationParams = (
  pageIndex: number,
  pageSize: number
) => ({
  skip: pageIndex * pageSize,
  take: pageSize,
});
