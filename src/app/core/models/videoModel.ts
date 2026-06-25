// Interface que define a estrutura de um vídeo no sistema.
// Cada vídeo é um link do YouTube, não um arquivo de vídeo local.
export interface VideoModel {
  id: string;
  titulo: string;
  descricao: string;
  // URL completa do YouTube, ex: https://www.youtube.com/watch?v=abc123
  url: string;
  // Categoria para filtragem na página pública
  // categoria: string;
}
