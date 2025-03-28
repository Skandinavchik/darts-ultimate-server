declare namespace NodeJS {
  interface ProcessEnv {
    HOST: string;
    PORT: string;
    DATABASE_URL: string
    JWT_SECRET: string
    JWT_EXPIRES_IN: string
    JWT_REFRESH_SECRET: string
    JWT_REFRESH_EXPIRES_IN: string
  }
}
