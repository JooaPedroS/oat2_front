import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemService, Item } from '../../services/item.service';
import { Categorias, infoCategoria } from '../../services/categorias.service';

import { ItemForm } from '../../components/lixo/item-form/item-form';
import { ItemList } from '../../components/lixo/item-list/item-list';

import { RouterLink } from '@angular/router';

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

  remover(alvo: Item) {
    // ele vai remover se o item não for depositado
    // se não for depositado, ele vai ficar oculto (assim o item não vai ser apagado e poderá ser gerado um relatório depois)
    this.itens.update((lista) =>
      lista
        .map((i) => (i === alvo && i.depositado ? { ...i, visivel: false } : i))
        .filter((i) => i !== alvo || i.depositado),
    );

    this.itemService.salvar(this.itens());
  }

  itensFiltrados = computed(() => {
    const f = this.filtro();
    return f === 'todos'
      ? this.itens()
      : this.itens().filter((i) => infoCategoria(i.categoria).chave === f);
  });

  // ---------- Impacto ambiental ----------
  // Usa this.itens() e não this.visiveis() de propósito: o item depositado que
  // foi "removido" só ficou oculto, e ele continua contando no impacto.
  impacto = computed(() => {
    let kg = 0, co2 = 0, papelKg = 0, agua = 0;

    for (const i of this.itens()) {
      if (!i.depositado) continue;
      const c = infoCategoria(i.categoria);
      const peso = i.quantidade * c.kgPorItem;
      kg += peso;
      co2 += peso * c.co2PorKg;
      if (c.chave === 'papel') papelKg += peso;
      if (c.chave === 'oleo') agua += i.quantidade * 25000; // 1 L de óleo ≈ 25 mil L de água
    }

    return { kg, co2, arvores: papelKg / 50, agua }; // ~50 kg de papel ≈ 1 árvore
  });

  // ---------- Meta semanal ----------
  // A semana começa na segunda-feira, à meia-noite
  private inicioDaSemana(): number {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
    return d.getTime();
  }

  feitosNaSemana = computed(() => {
    const inicio = this.inicioDaSemana();
    return this.itens().filter(
      (i) => i.depositado && i.depositadoEm && new Date(i.depositadoEm).getTime() >= inicio,
    ).length;
  });

  faltam = computed(() => Math.max(0, this.meta() - this.feitosNaSemana()));
  metaBatida = computed(() => this.feitosNaSemana() >= this.meta());
  progressoMeta = computed(() => Math.min(1, this.feitosNaSemana() / this.meta()));

  alterarMeta(delta: number) {
    const nova = Math.max(1, this.meta() + delta);
    this.meta.set(nova);
    this.itemService.salvarMeta(nova);
  }

  // ---------- Dica ----------
  // Com uma categoria filtrada, mostra a dica dela. Em "Todos", é a dica do dia.
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
