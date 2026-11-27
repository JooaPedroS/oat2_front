import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemService, Item } from '../../services/item.service';
import { Categorias, infoCategoria } from '../../services/categorias.service';

import { ItemForm } from '../../components/lixo/item-form/item-form';
import { ItemList } from '../../components/lixo/item-list/item-list';

import { RouterLink } from '@angular/router';
import { AvisoService } from '../../services/aviso.service';

@Component({
  selector: 'app-lixo',
  imports: [CommonModule, ItemForm, ItemList, RouterLink],
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
  private avisos = inject(AvisoService)
  hoje = new Date();
  categorias = Categorias;

  itens = signal<Item[]>(this.itemService.buscarTodos());
  filtro = signal('todos');
  meta = signal(this.itemService.buscarMeta());

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
      lista.map((i) =>
        i === alvo
          ? {
              ...i,
              depositado: !i.depositado,
              depositadoEm: !i.depositado ? new Date().toISOString() : undefined,
            }
          : i,
      ),
    );

    this.itemService.salvar(this.itens());
  }

  async remover(alvo: Item) {
    if (!(await this.avisos.confirmar('Remover este item?', alvo.nome))) return;

    this.itens.update((lista) =>
      lista
        .map((i) => (i === alvo && i.depositado ? { ...i, visivel: false } : i))
        .filter((i) => i !== alvo || i.depositado),
    );
    this.itemService.salvar(this.itens());

    this.avisos.sucesso('Registro removido com sucesso');
  }

  itensFiltrados = computed(() => {
    const f = this.filtro();
    return f === 'todos'
      ? this.itens()
      : this.itens().filter((i) => infoCategoria(i.categoria).chave === f);
  });

  dica = computed(() => {
    const f = this.filtro();
    if (f !== 'todos') {
      const c = infoCategoria(f);
      return { titulo: `${c.icone} Dica de ${c.nome}` };
    }
    const inicioAno = new Date(this.hoje.getFullYear(), 0, 0).getTime();
    const diaDoAno = Math.floor((this.hoje.getTime() - inicioAno) / 86400000);
    const c = Categorias[diaDoAno % Categorias.length];
    return { texto: `${c.icone} ${c.nome}` };
  });

  // ---------- Gráfico por categoria ----------
  grafico = computed(() => {
    const linhas = Categorias.map((c) => ({
      ...c,
      qtd: this.visiveis()
        .filter((i) => infoCategoria(i.categoria).chave === c.chave)
        .reduce((s, i) => s + i.quantidade, 0),
    })).filter((l) => l.qtd > 0);

    const maior = Math.max(1, ...linhas.map((l) => l.qtd));
    return linhas.map((l) => ({ ...l, pct: (l.qtd / maior) * 100 }));
  });
}
