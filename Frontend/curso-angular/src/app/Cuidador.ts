import { Caracteristicas } from "./Caracteristicas";

export interface Cuidador {
  id: number;
  nome: string;
  sobrenome: string;
  cpf: string;
  email: string;
  data_nascimento?: string | null;
  telefone: string;
  cep?: string;
  estado?: string;
  cidade?: string;
  rua: string;
  numero?: string;
  instagram?: string | null;
  caracteristicas_ids: number[];
  foto_perfil?: string;
  caracteristicas: Caracteristicas[]; // <-- array de objetos, não só IDs
  media_avaliacoes?: string;
  total_avaliacoes?: string;
  avaliacoes_recentes?: string;
}