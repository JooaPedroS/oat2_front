import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemService, Item } from '../../services/item.service';
import { UserService } from '../../services/user.service';

// não sei exatamente aonde eu deveria por os componentes filho, resolvi colocar em pastas separadas
import { ItemForm } from '../../components/lixo/item-form/item-form';
import { ItemList } from '../../components/lixo/item-list/item-list';

import { TrashMap } from '../../components/trash-map/trash-map';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lixo',
  imports: [CommonModule, ItemForm, ItemList, TrashMap, RouterLink],
  styleUrl: './lixo.css',
  templateUrl: './lixo.html',
})
export class Lixo {
  /*
    basicamente esse componente faz a ponte entre o formulario, service e tabela
    ele recebe os dados do form, envia pro service que salva no localstorage e envia para a tabela

    os componentes-filho são apenas o form e a tabela. a lógica inteira fica no lixo e o service salva e busca
  */
  private itemService = inject(ItemService);
  hoje = new Date();

  itens = signal<Item[]>(this.itemService.buscarTodos());

  visiveis = computed(() => this.itens().filter((i) => i.visivel));

  total = computed(() => this.visiveis().reduce((soma, i) => soma + i.quantidade, 0));

  progresso = computed(() => {
    const lista = this.visiveis();
    return lista.length ? lista.filter((i) => i.depositado).length / lista.length : 0;
  });

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
}
