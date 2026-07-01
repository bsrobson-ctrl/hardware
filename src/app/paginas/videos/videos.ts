import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { VideosService } from '../../core/services/video';
import { VideoModel } from '../../core/models/videoModel';
import { SvgYt } from "../../shared/svg-yt/svg-yt";

@Component({
  selector: 'app-videos',
  imports: [SvgYt],
  templateUrl: './videos.html',
  styleUrl: './videos.css',
})
export class Videos implements OnInit {

  private readonly videosService = inject(VideosService);

  todos = signal<VideoModel[]>([]);
  isLoading = signal(true);
  termoBusca = signal('');
  categoriaAtiva = signal('');

  // --- NOVAS VARIÁVEIS DE PAGINAÇÃO ---
  paginaAtual = signal<number>(1);
  itensPorPagina = 6;

  // 1. O computed de filtro por texto (já com a busca por descrição)
  videosFiltrados = computed(() => {
    const busca = this.termoBusca().toLowerCase();
    const listaDeVideos = this.todos();

    if (!busca) {
      return listaDeVideos;
    }

    return listaDeVideos.filter(video => 
      video.titulo.toLowerCase().includes(busca) || 
      video.descricao.toLowerCase().includes(busca)
    );
  });

  // 2. NOVO COMPUTED: Fatiar a lista para a página atual
  videosPaginados = computed(() => {
    const inicio = (this.paginaAtual() - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    
    return this.videosFiltrados().slice(inicio, fim);
  });

  // 3. NOVO COMPUTED: Calcular páginas para renderizar os botões
  paginasArray = computed(() => {
    const totalItens = this.videosFiltrados().length;
    const totalPaginas = Math.ceil(totalItens / this.itensPorPagina);
    
    return Array.from({ length: totalPaginas }, (_, i) => i + 1);
  });

  ngOnInit(): void {
    this.videosService.getAll().subscribe({
      next: (res) => {
        this.todos.set(res);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

  onBusca(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.termoBusca.set(input.value);
    this.paginaAtual.set(1); // Reseta a página para 1 sempre que pesquisar algo novo
  }

  definirCategoria(cat: string): void {
    this.categoriaAtiva.set(cat);
    this.paginaAtual.set(1); // Reseta a página
  }

  // --- NOVAS FUNÇÕES DA PAGINAÇÃO ---
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

  // Mantido: lógica da miniatura do YouTube
  getThumbnail(url: string): string {
    let id = '';
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('youtu.be')) {
        id = urlObj.pathname.slice(1);
      } else {
        id = urlObj.searchParams.get('v') || '';
      }
    } catch {
      return '';
    }
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  }
}