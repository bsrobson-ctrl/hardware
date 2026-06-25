import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { VideosService } from '../../../core/services/video';

@Component({
  selector: 'app-novo-video',
  // ReactiveFormsModule: habilita formulários reativos (formGroup, formControlName)
  // RouterLink: habilita routerLink no template
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './novo-video.html',
  // Reutiliza o CSS do novo-artigo para manter a identidade visual
  styleUrl: '../novo-artigo/novo-artigo.css',
})
export class NovoVideo implements OnInit {

  private readonly videosService = inject(VideosService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  // ID do vídeo sendo editado; null quando é um novo vídeo
  id: string | null = null;

  // Controla o texto do botão e o comportamento do onSubmit()
  modoEdicao = signal(false);

  // Bloqueia o botão enquanto a requisição está em andamento
  isSaving = signal(false);

  // Signals para o preview ao vivo (coluna lateral)
  previewTitulo = signal('Título do vídeo aparecerá aqui');
  // previewCategoria = signal('Categoria');

  // Contador de caracteres para a descrição (limite: 500)
  charCount = signal(0);

  // Definição do formulário reativo com validações básicas
  videoForm = new FormGroup({
    titulo:      new FormControl('', [Validators.required, Validators.minLength(3)]),
    url: new FormControl('', [Validators.required]),
    descricao:   new FormControl('', [Validators.required]),
  });

  // computed() gera a URL da thumbnail automaticamente.
  // Recalcula sempre que o campo youtube_url do formulário muda.
  thumbnailPreview = computed(() => {
    const url = this.videoForm.get('url')?.value || '';
    return this.extrairThumbnail(url);
  });

  ngOnInit(): void {
    // Lê o parâmetro :id da rota para saber se é edição ou criação
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      // Modo edição: marca o sinal e carrega os dados do vídeo
      this.modoEdicao.set(true);
      this.videosService.getById(this.id).subscribe({
        next: (res) => {
          // Preenche o formulário com os dados vindos da API
          this.videoForm.patchValue({
            titulo:      res.titulo,
            // categoria:   res.categoria,
            url: res.url,
            descricao:   res.descricao,
          });
        },
      });
    }

    // Observa mudanças no título para atualizar o preview ao vivo
    this.videoForm.get('titulo')!.valueChanges.subscribe(val => {
      this.previewTitulo.set(val || 'Título do vídeo aparecerá aqui');
    });

    // // Observa mudanças na categoria para atualizar o badge do preview
    // this.videoForm.get('categoria')!.valueChanges.subscribe(val => {
    //   this.previewCategoria.set(val || 'Categoria');
    // });

    // Observa mudanças na descrição para o contador de caracteres
    this.videoForm.get('descricao')!.valueChanges.subscribe(val => {
      this.charCount.set(val?.length ?? 0);
    });
  }

  // Extrai a thumbnail do YouTube a partir da URL.
  // É chamado dentro do computed() para o preview.
  private extrairThumbnail(url: string): string {
    if (!url) return '';
    try {
      const urlObj = new URL(url);
      let id = '';
      if (urlObj.hostname.includes('youtu.be')) {
        id = urlObj.pathname.slice(1);
      } else {
        id = urlObj.searchParams.get('v') || '';
      }
      return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : '';
    } catch {
      return ''; // URL ainda inválida enquanto o usuário digita
    }
  }

  onSubmit(): void {
    // Marca todos os campos como tocados para exibir as mensagens de erro
    this.videoForm.markAllAsTouched();
    if (this.videoForm.invalid) return;

    this.isSaving.set(true);

    // Monta o objeto que será enviado como JSON para a API
    const body = {
      titulo:      this.videoForm.value.titulo,
      // categoria:   this.videoForm.value.categoria,
      url: this.videoForm.value.url,
      descricao:   this.videoForm.value.descricao,
    };

    if (this.id) {
      // Modo edição: chama o método update do service
      this.videosService.update(body, this.id).subscribe({
        next: () => {
          alert('Vídeo atualizado com sucesso!');
          this.router.navigate(['/admin']);
        },
        error: () => {
          alert('Erro ao atualizar o vídeo.');
          this.isSaving.set(false);
        },
      });
    } else {
      console.log(body);
      
      // Modo criação: chama o método create do service
      this.videosService.create(body).subscribe({
        next: () => {
          alert('Vídeo publicado com sucesso!');
          this.router.navigate(['/admin']);
        },
        error: () => {
          alert('Erro ao publicar o vídeo.');
          this.isSaving.set(false);
        },
      });
    }
  }

  // Verifica se o campo é inválido E foi tocado pelo usuário
  isFieldInvalid(field: string): boolean {
    const control = this.videoForm.get(field);
    return !!(control?.invalid && control?.touched);
  }
}
