import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemService, Item } from '../../services/item.service';

// não sei exatamente aonde eu deveria por os componentes filho, resolvi colocar em pastas separadas
import { ItemForm } from '../../components/home/item-form/item-form';
import { ItemList } from '../../components/home/item-list/item-list';

import { TrashMap } from '../../components/trash-map/trash-map';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ItemForm, ItemList, TrashMap],
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  /*
    basicamente esse componente faz a ponte entre o formulario, service e tabela
    ele recebe os dados do form, envia pro service que salva no localstorage e envia para a tabela

    os componentes-filho são apenas o form e a tabela. a lógica inteira fica no home e o service salva e busca
  */
  private itemService = inject(ItemService);

  hoje = new Date();

  itens = signal<Item[]>(this.itemService.buscarTodos());

  adicionar(novo: Item) {
    this.itens.update((lista) => [...lista, novo]);

    this.itemService.salvar(this.itens());
  }

  alternar(alvo: Item) {
    this.itens.update((lista) =>
      lista.map((i) => (i === alvo ? { ...i, depositado: !i.depositado } : i)),
    );

    this.itemService.salvar(this.itens());
  }

  remover(alvo: Item) {
    // talvez eu coloque algo para não apagar nunca e só ficar oculto...

    // ele vai remover se o item não for depositado
    // se não for depositado, ele vai ficar oculto (assim o item não vai ser apagado e poderá ser gerado um relatório depois)
    this.itens.update((lista) =>
      lista
        .map((i) => (i === alvo && i.depositado ? { ...i, visivel: false } : i))
        .filter((i) => i !== alvo || i.depositado),
    );

    this.itemService.salvar(this.itens());
  }

  total() {
    // busca apenas os visiveis
    return this.itens()
      .filter((i) => i.visivel)
      .reduce((soma, i) => soma + i.quantidade, 0);
  }

  progresso() {
    const lista = this.itens().filter((i) => i.visivel);

    if (lista.length === 0) return 0;

    return lista.filter((i) => i.depositado).length / lista.length;
  }
}
