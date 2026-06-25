import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ArtigosService } from '../../../core/services/article';
import { VideosService } from '../../../core/services/video';
import { AuthService } from '../../../core/services/auth';
import { SlicePipe } from '@angular/common';
import { HardwareModel } from '../../../core/models/hardwareModel';
import { VideoModel } from '../../../core/models/videoModel';

@Component({
  selector: 'app-dashboard',
  // SlicePipe: usado no template para truncar textos longos
  imports: [RouterLink, RouterLinkActive, SlicePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  private readonly articleService = inject(ArtigosService);
  // Injeta o serviço de vídeos para carregar e excluir vídeos no painel
  private readonly videosService = inject(VideosService);
  readonly authService = inject(AuthService);

  // Signals de produtos
  articles = signal<HardwareModel[]>([]);
  isLoading = signal(true);

  // Signals de vídeos
  videos = signal<VideoModel[]>([]);
  isLoadingVideos = signal(true);

  ngOnInit(): void {
    // Carrega os dois recursos em paralelo ao abrir o painel
    this.loadArtigos();
    this.loadVideos();
  }

  // ---- PRODUTOS ----

  private loadArtigos(): void {
    this.articleService.getAll().subscribe({
      next: (data) => {
        this.articles.set(data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  deleteArtigo(id: any): void {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    this.articleService.delete(id).subscribe({
      next: () => {
        alert('Produto excluído com sucesso.');
        this.loadArtigos();
      },
      error: (err) => alert(err.error?.error || 'Erro ao excluir produto'),
    });
  }

  // ---- VÍDEOS ----

  private loadVideos(): void {
    this.videosService.getAll().subscribe({
      next: (data) => {
        console.log(data);
        
        this.videos.set(data);
        this.isLoadingVideos.set(false);
      },
      error: () => this.isLoadingVideos.set(false),
    });
  }

  deleteVideo(id: any): void {
    if (!confirm('Tem certeza que deseja excluir este vídeo?')) return;

    this.videosService.delete(id).subscribe({
      next: () => {
        alert('Vídeo excluído com sucesso.');
        this.loadVideos();
      },
      error: (err) => alert(err.error?.error || 'Erro ao excluir vídeo'),
    });
  }
}
