
export interface Cuidador {
  nome: string;
  sobrenome: string;
  data_nascimento: string;
  cpf: string;
  email: string;
  telefone: string;
  cep: string;
  numero: string | number;
  instagram: string;
  foto_perfil?: File | string;
  caracteristicas_ids: number[];
}
