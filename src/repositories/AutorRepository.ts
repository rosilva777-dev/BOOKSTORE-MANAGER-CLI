import { pool } from '../database/connection';
import { Autor } from '../models/Autor';

export class AutorRepository {
  async criar(autor: Autor): Promise<Autor> {
    const result = await pool.query('INSERT INTO autores (nome, nacionalidade) VALUES ($1, $2) RETURNING *', [autor.nome, autor.nacionalidade ?? null]);
    const row = result.rows[0];
    return new Autor(row.nome, row.nacionalidade ?? undefined, row.id);
  }

  async listar(): Promise<Autor[]> {
    const result = await pool.query('SELECT id, nome, nacionalidade FROM autores ORDER BY nome');
    return result.rows.map((row) => new Autor(row.nome, row.nacionalidade ?? undefined, row.id));
  }

  async buscarPorId(id: number): Promise<Autor | null> {
    const result = await pool.query('SELECT id, nome, nacionalidade FROM autores WHERE id = $1', [id]);
    if (!result.rows[0]) return null;
    const row = result.rows[0];
    return new Autor(row.nome, row.nacionalidade ?? undefined, row.id);
  }

  async atualizar(autor: Autor): Promise<boolean> {
    const result = await pool.query('UPDATE autores SET nome=$1, nacionalidade=$2 WHERE id=$3', [autor.nome, autor.nacionalidade ?? null, autor.id]);
    return result.rowCount === 1;
  }

  async remover(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM autores WHERE id=$1', [id]);
    return result.rowCount === 1;
  }
}
