import 'dotenv/config';

export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
}

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Variável de ambiente ${name} não configurada.`);
  }
  return value;
}

export const config: DatabaseConfig = {
  host: required("DB_HOST"),
  port: Number(process.env.DB_PORT) || 5432,
  database: required("DB_NAME"),
  user: required("DB_USER"),
  password: required("DB_PASSWORD"),
};

export default config;