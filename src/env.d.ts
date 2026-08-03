/// <reference types="vite/client" />

declare module '*.css';
declare module '*.scss';

declare global {
  interface ImportMetaEnv {
    readonly VITE_API_URL?: string;
    readonly VITE_SWAGGER_URL?: string;
  }
}
