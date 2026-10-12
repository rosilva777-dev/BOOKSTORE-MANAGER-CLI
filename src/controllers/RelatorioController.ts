import promptSync from 'prompt-sync'; import { RelatorioService } from '../services/RelatorioService'; import { printError } from '../utils/validation';
const prompt=promptSync();
export class RelatorioController {constructor(private service=new RelatorioService()){} async menu(){while(true){console.log('\n--- RELATÓRIOS ---\n1 Livros disponíveis\n2 Livros emprestados\n3 Livros por autor\n4 Empréstimos por livro\n5 Clientes com empréstimos ativos\n0 Voltar');
    const op=prompt('Opção: ');
    try{if(op==='0')return;
        if(op==='1')console.table(await this.service.livrosDisponiveis());
        else if(op==='2')console.table(await this.service.livrosEmprestados());
        else if(op==='3')console.table(await this.service.livrosPorAutor());
        else if(op==='4')console.table(await this.service.emprestimosPorLivro());
        else if(op==='5')console.table(await this.service.clientesAtivos());
    }
    catch(e){printError(e);

    }}}}
