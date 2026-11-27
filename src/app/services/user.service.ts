import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  private key = 'username';

  exists(): boolean {
    // checa se username existe
    return !!localStorage.getItem(this.key);
  }

  get(): string {
    // retorna o nome salvo
    return localStorage.getItem(this.key) ?? '';
  }

  store(name: string) {
    // sobrescreve o username
    localStorage.setItem(this.key, name.trim());
  }

  clear() {
    localStorage.removeItem('username');
  }
}
