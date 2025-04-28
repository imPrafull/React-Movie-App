/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MOVIE_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.module.css' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.svg' {
  const content: string
  export default content
}