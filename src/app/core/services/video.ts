import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Serviço responsável por todas as operações de CRUD dos vídeos.
// Segue o mesmo padrão do ArtigosService (article.ts).
@Injectable({
  providedIn: 'root',
})
export class VideosService {
  private readonly http = inject(HttpClient);

  // URL base da API. Os vídeos ficam no endpoint /videos.
  private readonly apiUrl = 'https://api-senai-angular.vercel.app/api/hardware';

  // Retorna todos os vídeos cadastrados
  getAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}/videos`);
  }

  // Retorna um vídeo específico pelo ID
  getById(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/videos/${id}`);
  }

  // Cria um novo vídeo com os dados do formulário (objeto JSON simples)
  create(body: object): Observable<any> {
    return this.http.post(`${this.apiUrl}/videos`, body);
  }

  // Atualiza um vídeo existente pelo ID
  update(body: object, id: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/videos/${id}`, body);
  }

  // Remove um vídeo pelo ID
  delete(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/videos/${id}`);
  }
}
