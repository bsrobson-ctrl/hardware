import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { VideosService } from '../../core/services/video';
import { VideoModel } from '../../core/models/videoModel';

@Component({
  selector: 'app-videos',
  imports: [],
  templateUrl: './videos.html',
  styleUrl: './videos.css',
})
export class Videos implements OnInit {

  // Injeta o serviço de vídeos para buscar dados da API
  private readonly videosService = inject(VideosService);

  // Signal que armazena todos os vídeos retornados pela API
  todos = signal<VideoModel[]>([]);

  // Signal para controlar o estado de carregamento (exibe spinner)
  isLoading = signal(true);

  // Signal para o termo de busca digitado pelo usuário
  termoBusca = signal('');

  // Signal para a categoria de filtro ativa ('': exibe todos)
  categoriaAtiva = signal('');

  // Lista estática de categorias disponíveis para os botões de filtro
  categorias = ['Benchmark', 'Tutorial', 'Review', 'Notícia', 'Setup', 'Dicas'];

  // computed() recalcula automaticamente sempre que termoBusca ou categoriaAtiva mudam.
  // Combina os dois filtros: busca por texto + filtro por categoria.
  videosFiltrados = computed(() => {
    const termo = this.termoBusca().toLowerCase().trim();
    const cat = this.categoriaAtiva();

    return this.todos().filter(v => {
      // Verifica se o título contém o termo digitado (case-insensitive)
      const bateuBusca = !termo || v.titulo.toLowerCase().includes(termo);
      // Verifica se a categoria bate com o filtro ativo ('' = todos)
      const bateuCategoria = !cat || v.categoria === cat;
      return bateuBusca && bateuCategoria;
    });
  });

  ngOnInit(): void {
    // Carrega os vídeos da API quando o componente é inicializado
    this.videosService.getAll().subscribe({
      next: (res) => {
        this.todos.set(res);
        this.isLoading.set(false);
      },
      error: () => {
        // Em caso de erro, apenas encerra o carregamento
        this.isLoading.set(false);
      }
    });
  }

  // Atualiza o signal de busca a partir do evento de input do campo de texto
  onBusca(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.termoBusca.set(input.value);
  }

  // Define a categoria ativa; chamar com '' remove o filtro
  definirCategoria(cat: string): void {
    this.categoriaAtiva.set(cat);
  }

  // Extrai o ID do vídeo de uma URL do YouTube e retorna a URL da thumbnail.
  // Suporta os formatos: watch?v=ID e youtu.be/ID
  getThumbnail(url: string): string {
    let id = '';

    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('youtu.be')) {
        // Formato curto: https://youtu.be/VIDEO_ID
        id = urlObj.pathname.slice(1);
      } else {
        // Formato padrão: https://www.youtube.com/watch?v=VIDEO_ID
        id = urlObj.searchParams.get('v') || '';
      }
    } catch {
      // URL inválida: retorna string vazia
      return '';
    }

    // hqdefault = thumbnail de alta qualidade (480x360)
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  }
}
