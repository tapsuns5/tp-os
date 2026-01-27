/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly GEMINI_API_KEY: string
  readonly API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
  
  glob<T = string>(pattern: string, options?: { as?: 'url' }): Record<string, T>
  glob<T = string>(pattern: string, options: { as: 'raw' }): Record<string, () => Promise<T>>
  globEager<T = string>(pattern: string, options?: { as?: 'url' }): Record<string, T>
  globEager<T = string>(pattern: string, options: { as: 'raw' }): Record<string, T>
}
