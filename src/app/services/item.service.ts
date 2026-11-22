import { Injectable } from '@angular/core';

export interface Item {
  nome: string;
  quantidade: number;
  categoria: string;
  depositado: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private chave = 'itens';

  private itensIniciais: Item[] = [
    { nome: 'Sacola', quantidade: 6, categoria: 'plástico', depositado: false },
    { nome: 'Garrafas de Vidro', quantidade: 8, categoria: 'vidro', depositado: false },
    { nome: 'Latas de Oleo', quantidade: 5, categoria: 'metal', depositado: true },
  ];

  // Busca os dados
  buscarTodos(): Item[] {
    const dados = localStorage.getItem(this.chave);

    if (dados) {
      try {
        return JSON.parse(dados);
      } catch {
        return this.itensIniciais;
      }
    }

    this.salvar(this.itensIniciais);
    return this.itensIniciais;
  }

  // Salva os dados
  salvar(itens: Item[]): void {
    localStorage.setItem(this.chave, JSON.stringify(itens));
  }

  // Adiciona um item
  adicionar(item: Item): void {
    const itens = this.buscarTodos();
    itens.push(item);
    this.salvar(itens);
  }

  // Remove um item
  remover(item: Item): void {
    const itens = this.buscarTodos().filter((i) => i !== item);

    this.salvar(itens);
  }
}
