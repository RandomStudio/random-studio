interface ImportMetaEnv {
  readonly NEXT_DATOCMS_API_TOKEN: string;
  readonly DATOCMS_PREVIEW_SECRET: string;
  readonly BUNNY_LIBRARY_ID: string;
  readonly BUNNY_TOKEN: string;
  readonly DATOCMS_BACKUP_TOKEN: string;
  readonly NEXT_CONTEXT: string;
  readonly NEXT_PUBLIC_NETLIFY_FUNCTIONS_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
