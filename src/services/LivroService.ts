import { Livro } from '../models/Livro'; 
import { AutorRepository } from '../repositories/AutorRepository'; 
import { LivroRepository } from '../repositories/LivroRepository';
export class LivroService { constructor(private repository=new LivroRepository(),private autorRepo=new AutorRepository()){} async criar(l:Livro){if(!(await this.autorRepo.buscarPorId(l.autorId)))throw new Error('Autor inexistente.');
    return this.repository.criar(l)} listar(){return this.repository.listarComAutores()} buscarPorId(id:number){return this.repository.buscarPorId(id)} async atualizar(l:Livro){if(!(await this.autorRepo.buscarPorId(l.autorId)))throw new Error('Autor inexistente.');return this.repository.atualizar(l)} remover(id:number){return this.repository.remover(id)} }
