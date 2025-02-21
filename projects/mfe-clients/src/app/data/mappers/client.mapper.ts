import { Client } from "../../shared/models/client";
import { ClientDTO } from "../dto/client.dto";

export class ClientMapper {
  public static toModel(clientDto: ClientDTO): Client {
    return {
      id: clientDto.id,
      name: clientDto.name,
      salary: clientDto.salary,
      companyValuation: clientDto.companyValuation,
    } as Client;
  }

  public static toDto(user: Client): ClientDTO {
    return {
      id: user.id,
      name: user.name,
      salary: user.salary,
      companyValuation: user.companyValuation,
    } as ClientDTO;
  }
}
