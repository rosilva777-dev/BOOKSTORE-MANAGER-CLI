# BookStore Manager CLI

Sistema de gerenciamento de uma pequena livraria executado pelo terminal, desenvolvido com Node.js, TypeScript e PostgreSQL.

## Requisitos
- Node.js 20+
- PostgreSQL 14+
- Git

## Instalação
```bash
npm install
copy .env
```
No Linux/macOS, use `cp .env`.

Configure o `.env` com os dados do PostgreSQL.

## Banco de dados
Execute `sql/schema.sql` no PostgreSQL e depois `sql/seed.sql`.

Login inicial:
- E-mail: `admin@bookstore.com`
- Senha: `admin123`

> Em produção, as senhas devem ser armazenadas com hash. O seed simples foi mantido para atender ao requisito acadêmico de cadastro prévio via seed.

## Execução
```bash
npm run dev
```
Para compilar e executar:
```bash
npm run build
npm start
```

## Funcionalidades
- Login de funcionário.
- CRUD de autores.
- CRUD de livros vinculados a autores.
- CRUD de clientes.
- Empréstimo com validação de livro, cliente e disponibilidade.
- Devolução com atualização da quantidade disponível.
- Consulta de empréstimos.
- Relatórios com INNER JOIN, LEFT JOIN, GROUP BY, ORDER BY e COUNT.
- Tratamento de erros e operações assíncronas.
- Transações PostgreSQL em empréstimo/devolução.

## Arquitetura
`main -> menus/controllers -> services -> repositories -> PostgreSQL`

- `controllers`: interação com terminal.
- `services`: regras de negócio.
- `repositories`: SQL e acesso ao banco.
- `models`: classes e interfaces.
- `database`: conexão e transações.
- `config`: configuração por variáveis de ambiente.
- `utils`: validações e tratamento auxiliar.
- `menus`: navegação da aplicação.

## Estrutura
```text
src/
├── config/
├── controllers/
├── database/
├── menus/
├── models/
├── repositories/
├── services/
├── utils/
└── main.ts
sql/
├── schema.sql
└── seed.sql
```

## Qualidade
```bash
npm run lint
npm run format
npm run format:check
```



