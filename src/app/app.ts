import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Item {
nome: string;
Quantidade: number;
Depositado: boolean;
} 

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, CommonModule,FormsModule],
  templateUrl: './app.html'
})
export class App {
  protected readonly title = signal('oat_front');
  novoItem = '';
  novoQuant = 0;
  hoje = new Date();
  

  itens = signal<Item[]>([
    { nome: 'Sacola', Quantidade: 6, Depositado:false },
    { nome: 'Garrafas de Vidro', Quantidade: 8, Depositado:false },
    { nome: 'Latas de Oleo', Quantidade: 5, Depositado:true },
]);

  adicionar() {
   if (this.novoItem.trim() === '') return;
    this.itens.update(lista => [...lista, { nome: this.novoItem, Quantidade:
    this.novoQuant, Depositado:false }]);
    this.novoItem = '';
    this.novoQuant = 0;
  } 

  alternar(alvo: Item) {
    this.itens.update(lista =>
    lista.map(i => i === alvo ? { ...i, Depositado: !i.Depositado } : i));
  }
  remover(alvo: Item) {
    this.itens.update(lista => lista.filter(i => i !== alvo));
  }

  total() {
    return this.itens().reduce((soma, i) => soma + i.Quantidade, 0);
  }

  progresso() {
    const lista = this.itens();
    if (lista.length === 0) return 0;
    return lista.filter(i => i.Depositado).length / lista.length;
  }
}

