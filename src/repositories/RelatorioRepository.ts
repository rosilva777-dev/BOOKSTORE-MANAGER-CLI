import { pool } from '../database/connection';
export class RelatorioRepository {
  async livrosDisponiveis():Promise<any[]>{const r=await pool.query('SELECT id,titulo,quantidade FROM livros WHERE quantidade>0 ORDER BY titulo');
    return r.rows;
  }
  async livrosEmprestados():Promise<any[]>{const r=await pool.query(`SELECT l.id,l.titulo,COUNT(e.id)::int AS emprestimos_ativos FROM livros l INNER JOIN emprestimos e ON e.livro_id=l.id AND e.data_devolucao IS NULL GROUP BY l.id,l.titulo ORDER BY emprestimos_ativos DESC,l.titulo`);
    return r.rows;
  }
  async livrosPorAutor():Promise<any[]>{const r=await pool.query(`SELECT a.nome AS autor,COUNT(l.id)::int AS quantidade_livros FROM autores a LEFT JOIN livros l ON l.autor_id=a.id GROUP BY a.id,a.nome ORDER BY quantidade_livros DESC,a.nome`);
    return r.rows;
  }
  async emprestimosPorLivro():Promise<any[]>{const r=await pool.query(`SELECT l.titulo,COUNT(e.id)::int AS quantidade_emprestimos FROM livros l LEFT JOIN emprestimos e ON e.livro_id=l.id GROUP BY l.id,l.titulo ORDER BY quantidade_emprestimos DESC,l.titulo`);
    return r.rows;
  }
  async clientesAtivos():Promise<any[]>{const r=await pool.query(`SELECT c.nome,c.email,COUNT(e.id)::int AS emprestimos_ativos FROM clientes c INNER JOIN emprestimos e ON e.cliente_id=c.id AND e.data_devolucao IS NULL GROUP BY c.id,c.nome,c.email ORDER BY c.nome`);
    return r.rows;
  }
}
