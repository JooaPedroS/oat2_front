export interface InfoCategoria {
  chave: string;
  nome: string;
  icone: string;
  cor: string; 
  fundo: string; 
  kgPorItem: number; 
  co2PorKg: number; 
}

// Cores baseadas no padrão da coleta seletiva. Os números de impacto são
// médias aproximadas, ajustem se acharem fontes melhores.
export const Categorias: InfoCategoria[] = [
  {
    chave: 'papel',
    nome: 'Papel',
    icone: '<i class="fa-regular fa-newspaper"></i>',
    cor: '#1d6fb8',
    fundo: '#dbeafe',
    kgPorItem: 0.1,
    co2PorKg: 1.0,
  },
  {
    chave: 'plastico',
    nome: 'Plástico',
    icone: '<i class="fa-solid fa-bottle-water"></i>',
    cor: '#c0392b',
    fundo: '#fde2e0',
    kgPorItem: 0.03,
    co2PorKg: 1.5,
  },
  {
    chave: 'vidro',
    nome: 'Vidro',
    icone: '<i class="fa-solid fa-wine-glass-empty"></i>',
    cor: '#1e8449',
    fundo: '#d8f3dc',
    kgPorItem: 0.3,
    co2PorKg: 0.3,
  },
  {
    chave: 'metal',
    nome: 'Metal',
    icone: '<i class="fa-solid fa-industry"></i>',
    cor: '#9a7b00',
    fundo: '#fdf1b8',
    kgPorItem: 0.05,
    co2PorKg: 3.0,
  },
  {
    chave: 'madeira',
    nome: 'Madeira',
    icone: '<i class="fa-solid fa-tree"></i>',
    cor: '#212529',
    fundo: '#e2e4e6',
    kgPorItem: 0.5,
    co2PorKg: 0.5,
  },
  {
    chave: 'eletronicos',
    nome: 'Eletrônicos',
    icone: '<i class="fa-solid fa-plug"></i>',
    cor: '#c2620a',
    fundo: '#ffe8d1',
    kgPorItem: 0.5,
    co2PorKg: 2.0,
  },
  {
    chave: 'oleo',
    nome: 'Óleo',
    icone: '<i class="fa-solid fa-oil-can"></i>',
    cor: '#7a4a21',
    fundo: '#f1e3d3',
    kgPorItem: 0.9,
    co2PorKg: 2.5,
  },
];

const PADRAO: InfoCategoria = {
  chave: 'outros',
  nome: 'Outros',
  icone: '<i class="fa-solid fa-recycle"></i>',
  cor: '#4b5d54',
  fundo: '#e9efec',
  kgPorItem: 0.1,
  co2PorKg: 1,
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
