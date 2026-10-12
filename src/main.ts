import { AuthController } from './controllers/AuthController'; 
import { testConnection,pool } from './database/connection'; 
import { MenuPrincipal } from './menus/MenuPrincipal';
async function main(){try{await testConnection();
    console.log('Banco de dados conectado com sucesso.');
    await new AuthController().login();
    await new MenuPrincipal().iniciar();
}
catch(error){console.error('\nNão foi possível iniciar a aplicação:',error instanceof Error?error.message:error);

}
finally{await pool.end();

}}

main();
