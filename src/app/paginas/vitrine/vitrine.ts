import { Component, inject, computed, signal, OnInit } from '@angular/core';
import { ArtigosService } from '../../core/services/article';
import { HardwareModel } from '../../core/models/hardwareModel';
import { Artigo } from '../../shared/artigo/artigo';
import { SvgGpu } from '../../shared/svg-gpu/svg-gpu'; 

@Component({
  selector: 'app-vitrine',
  imports: [Artigo, SvgGpu],
  templateUrl: './vitrine.html',
  styleUrl: './vitrine.css',
})
export class Vitrine implements OnInit {
  
  private readonly artigoService = inject(ArtigosService);

  categorias = ['Todos', 'Placa de Vídeo', 'Processador', 'Memória RAM', 'Armazenamento', 'Placa Mãe', 'Fonte de Alimentação'];
  
  todosArtigos = signal<HardwareModel[]>([]);
  filtroAtual = signal<string>('Todos');
  termoBusca = signal<string>('');

  // --- NOVAS VARIÁVEIS DE PAGINAÇÃO ---
  paginaAtual = signal<number>(1);
  itensPorPagina = 6;

  // 1. O computed ORIGINAL que filtra tudo
  artigosFiltrados = computed(() => {
    const filtro = this.filtroAtual();
    const busca = this.termoBusca().toLowerCase(); 
    
    let artigos = this.todosArtigos();

    if (filtro !== 'Todos') {
      artigos = artigos.filter(item => item.tipo === filtro);
    }

    if (busca) {
      artigos = artigos.filter(item => item.titulo.toLowerCase().includes(busca));
    }

    return artigos;
  });

  // 2. NOVO COMPUTED: Fatiar a lista filtrada para mostrar só 6 itens
  artigosPaginados = computed(() => {
    const inicio = (this.paginaAtual() - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    
    // O slice recorta o array pegando apenas do índice 'inicio' até o 'fim'
    return this.artigosFiltrados().slice(inicio, fim);
  });

  // 3. NOVO COMPUTED: Calcular quantas páginas existem no total para criar os botões
  paginasArray = computed(() => {
    const totalItens = this.artigosFiltrados().length;
    const totalPaginas = Math.ceil(totalItens / this.itensPorPagina);
    
    // Cria um array de números [1, 2, 3...] com base no total de páginas
    return Array.from({ length: totalPaginas }, (_, i) => i + 1);
  });

  ngOnInit(): void {
    this.artigoService.getAll().subscribe((res) => {
      this.todosArtigos.set(res);
    });
  }

  setFiltro(novaCategoria: string) {
    this.filtroAtual.set(novaCategoria);
    this.paginaAtual.set(1); // Reseta a página para 1 sempre que mudar de categoria
  }

  atualizarBusca(event: Event) {
    const elementoInput = event.target as HTMLInputElement;
    this.termoBusca.set(elementoInput.value);
    this.paginaAtual.set(1); // Reseta a página para 1 sempre que pesquisar algo novo
  }

  // --- NOVAS FUNÇÕES PARA CLICAR NOS BOTÕES ---
  mudarPagina(pagina: number) {
    this.paginaAtual.set(pagina);
  }

  paginaAnterior() {
    if (this.paginaAtual() > 1) {
      this.paginaAtual.update(p => p - 1);
    }
  }

  proximaPagina() {
    if (this.paginaAtual() < this.paginasArray().length) {
      this.paginaAtual.update(p => p + 1);
    }
  }
}