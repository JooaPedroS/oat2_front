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
    if (this.novoQuant <= 0 && this.novaCat === '' && this.novoItem.trim() === '') return alert("Adicione as informações que faltam");
    if (this.novaCat === '') return alert('Categoria não selecionada');
    if (this.novoItem.trim() === '') return alert('Nome não adicionado');
    if (this.novoQuant <= 0) return alert('Quantidade não adicionada');

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
