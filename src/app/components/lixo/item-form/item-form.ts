import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Item } from '../../../services/item.service';

@Component({
  selector: 'app-item-form',
  imports: [FormsModule],
  templateUrl: './item-form.html',
  styleUrl: './item-form.css',
})
export class ItemForm {
  novoItem = '';
  novoQuant = 0;
  novaCat = '';

  adicionarItem = output<Item>();

  adicionar() {
    if (this.novaCat === '') return;
    if (this.novoItem.trim() === '') return;

    const novo: Item = {
      nome: this.novoItem,
      quantidade: this.novoQuant,
      categoria: this.novaCat,
      depositado: false, //sempre falso
      visivel: true, // sempre verdadeiro
    };

    this.adicionarItem.emit(novo);

    this.novoItem = '';
    this.novoQuant = 0;
    this.novaCat = '';
  }
}
