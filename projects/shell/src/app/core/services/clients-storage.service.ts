import { Injectable } from '@angular/core';

export interface ClientsStorageServiceI {
  setUserName: (name: string) => void;
  getUserName: () => string | null;
  resetUserName: () => void;
  setClients: () => void;
  getClients: () => void;
  resetClients: () => void;
  setSelectedClients: () => void;
  getSelectedClients: () => void;
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
    this.get('user-name');
  }

  /* Not Implemented */
  setClients(): void {}
  getClients(): void {}
  resetClients(): void {}
  setSelectedClients(): void {}
  getSelectedClients(): void {}
  resetSelectedClients(): void {}

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
