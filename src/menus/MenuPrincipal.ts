import promptSync from 'prompt-sync'; import { AutorController } from '../controllers/AutorController'; import { LivroController } from '../controllers/LivroController'; 
import { ClienteController } from '../controllers/ClienteController'; 
import { EmprestimoController } from '../controllers/EmprestimoController'; 
import { RelatorioController } from '../controllers/RelatorioController';
const prompt=promptSync();
export class MenuPrincipal {constructor(private autores=new AutorController(),private livros=new LivroController(),private clientes=new ClienteController(),private emprestimos=new EmprestimoController(),private relatorios=new RelatorioController()){} async iniciar(){while(true){console.log('\n==============================\n BOOKSTORE MANAGER CLI\n==============================\n1 - Autores\n2 - Livros\n3 - Clientes\n4 - Empréstimos\n5 - Relatórios\n0 - Sair');
    const op=prompt('Opção: ');
    if(op==='0'){console.log('Até logo!');
        return;
    }
    if(op==='1')await this.autores.menu();
    else if(op==='2')await this.livros.menu();
    else if(op==='3')await this.clientes.menu();
    else if(op==='4')await this.emprestimos.menu();
    else if(op==='5')await this.relatorios.menu();
    else console.log('Opção inválida.');
}}}
