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
  private itemService = inject(ItemService);

  protected readonly title = signal('oat_front');
  novoItem = '';
  novoQuant = 0;
  novaCat = '';
  hoje = new Date();

  itens = signal<Item[]>(this.itemService.buscarTodos());

  adicionar() {
    if (this.novaCat == '') return;
    if (this.novoItem.trim() === '') return;

    const novo: Item = {
      nome: this.novoItem,
      quantidade: this.novoQuant,
      categoria: this.novaCat,
      depositado: false,
    };

    this.itens.update((lista) => [...lista, novo]);

    this.itemService.salvar(this.itens());

    this.novoItem = '';
    this.novoQuant = 0;
  }

  alternar(alvo: Item) {
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
    const lista = this.itens();
    if (lista.length === 0) return 0;
    return lista.filter((i) => i.depositado).length / lista.length;
  }
}
