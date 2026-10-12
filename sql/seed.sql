\c bookstore_manager;

INSERT INTO funcionarios (nome, email, senha)
VALUES ('Administrador', 'admin@bookstore.com', 'admin123')
ON CONFLICT (email) DO NOTHING;

INSERT INTO autores (nome, nacionalidade)
VALUES ('Machado de Assis', 'Brasileira')
ON CONFLICT DO NOTHING;
