import { Component, input, output } from '@angular/core';
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

  alternarItem = output<Item>();
  removerItem = output<Item>();
}
