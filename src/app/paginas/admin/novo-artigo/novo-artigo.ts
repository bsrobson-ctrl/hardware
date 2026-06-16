import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ArticleService } from '../../../core/services/article';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-novo-artigo',
  imports: [ReactiveFormsModule, RouterLink, DecimalPipe],
  templateUrl: './novo-artigo.html',
  styleUrl: './novo-artigo.css',
})
export class NovoArtigo implements OnInit {
  private readonly articleService = inject(ArticleService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  modoEdicao = signal(false);
  idEdicao = signal<string | null>(null);
  isSaving = signal(false);
  previewTitulo = signal('Seu título aparecerá aqui');
  previewTipo = signal('Tipo');
  charCount = signal(0);

  artForm = new FormGroup({
    titulo: new FormControl('', [Validators.required, Validators.minLength(3)]),
    tipo: new FormControl('', Validators.required),
    fabricante: new FormControl('', Validators.required),
    especificacao_principal: new FormControl('', [Validators.required, Validators.maxLength(5000)]),
    preco: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    imagem_url: new FormControl(''),
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const artigo = this.articleService.getById(id);
      if (artigo) {
        this.modoEdicao.set(true);
        this.idEdicao.set(id);
        this.artForm.patchValue({
          titulo: artigo.titulo,
          tipo: artigo.tipo,
          fabricante: artigo.fabricante,
          especificacao_principal: artigo.especificacao_principal,
          preco: artigo.preco,
          imagem_url: artigo.imagem_url,
        });
        this.previewTitulo.set(artigo.titulo);
        this.previewTipo.set(artigo.tipo);
        this.charCount.set(artigo.especificacao_principal.length);
      }
    }

    // Live preview
    this.artForm.get('titulo')!.valueChanges.subscribe((val) => {
      this.previewTitulo.set(val || 'Seu título aparecerá aqui');
    });

    this.artForm.get('tipo')!.valueChanges.subscribe((val) => {
      this.previewTipo.set(val || 'Tipo');
    });

    this.artForm.get('especificacao_principal')!.valueChanges.subscribe((val) => {
      this.charCount.set(val?.length ?? 0);
    });
  }

  onSubmit(): void {
    if (this.artForm.invalid) {
      this.artForm.markAllAsTouched();
      return;
    }

    this.isSaving.set(true);

    const { titulo, tipo, fabricante, especificacao_principal, preco, imagem_url } =
      this.artForm.getRawValue();

    if (this.modoEdicao() && this.idEdicao()) {
      this.articleService.update(this.idEdicao()!, {
        titulo: titulo!,
        tipo: tipo!,
        fabricante: fabricante!,
        especificacao_principal: especificacao_principal!,
        preco: preco!,
        imagem_url: imagem_url || '',
      });
    } else {
      this.articleService.add({
        titulo: titulo!,
        tipo: tipo!,
        fabricante: fabricante!,
        especificacao_principal: especificacao_principal!,
        preco: preco!,
        imagem_url: imagem_url || '',
      });
    }

    setTimeout(() => {
      this.isSaving.set(false);
      this.router.navigate(['/admin']);
    }, 600);
  }

  isFieldInvalid(field: string): boolean {
    const control = this.artForm.get(field);
    return !!(control?.invalid && control?.touched);
  }
}
