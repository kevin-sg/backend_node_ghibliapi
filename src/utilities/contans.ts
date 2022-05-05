// Type Query Params
export type TQueryParams = {
  page?: number | string;
  per_page?: number | string;
  limit?: number | string;
  skype?: number | string;
};

// Type Pagination
export type TPagination = { skipePage: number; limitPage: number; itemsPage: number };

export type TPaginationQuery = (query: TQueryParams) => TPagination;
