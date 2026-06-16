import { Injectable, signal } from '@angular/core';
import { HardwareModel } from '../models/hardwareModel';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private readonly _articles = signal<HardwareModel[]>([
    {
      id: '1',
      titulo: 'NVIDIA GeForce RTX 4090',
      tipo: 'Placa de Vídeo',
      fabricante: 'NVIDIA',
      especificacao_principal: '24GB GDDR6X, 16384 CUDA Cores, 450W TDP — a GPU mais poderosa para consumidores.',
      preco: 9999,
      imagem_url: '',
    },
    {
      id: '2',
      titulo: 'AMD Ryzen 9 7950X',
      tipo: 'Processador',
      fabricante: 'AMD',
      especificacao_principal: '16 núcleos, 32 threads, 5.7GHz boost clock, TDP 170W.',
      preco: 3799,
      imagem_url: '',
    },
    {
      id: '3',
      titulo: 'Kingston Fury Beast DDR5',
      tipo: 'Memória RAM',
      fabricante: 'Kingston',
      especificacao_principal: '32GB DDR5-6000, latência CL36, suporte a Intel XMP 3.0 e AMD EXPO.',
      preco: 899,
      imagem_url: '',
    },
  ]);

  readonly articles = this._articles.asReadonly();

  getAll() {
    return this._articles();
  }

  add(article: Omit<HardwareModel, 'id'>): HardwareModel {
    const novo: HardwareModel = {
      ...article,
      id: Date.now().toString(),
    };
    this._articles.update((list) => [...list, novo]);
    return novo;
  }

  update(id: string, changes: Partial<Omit<HardwareModel, 'id'>>): void {
    this._articles.update((list) =>
      list.map((a) => (a.id === id ? { ...a, ...changes } : a))
    );
  }

  remove(id: string): void {
    this._articles.update((list) => list.filter((a) => a.id !== id));
  }

  getById(id: string): HardwareModel | undefined {
    return this._articles().find((a) => a.id === id);
  }
}
