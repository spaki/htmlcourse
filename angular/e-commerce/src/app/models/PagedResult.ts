export interface PagedResult<T> {
  page: number;
  totalPages: number;
  items: T[];
}
  