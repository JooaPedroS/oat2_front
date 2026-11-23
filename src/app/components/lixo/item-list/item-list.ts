import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../../../services/item.service';

@Component({
  selector: 'app-item-list',
  imports: [CommonModule],
  templateUrl: './item-list.html',
  styleUrl: './item-list.css',
})
export class ItemList {
  itens = input<Item[]>([]);
  itensVisiveis = computed(() => this.itens().filter((item) => item.visivel !== false));

  alternarItem = output<Item>();
  removerItem = output<Item>();
}
