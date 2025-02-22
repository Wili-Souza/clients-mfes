import { Client } from '../../shared/models/client';
import { ClientResponseDTO, ClientResquestDTO } from '../dto/client.dto';

export class ClientMapper {
  public static toModel(clientDto: ClientResponseDTO): Client {
    return {
      id: clientDto.id,
      name: clientDto.name,
      salary: clientDto.salary,
      companyValuation: clientDto.companyValuation,
    } as Client;
  }

  public static toDto(user: Partial<Client>): ClientResquestDTO {
    return {
      name: user.name,
      salary: user.salary,
      companyValuation: user.companyValuation,
    } as ClientResquestDTO;
  }
}
