export interface ClientResponseDTO {
  id: number;
  name: string;
  salary: number;
  companyValuation: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ClientPaginationResponseDTO {
  clients: ClientResponseDTO[];
  totalPages: number;
  currentPage: number;
}

export interface ClientResquestDTO {
  name: string;
  salary: number;
  companyValuation: number;
}
