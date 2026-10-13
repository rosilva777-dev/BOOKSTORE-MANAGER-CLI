export interface ILivro {
  id?: number;
  titulo: string;
  isbn: string;
  anoPublicacao: number;
  quantidade: number;
  autorId: number;
}

export class Livro implements ILivro {
  constructor(
    public titulo: string,
    public isbn: string,
    public anoPublicacao: number,
    public quantidade: number,
    public autorId: number,
    public id?: number,
  ) {}
}
