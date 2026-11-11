import type { APIRoute } from "astro";

import { assetsZip } from "../components/layout/AssetsDownload/assetsZip";

export const GET: APIRoute = async () =>
  new Response(await assetsZip, {
    headers: { "Content-Type": "application/zip" },
  });
