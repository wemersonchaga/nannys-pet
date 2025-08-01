
export interface Cuidador {
  id: number;
  nome: string;
  sobrenome: string;
  cpf: string;
  email: string;
  data_nascimento?: string;
  telefone: string;
  cep?: string;
  estado?: string;
  cidade?: string;
  rua: string;
  numero?: string;
  instagram?: string;
  caracteristicas_ids: number[];
  foto_perfil?: string;
  caracteristicas?: any[]; // ou um tipo definido se você tiver
  media_avaliacoes?: string;
  total_avaliacoes?: string;
  avaliacoes_recentes?: string;


}
