import { Component, input, computed } from '@angular/core';
import { Item } from '../../services/item.service';

@Component({
  imports: [],
  selector: 'app-trash-map',
  styleUrl: './trash-map.css',
  templateUrl: './trash-map.html',
})
export class TrashMap {
  itens = input<Item[]>([]);

  categorias = computed(() => {
    const categoriasUnicas = this.itens()
      .filter((item) => !item.depositado)
      .map((item) => item.categoria);

    return [...new Set(categoriasUnicas)];
  });
}
