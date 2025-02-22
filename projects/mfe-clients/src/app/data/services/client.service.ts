import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { Client } from '../../shared/models/client';
import { ClientMapper } from '../mappers/client.mapper';
import { ClientResponseDTO, ClientResquestDTO } from '../dto/client.dto';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private readonly baseUrl = 'https://boasorte.teddybackoffice.com.br';

  private readonly http = inject(HttpClient);

  getAll(page: number, limit: number): Observable<Client[]> {
    const url = `${this.baseUrl}/users`;
    const params = { page, limit };
    return this.http
      .get<{ clients: ClientResponseDTO[] }>(url, { params })
      .pipe(
        map(({ clients }) => clients),
        map((users) => users.map((user) => ClientMapper.toModel(user)))
      );
  }

  create(client: Partial<Client>): Observable<void> {
    const url = `${this.baseUrl}/users`;
    const clientDTO: ClientResquestDTO = ClientMapper.toDto(client);
    return this.http.post<void>(url, clientDTO);
  }
}
