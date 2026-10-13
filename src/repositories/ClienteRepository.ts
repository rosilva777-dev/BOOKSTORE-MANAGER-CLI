import { pool } from '../database/connection';
import { Cliente } from '../models/Cliente';

export class ClienteRepository {
  async criar(cliente: Cliente): Promise<Cliente> {
    const result = await pool.query('INSERT INTO clientes (nome,email,telefone) VALUES ($1,$2,$3) RETURNING *', [cliente.nome,cliente.email,cliente.telefone ?? null]);
    return this.map(result.rows[0]);
  }
  async listar(): Promise<Cliente[]> { const r=await pool.query('SELECT id,nome,email,telefone FROM clientes ORDER BY nome'); 
    return r.rows.map((x)=>this.map(x));
  }
  async buscarPorId(id:number):Promise<Cliente|null>{const r=await pool.query('SELECT id,nome,email,telefone FROM clientes WHERE id=$1',[id]);
    return r.rows[0]?this.map(r.rows[0]):null;
  }
  async atualizar(cliente:Cliente):Promise<boolean>{const r=await pool.query('UPDATE clientes SET nome=$1,email=$2,telefone=$3 WHERE id=$4',[cliente.nome,cliente.email,cliente.telefone??null,cliente.id]);
    return r.rowCount===1;
  }
  async remover(id:number):Promise<boolean>{const r=await pool.query('DELETE FROM clientes WHERE id=$1',[id]);
    return r.rowCount===1;
  }
  private map(row:any):Cliente{return new Cliente(row.nome,row.email,row.telefone??undefined,row.id);
    
  }
}
