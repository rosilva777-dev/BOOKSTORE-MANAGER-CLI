import { withTransaction } from '../database/connection'; 
import { Emprestimo } from '../models/Emprestimo'; 
import { ClienteRepository } from '../repositories/ClienteRepository'; 
import { LivroRepository } from '../repositories/LivroRepository'; 
import { EmprestimoRepository } from '../repositories/EmprestimoRepository';
export class EmprestimoService { constructor(private repo=new EmprestimoRepository(),private livroRepo=new LivroRepository(),private clienteRepo=new ClienteRepository()){}
 async criar(e:Emprestimo){const livro=await this.livroRepo.buscarPorId(e.livroId);
    if(!livro)throw new Error('Livro inexistente.');
    const cliente=await this.clienteRepo.buscarPorId(e.clienteId);
    if(!cliente)throw new Error('Cliente inexistente.');if(livro.quantidade<=0)throw new Error('Livro sem disponibilidade.');
    return withTransaction(async(client)=>{await this.livroRepo.diminuirQuantidade(e.livroId,client);return this.repo.criar(e,client);

    });
}
 async devolver(id:number){const emprestimo=await this.repo.buscarAtivoPorId(id);
    if(!emprestimo)throw new Error('Empréstimo inexistente ou já devolvido.');
    return withTransaction(async(client)=>{const ok=await this.repo.devolver(id,client);
        if(!ok)throw new Error('Não foi possível registrar a devolução.');await this.livroRepo.aumentarQuantidade(emprestimo.livroId,client);return true;
    });
}
 listar(){return this.repo.listar();
    
 }
}
