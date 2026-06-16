import { Component, inject, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ArticleService } from '../../../core/services/article';
import { AuthService } from '../../../core/services/auth';
import { CurrencyPipe, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, RouterLinkActive, CurrencyPipe, SlicePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private readonly articleService = inject(ArticleService);
  readonly authService = inject(AuthService);

  articles = computed(() => this.articleService.articles());

  totalArtigos = computed(() => this.articles().length);
  totalPublicados = computed(
    () => this.articles().filter((a) => a.tipo !== '').length
  );

  remover(id: string): void {
    if (confirm('Tem certeza que deseja excluir este item?')) {
      this.articleService.remove(id);
    }
  }
}
