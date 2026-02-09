
// Removed the failing reference to 'vite/client' to resolve the 'Cannot find type definition' error.
// The manual definitions below provide the necessary types for ImportMeta and environment variables.

/**
 * Fallback type definitions for Vite environment variables in case the 
 * 'vite/client' type definitions are not found by the TypeScript compiler.
 */
interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY?: string;
  readonly API_KEY?: string;
  readonly [key: string]: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
