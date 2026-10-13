import { pool } from '../database/connection';
import { Emprestimo } from '../models/Emprestimo';

export class EmprestimoRepository {
  async criar(emprestimo: Emprestimo, client:any): Promise<Emprestimo> {
    const r=await client.query('INSERT INTO emprestimos (livro_id,cliente_id) VALUES ($1,$2) RETURNING *',[emprestimo.livroId,emprestimo.clienteId]);
    const x=r.rows[0]; 
    return new Emprestimo(x.livro_id,x.cliente_id,x.data_emprestimo,x.data_devolucao,x.id);
  }
  async buscarAtivoPorId(id:number, client:any=pool):Promise<Emprestimo|null>{const r=await client.query('SELECT id,livro_id,cliente_id,data_emprestimo,data_devolucao FROM emprestimos WHERE id=$1 AND data_devolucao IS NULL',[id]);
    const x=r.rows[0];
    return x?new Emprestimo(x.livro_id,x.cliente_id,x.data_emprestimo,x.data_devolucao,x.id):null;
  }
  async devolver(id:number, client:any):Promise<boolean>{const r=await client.query('UPDATE emprestimos SET data_devolucao=CURRENT_TIMESTAMP WHERE id=$1 AND data_devolucao IS NULL',[id]);
    return r.rowCount===1;
  }
  async listar():Promise<any[]>{const r=await pool.query(`SELECT e.id,l.titulo AS livro,c.nome AS cliente,e.data_emprestimo,e.data_devolucao FROM emprestimos e INNER JOIN livros l ON l.id=e.livro_id INNER JOIN clientes c ON c.id=e.cliente_id ORDER BY e.data_emprestimo DESC`);
    return r.rows;
  }
}
