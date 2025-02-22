import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { Client } from '../../shared/models/client';
import { ClientMapper } from '../mappers/client.mapper';
import {
  ClientPaginationResponseDTO,
  ClientResquestDTO,
} from '../dto/client.dto';
import { ClientPagination } from '../../shared/models/client-pagination';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private readonly baseUrl = 'https://boasorte.teddybackoffice.com.br';

  private readonly http = inject(HttpClient);

  getAll(page: number, limit: number): Observable<ClientPagination> {
    const url = `${this.baseUrl}/users`;
    const params = { page, limit };
    return this.http
      .get<ClientPaginationResponseDTO>(url, { params })
      .pipe(map((pagination) => ClientMapper.paginationToModel(pagination)));
  }

  create(client: Partial<Client>): Observable<void> {
    const url = `${this.baseUrl}/users`;
    const clientDTO: ClientResquestDTO = ClientMapper.toDto(client);
    return this.http.post<void>(url, clientDTO);
  }

  edit(id: number, client: Partial<Client>): Observable<void> {
    const url = `${this.baseUrl}/users/${id}`;
    const clientDTO: ClientResquestDTO = ClientMapper.toDto(client);
    return this.http.patch<void>(url, clientDTO);
  }

  delete(id: number): Observable<void> {
    const url = `${this.baseUrl}/users/${id}`;
    return this.http.delete<void>(url);
  }
}
