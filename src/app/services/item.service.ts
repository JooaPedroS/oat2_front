import { Injectable } from '@angular/core';

export interface Item {
  nome: string;
  quantidade: number;
  categoria: string;
  depositado: boolean;
  visivel: boolean;
  depositadoEm?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private chave = 'itens';
  private chaveMeta = 'meta-semanal';

  private itensIniciais: Item[] = [
    // para testes, fiquei com preguiça de tirar do código, então zerei a lista de itens iniciais
    {
      nome: 'Embalagem do Boneco do Luccas Neto',
      quantidade: 10000,
      categoria: 'plástico',
      depositado: false,
      visivel: true,
    },
  ];

  // Busca os dados
  buscarTodos(): Item[] {
    const dados = localStorage.getItem(this.chave);

    if (dados) {
      try {
        return JSON.parse(dados);
      } catch {
        return this.itensIniciais; // vai retornar uma lista vazia no fim do projeto
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
    // decidi que não vai ter tratamento, o usuario poderá adicioonar a mesma coisa varias vezes
    itens.push(item);
    this.salvar(itens);
  }

  // Remove um item
  remover(item: Item): void {
    const itens = this.buscarTodos().filter((i) => i !== item);

    this.salvar(itens);
  }

  total() {
    // busca apenas os visiveis
    return this.buscarTodos()
      .filter((i) => i.visivel)
      .reduce((soma, i) => soma + i.quantidade, 0);
  }

  progresso() {
    const lista = this.buscarTodos().filter((i) => i.visivel);

    if (lista.length === 0) return 0;

    return lista.filter((i) => i.depositado).length / lista.length;
  }

  buscarMeta(): number {
    const n = Number(localStorage.getItem(this.chaveMeta));
    return n > 0 ? n : 10;
  }

  salvarMeta(valor: number): void {
    localStorage.setItem(this.chaveMeta, String(valor));
  }
}
