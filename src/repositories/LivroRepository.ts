import { PoolClient } from 'pg';
import { pool } from '../database/connection';
import { Livro } from '../models/Livro';

export class LivroRepository {
  async criar(livro: Livro): Promise<Livro> {
    const result = await pool.query('INSERT INTO livros (titulo,isbn,ano_publicacao,quantidade,autor_id) VALUES ($1,$2,$3,$4,$5) RETURNING *', [livro.titulo, livro.isbn, livro.anoPublicacao, livro.quantidade, livro.autorId]);
    return this.map(result.rows[0]);
  }
  async listar(): Promise<Livro[]> {
    const result = await pool.query('SELECT id,titulo,isbn,ano_publicacao,quantidade,autor_id FROM livros ORDER BY titulo');
    return result.rows.map((row) => this.map(row));
  }
  async buscarPorId(id: number): Promise<Livro | null> {
    const result = await pool.query('SELECT id,titulo,isbn,ano_publicacao,quantidade,autor_id FROM livros WHERE id=$1', [id]);
    return result.rows[0] ? this.map(result.rows[0]) : null;
  }
  async atualizar(livro: Livro): Promise<boolean> {
    const result = await pool.query('UPDATE livros SET titulo=$1,isbn=$2,ano_publicacao=$3,quantidade=$4,autor_id=$5 WHERE id=$6', [livro.titulo, livro.isbn, livro.anoPublicacao, livro.quantidade, livro.autorId, livro.id]);
    return result.rowCount === 1;
  }
  async remover(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM livros WHERE id=$1', [id]);
    return result.rowCount === 1;
  }
  async listarComAutores(): Promise<any[]> {
    const result = await pool.query('SELECT l.id,l.titulo,l.isbn,l.ano_publicacao,l.quantidade,a.nome AS autor FROM livros l INNER JOIN autores a ON a.id=l.autor_id ORDER BY l.titulo');
    return result.rows;
  }
  async diminuirQuantidade(id: number, client: PoolClient): Promise<void> {
    const result = await client.query('UPDATE livros SET quantidade=quantidade-1 WHERE id=$1 AND quantidade>0', [id]);
    if (result.rowCount !== 1) throw new Error('Livro sem disponibilidade.');
  }
  async aumentarQuantidade(id: number, client: PoolClient): Promise<void> {
    await client.query('UPDATE livros SET quantidade=quantidade+1 WHERE id=$1', [id]);
  }
  private map(row: any): Livro { return new Livro(row.titulo,row.isbn,row.ano_publicacao,row.quantidade,row.autor_id,row.id); 
    
  }
}
