import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Item {
nome: string;
quantidade: number;
categoria: string;
depositado: boolean;
} 

@Component({
  imports: [CommonModule,FormsModule],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  protected readonly title = signal('oat_front');
  novoItem = '';
  novoQuant = 0;
  novaCat = '';
  hoje = new Date();

  itens = signal<Item[]>([
    { nome: 'Sacola', quantidade: 6, categoria: "plástico", depositado: false },
    { nome: 'Garrafas de Vidro', quantidade: 8, categoria: "vidro", depositado: false },
    { nome: 'Latas de Oleo', quantidade: 5, categoria: "metal", depositado: true },
  ]);

  adicionar() {
    if (this.novaCat == "") {
      return;
    }

    if (this.novoItem.trim() === '') return;
    this.itens.update((lista) => [
      ...lista,
      { nome: this.novoItem, quantidade: this.novoQuant, categoria: this.novaCat, depositado: false },
    ]);
    this.novoItem = '';
    this.novoQuant = 0;
  }

  alternar(alvo: Item) {
    this.itens.update((lista) =>
      lista.map((i) => (i === alvo ? { ...i, depositado: !i.depositado } : i)),
    );
  }
  remover(alvo: Item) {
    this.itens.update((lista) => lista.filter((i) => i !== alvo));
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
