declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    JWT_SECRET: string;
    REFRESH_SECRET: string;
    JWT_DURATION: string;
    REFRESH_DURATION: string;
    PORT: string;
  }
}
