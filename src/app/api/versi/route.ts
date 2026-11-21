// Versi build yang sedang tayang (commit). Klien membandingkannya dengan versinya sendiri untuk
// memuat ulang otomatis bila ada pembaruan (lihat src/lib/pembaruan.ts). Tidak boleh di-cache.

export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({ versi: process.env.VERCEL_GIT_COMMIT_SHA ?? "dev" }, { headers: { "Cache-Control": "no-store, max-age=0" } });
}
