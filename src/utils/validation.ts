export function requireText(value: string, field: string): string {
  const normalized = value.trim();
  if (!normalized) throw new Error(`${field} é obrigatório.`);
  return normalized;
}

export function requirePositiveInteger(value: string, field: string): number {
  const number = Number(value);
  if (!Number.isInteger(number) || number <= 0) throw new Error(`${field} deve ser um número inteiro positivo.`);
  return number;
}

export function requireEmail(value: string): string {
  const email = value.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('E-mail inválido.');
  return email;
}

export function printError(error: unknown): void {
  console.error(`\nErro: ${error instanceof Error ? error.message : 'Erro inesperado.'}\n`);
}
