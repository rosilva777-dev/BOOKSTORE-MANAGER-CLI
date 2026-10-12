import promptSync from 'prompt-sync'; import { Autor } from '../models/Autor'; import { AutorService } from '../services/AutorService'; import { printError,requirePositiveInteger,requireText } from '../utils/validation';
const prompt=promptSync();
export class AutorController {constructor(private service=new AutorService()){} async menu(){while(true){console.log('\n--- AUTORES ---\n1 Cadastrar\n2 Listar\n3 Consultar\n4 Atualizar\n5 Remover\n0 Voltar');const op=prompt('Opção: ');
    try{if(op==='0')return;if(op==='1'){const a=await this.service.criar(new Autor(requireText(prompt('Nome: '),'Nome'),prompt('Nacionalidade: ').trim()||undefined));
        console.log(`Autor #${a.id} cadastrado.`);
    }
    else if(op==='2'){console.table(await this.service.listar());

    }
    else if(op==='3'){console.log(await this.service.buscarPorId(requirePositiveInteger(prompt('ID: '),'ID'))||'Autor não encontrado.');

    }
    else if(op==='4'){const id=requirePositiveInteger(prompt('ID: '),'ID');const a=await this.service.buscarPorId(id);
        if(!a){console.log('Autor não encontrado.');
            continue;
        }
        a.nome=requireText(prompt(`Nome [${a.nome}]: `)||a.nome,'Nome');
        a.nacionalidade=prompt(`Nacionalidade [${a.nacionalidade??''}]: `)||a.nacionalidade;console.log((await this.service.atualizar(a))?'Atualizado.':'Não encontrado.');
    }
    else if(op==='5'){console.log((await this.service.remover(requirePositiveInteger(prompt('ID: '),'ID')))?'Removido.':'Autor não encontrado.');

    }}
    catch(e){printError(e);
        
    }}}}
