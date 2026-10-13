import promptSync from 'prompt-sync'; 
import { AuthService } from '../services/AuthService';
const prompt=promptSync();
export class AuthController {constructor(private service=new AuthService()){} async login(){console.log('\n=== BOOKSTORE MANAGER CLI ===');
    console.log('LOGIN DE FUNCIONÁRIO\n');
    for(let tentativa=1;tentativa<=3;tentativa++){try{const email=prompt('E-mail: ');
        const senha=prompt('Senha: ',{echo:'*'});
        const f=await this.service.login(email,senha);
        console.log(`\nBem-vindo(a), ${f.nome}!\n`);
        return f;
    }
    catch(e){console.log(e instanceof Error?`\n${e.message}`:'\nErro de login.');
        if(tentativa<3)console.log('Tente novamente.');
    }}
    throw new Error('Número máximo de tentativas excedido.');}}
