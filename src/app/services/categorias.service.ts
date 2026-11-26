export interface InfoCategoria {
  chave: string;
  nome: string;
  icone: string;
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
    kgPorItem: 0.1,
    co2PorKg: 1.0,
  },
  {
    chave: 'plastico',
    nome: 'Plástico',
    icone: '<i class="fa-solid fa-bottle-water"></i>',
    kgPorItem: 0.03,
    co2PorKg: 1.5,
  },
  {
    chave: 'vidro',
    nome: 'Vidro',
    icone: '<i class="fa-solid fa-wine-glass-empty"></i>',
    kgPorItem: 0.3,
    co2PorKg: 0.3,
  },
  {
    chave: 'metal',
    nome: 'Metal',
    icone: '<i class="fa-solid fa-industry"></i>',
    kgPorItem: 0.05,
    co2PorKg: 3.0,
  },
  {
    chave: 'madeira',
    nome: 'Madeira',
    icone: '<i class="fa-solid fa-tree"></i>',
    kgPorItem: 0.5,
    co2PorKg: 0.5,
  },
  {
    chave: 'eletronicos',
    nome: 'Eletrônicos',
    icone: '<i class="fa-solid fa-plug"></i>',
    kgPorItem: 0.5,
    co2PorKg: 2.0,
  },
  {
    chave: 'oleo',
    nome: 'Óleo',
    icone: '<i class="fa-solid fa-oil-can"></i>',
    kgPorItem: 0.9,
    co2PorKg: 2.5,
  },
];

const PADRAO: InfoCategoria = {
  chave: 'outros',
  nome: 'Outros',
  icone: '<i class="fa-solid fa-recycle"></i>',
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
