import promptSync from 'prompt-sync'; import { Emprestimo } from '../models/Emprestimo'; 
import { EmprestimoService } from '../services/EmprestimoService'; import { printError,requirePositiveInteger } from '../utils/validation';
const prompt=promptSync();
export class EmprestimoController {constructor(private service=new EmprestimoService()){} async menu(){while(true){console.log('\n--- EMPRÉSTIMOS ---\n1 Emprestar livro\n2 Devolver livro\n3 Listar empréstimos\n0 Voltar');
    const op=prompt('Opção: ');
    try{if(op==='0')return;
        if(op==='1'){const e=await this.service.criar(new Emprestimo(requirePositiveInteger(prompt('ID do livro: '),'Livro ID'),requirePositiveInteger(prompt('ID do cliente: '),'Cliente ID')));console.log(`Empréstimo #${e.id} registrado.`);
    }
    else if(op==='2'){console.log((await this.service.devolver(requirePositiveInteger(prompt('ID do empréstimo: '),'Empréstimo ID')))?'Devolução registrada.':'Não encontrado.');}else if(op==='3'){console.table(await this.service.listar());

    }}
    
    catch(e){printError(e);

    }}}}
