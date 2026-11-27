export interface InfoCategoria {
  chave: string;
  nome: string;
  icone: string;
}

export const Categorias: InfoCategoria[] = [
  {
    chave: 'papel',
    nome: 'Papel',
    icone: '<i class="fa-regular fa-newspaper"></i>',
  },
  {
    chave: 'plastico',
    nome: 'Plástico',
    icone: '<i class="fa-solid fa-bottle-water"></i>',
  },
  {
    chave: 'vidro',
    nome: 'Vidro',
    icone: '<i class="fa-solid fa-wine-glass-empty"></i>',
  },
  {
    chave: 'metal',
    nome: 'Metal',
    icone: '<i class="fa-solid fa-industry"></i>',
  },
  {
    chave: 'madeira',
    nome: 'Madeira',
    icone: '<i class="fa-solid fa-tree"></i>',
  },
  {
    chave: 'eletronicos',
    nome: 'Eletrônicos',
    icone: '<i class="fa-solid fa-plug"></i>',
  },
  {
    chave: 'oleo',
    nome: 'Óleo',
    icone: '<i class="fa-solid fa-oil-can"></i>',
  },
];

const PADRAO: InfoCategoria = {
  chave: 'outros',
  nome: 'Outros',
  icone: '<i class="fa-solid fa-recycle"></i>',
};

// Tira acento e maiúscula para comparar Categorias sem erro
export function normalizar(texto: string): string {
  return (texto ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function infoCategoria(nome: string): InfoCategoria {
  const chave = normalizar(nome);
  return Categorias.find((c) => c.chave === chave) ?? PADRAO;
}
