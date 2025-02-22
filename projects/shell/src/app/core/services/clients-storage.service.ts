import { Injectable } from '@angular/core';

import { Client } from '../../../shared/models/client';

export interface ClientsStorageServiceI {
  setUserName: (name: string) => void;
  getUserName: () => string | null;
  resetUserName: () => void;
  setSelectedClients: (clients: Client[]) => void;
  getSelectedClients: () => Client[] | null;
  resetSelectedClients: () => void;
}

@Injectable({
  providedIn: 'root',
})
export class ClientsStorageService implements ClientsStorageServiceI {
  private readonly prefix = 'teddy';

  setUserName(name: string): void {
    this.set('user-name', name);
  }

  getUserName(): string | null {
    return this.get('user-name');
  }

  resetUserName(): void {
    this.reset('user-name');
  }

  setSelectedClients(clients: Client[]): void {
    this.set('selected-clients', JSON.stringify(clients));
  }

  getSelectedClients(): Client[] | null {
    const clientsStr = this.get('selected-clients');
    if (!clientsStr) return null;
    try {
      const clients = JSON.parse(clientsStr) as Client[];
      return clients;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  resetSelectedClients(): void {
    this.reset('selected-clients');
  }

  private set(key: string, value: string): void {
    try {
      localStorage.setItem(`${this.prefix}-${key}`, value);
    } catch (error) {
      console.log(error);
    }
  }

  private reset(key: string): void {
    localStorage.removeItem(key);
  }

  private get(key: string): string | null {
    return localStorage.getItem(`${this.prefix}-${key}`);
  }
}
