import promptSync from 'prompt-sync'; import { Cliente } from '../models/Cliente'; 
import { ClienteService } from '../services/ClienteService'; 
import { printError,requireEmail,requirePositiveInteger,requireText } from '../utils/validation';
const prompt=promptSync();
export class ClienteController {constructor(private service=new ClienteService()){} async menu(){while(true){console.log('\n--- CLIENTES ---\n1 Cadastrar\n2 Listar\n3 Consultar\n4 Atualizar\n5 Remover\n0 Voltar');
    const op=prompt('Opção: ');
    try{if(op==='0')return;if(op==='1'){const c=await this.service.criar(new Cliente(requireText(prompt('Nome: '),'Nome'),requireEmail(prompt('E-mail: ')),prompt('Telefone: ').trim()||undefined));console.log(`Cliente #${c.id} cadastrado.`);
}
else if(op==='2'){console.table(await this.service.listar());

}
else if(op==='3'){console.log(await this.service.buscarPorId(requirePositiveInteger(prompt('ID: '),'ID'))||'Cliente não encontrado.');

}
else if(op==='4'){const id=requirePositiveInteger(prompt('ID: '),'ID');
    const c=await this.service.buscarPorId(id);
    if(!c){console.log('Cliente não encontrado.');
        continue;
    }c.nome=prompt(`Nome [${c.nome}]: `)||c.nome;c.email=requireEmail(prompt(`E-mail [${c.email}]: `)||c.email);
    c.telefone=prompt(`Telefone [${c.telefone??''}]: `)||c.telefone;console.log((await this.service.atualizar(c))?'Atualizado.':'Não encontrado.');
}
else if(op==='5'){console.log((await this.service.remover(requirePositiveInteger(prompt('ID: '),'ID')))?'Removido.':'Cliente não encontrado.');

}}
catch(e){printError(e);

}}}}
