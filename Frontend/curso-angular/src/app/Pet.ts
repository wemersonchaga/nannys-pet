export interface Pet {
  id?: number;
  nome: string;
  especie: string;
  raca: string;
  porte: 'pequeno' | 'medio' | 'grande';
  idade: number;
  castrado: boolean;
  genero: 'Macho' | 'Fêmea';
  observacoes?: string;
  foto?: File | null;
  tutor?: number;  // será preenchido automaticamente no backend com base no usuário logado
}
