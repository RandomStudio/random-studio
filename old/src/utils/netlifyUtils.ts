export const getFunctionUrl = (path: string) => {
  const host =
    process.env.NEXT_PUBLIC_NETLIFY_FUNCTIONS_BASE_URL ??
    (typeof window === 'undefined'
      ? 'http://localhost:3000'
      : window.location.origin);

  const url = new URL(path, host);

  return url.href;
};

export default { getFunctionUrl };
