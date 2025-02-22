import { Client } from './client';

export interface ClientPagination {
  clients: Client[];
  totalPages: number;
  currentPage: number;
}
