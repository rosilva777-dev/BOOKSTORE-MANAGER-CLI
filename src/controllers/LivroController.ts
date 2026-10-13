import promptSync from 'prompt-sync'; 
import { Livro } from '../models/Livro'; 
import { LivroService } from '../services/LivroService'; 
import { printError,requirePositiveInteger,requireText } from '../utils/validation';
const prompt=promptSync();
export class LivroController {constructor(private service=new LivroService()){} async menu(){while(true){console.log('\n--- LIVROS ---\n1 Cadastrar\n2 Listar\n3 Consultar\n4 Atualizar\n5 Remover\n0 Voltar');const op=prompt('Opção: ');
    try{if(op==='0')return;
        if(op==='1'){const l=await this.service.criar(new Livro(requireText(prompt('Título: '),'Título'),requireText(prompt('ISBN: '),'ISBN'),requirePositiveInteger(prompt('Ano: '),'Ano'),Number(prompt('Quantidade: ')),requirePositiveInteger(prompt('ID do autor: '),'Autor ID')));console.log(`Livro #${l.id} cadastrado.`);
    }
    else if(op==='2'){console.table(await this.service.listar());

    }
    else if(op==='3'){console.log(await this.service.buscarPorId(requirePositiveInteger(prompt('ID: '),'ID'))||'Livro não encontrado.');

    }else if(op==='4'){const id=requirePositiveInteger(prompt('ID: '),'ID');const l=await this.service.buscarPorId(id);
        if(!l){console.log('Livro não encontrado.');
            continue;
        }
        l.titulo=prompt(`Título [${l.titulo}]: `)||l.titulo;
        l.isbn=prompt(`ISBN [${l.isbn}]: `)||l.isbn;
        l.anoPublicacao=Number(prompt(`Ano [${l.anoPublicacao}]: `))||l.anoPublicacao;
        l.quantidade=Number(prompt(`Quantidade [${l.quantidade}]: `));
        if(Number.isNaN(l.quantidade))l.quantidade=0;
        l.autorId=Number(prompt(`Autor ID [${l.autorId}]: `))||l.autorId;console.log((await this.service.atualizar(l))?'Atualizado.':'Não encontrado.');
    }
    else if(op==='5'){console.log((await this.service.remover(requirePositiveInteger(prompt('ID: '),'ID')))?'Removido.':'Livro não encontrado.');
        
    }}catch(e){printError(e);}}}}
