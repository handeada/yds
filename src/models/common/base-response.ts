export type BaseResponse<T> = {
  items: T[];
  totalCount: number;
  groupCount: number;
  success: boolean;
};
