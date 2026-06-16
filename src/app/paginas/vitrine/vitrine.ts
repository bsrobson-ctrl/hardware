import { Component, inject, computed } from '@angular/core';
import { ArticleService } from '../../core/services/article';
import { Artigo } from "../../shared/artigo/artigo";

@Component({
  selector: 'app-vitrine',
  imports: [Artigo],
  templateUrl: './vitrine.html',
  styleUrl: './vitrine.css',
})
export class Vitrine {
  private readonly articleService = inject(ArticleService);
  artigos = computed(() => this.articleService.articles());
}
