import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemService, Item } from '../../services/item.service';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})

export class Home {
  // esse componente não vai tratar os dados, ele só vai mandar os dados para o service
  private itemService = inject(ItemService);

  novoItem = '';
  novoQuant = 0;
  novaCat = '';
  hoje = new Date();

  itens = signal<Item[]>(this.itemService.buscarTodos());

  adicionar() {
    // não envia se não tiver categoria ou item
    if (this.novaCat == '') return;
    if (this.novoItem.trim() === '') return;

    const novo: Item = {
      nome: this.novoItem,
      quantidade: this.novoQuant,
      categoria: this.novaCat,
      depositado: false,
    };
    // adiciona o item declarado a lista
    this.itens.update((lista) => [...lista, novo]);

    this.itemService.salvar(this.itens()); // chama o service para salvar

    // zera os valores
    this.novoItem = ''; 
    this.novoQuant = 0;
    this.novaCat = '';
  }

  alternar(alvo: Item) { // só vai alterar o depositado para não depositado :v
    this.itens.update((lista) =>
      lista.map((i) => (i === alvo ? { ...i, depositado: !i.depositado } : i)),
    );

    this.itemService.salvar(this.itens());
  }

  remover(alvo: Item) {
    this.itens.update((lista) => lista.filter((i) => i !== alvo));

    this.itemService.salvar(this.itens());
  }

  total() {
    return this.itens().reduce((soma, i) => soma + i.quantidade, 0);
  }

  progresso() {
    // tira a porcentagem 
    const lista = this.itens();
    if (lista.length === 0) return 0;
    return lista.filter((i) => i.depositado).length / lista.length;
  }
}
