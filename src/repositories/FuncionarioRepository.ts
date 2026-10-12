import { pool } from '../database/connection';
export interface Funcionario { id:number; 
  nome:string; 
  email:string; 
  senha:string; 
  ativo:boolean; 
}
export class FuncionarioRepository {
  async autenticar(email:string, senha:string):Promise<Funcionario|null>{const r=await pool.query('SELECT id,nome,email,senha,ativo FROM funcionarios WHERE LOWER(email)=LOWER($1) AND senha=$2 AND ativo=true',[email,senha]);
    return r.rows[0]??null;
  }
}
