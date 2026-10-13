import { FuncionarioRepository, Funcionario } from '../repositories/FuncionarioRepository';
export class AuthService { constructor(private repository=new FuncionarioRepository()){} async login(email:string,senha:string):Promise<Funcionario>{const f=await this.repository.autenticar(email,senha);if(!f)throw new Error('E-mail ou senha inválidos.');
    return f;
} }
