import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sobre.html',
  styleUrl: './sobre.css'
})
export class Sobre{
  // Dados da dupla: troque pelos nomes e usuários reais de vocês
  integrantes = [
    { nome: 'João Pedro S.', papel: 'Desenvolvedor', github: 'JooaPedroS' },
    { nome: 'Nome do(a) colega', papel: 'Desenvolvedor(a)', github: 'usuario-github' },
  ];

  repositorio = 'https://github.com/JooaPedroS/oat2_front';

  // Cada funcionalidade aponta para o requisito da atividade que ela atende
  funcionalidades = [
    { icone: '♻️', titulo: 'Lista de reciclagem', desc: 'Adicione, conclua e remova itens que precisam ser descartados.' },
    { icone: '💾', titulo: 'Dados salvos', desc: 'A lista continua lá mesmo depois de recarregar ou fechar o navegador.' },
    { icone: '🗺️', titulo: 'Mapa de coleta', desc: 'Mostra onde descartar cada tipo de material corretamente.' },
    { icone: '💧', titulo: 'Gastos', desc: 'Acompanhe o consumo de energia e água.' },
    { icone: '🎯', titulo: 'Metas', desc: 'Defina objetivos sustentáveis e acompanhe o progresso.' },
    { icone: '📊', titulo: 'Progresso', desc: 'Percentual de itens já depositados, atualizado em tempo real.' },
  ];

  tecnologias = ['Angular', 'TypeScript', 'Signals', 'Roteamento', 'localStorage', 'Bootstrap', 'CSS'];
}