import { Caracteristicas } from "./Caracteristicas";
// Tipagem para os portes aceitos
export type Porte = 'Pequeno' | 'Medio' | 'Grande';

export interface Cuidador {
  id: number;
  nome: string;
  sobrenome: string;
  cpf: string;
  email: string;
  data_nascimento?: string | null;
  descricao?: string | null;
  telefone: string;
  cep?: string | null;
  estado?: string | null;
  cidade?: string | null;
  rua: string;
  numero?: string;
  instagram?: string | null;
  foto_perfil?: string | null;
  caracteristicas_ids: number[];
  caracteristicas: Caracteristicas[]; // Objetos detalhados
  preco_diaria?: string | null;
  portes_aceitos?: Porte[]; // Agora com os valores fixos
  media_avaliacoes?: string;
  total_avaliacoes?: string;
  avaliacoes_recentes?: string;
}
