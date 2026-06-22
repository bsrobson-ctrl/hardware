import { Component, inject, computed, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ArtigosService } from '../../../core/services/article';
import { AuthService } from '../../../core/services/auth';
import { CurrencyPipe, SlicePipe } from '@angular/common';
import { HardwareModel } from '../../../core/models/hardwareModel';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, RouterLinkActive, CurrencyPipe, SlicePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private readonly articleService = inject(ArtigosService);
  readonly authService = inject(AuthService);

  articles = signal <HardwareModel[]>([])
  isLoading = signal(true);

  ngOnInit(): void{
    this.loadArtigos()
  }

  private loadArtigos(): void {
    this.articleService.getAll().subscribe({
      next: (data) => {
        this.articles.set(data);
        this.isLoading.set(false);
      }
    })
  }

  deleteArtigo (id:any): void{
    if (!confirm("tem certeza que deseja excluir?")) {
      return
    }

    this.articleService.delete(id).subscribe({
      next: () => {
        alert("Item deletado com sucesso");
        this.loadArtigos()
      },
      error: (err) => {
        alert(err.error?.error || "Erro ao excluir item")
      }
    })
  }
  
}
