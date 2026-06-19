import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { ArtigosService } from '../../../core/services/article';

@Component({
  selector: 'app-novo-artigo',
  imports: [ReactiveFormsModule, RouterLink, DecimalPipe],
  templateUrl: './novo-artigo.html',
  styleUrl: './novo-artigo.css',
})
export class NovoArtigo implements OnInit {

  private artigoService = inject(ArtigosService)
  selectedFile: File | null = null

  modoEdicao = signal(false);
  idEdicao = signal<string | null>(null);
  isSaving = signal(false);
  previewTitulo = signal('Seu título aparecerá aqui');
  previewTipo = signal('Tipo');
  charCount = signal(0);

  artForm = new FormGroup({
    titulo: new FormControl(),
    tipo: new FormControl(),
    fabricante: new FormControl(),
    especificacao_principal: new FormControl(),
    preco: new FormControl(),
    imagem_url: new FormControl(),
  });

  onFileSelected(event: Event): void{
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] ?? null
  }

  onSubmit(): void {
    const formData = new FormData();
    const values = this.artForm.value;
    Object.entries(values).forEach(([key, value])=>{
      formData.append(key, String(value))
    })

    if(this.selectedFile) {
      formData.append("imagem", this.selectedFile)
    }

    this.artigoService.create(formData).subscribe({
      next: () => {
        alert ("Criado com sucesso")
      },
      error: () => {
        alert ("Foi não")
      }
      
    })
  }

  ngOnInit(): void {
    

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

  isFieldInvalid(field: string): boolean {
    const control = this.artForm.get(field);
    return !!(control?.invalid && control?.touched);
  }
}
