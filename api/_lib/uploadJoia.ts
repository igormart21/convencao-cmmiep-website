import { createClient } from "@supabase/supabase-js";

// Faz upload da imagem gerada (PNG) para o Supabase Storage e devolve uma URL
// pública e estável — usada na prévia, no carrinho e como propriedade do pedido
// na Shopify (o base64 cru é grande demais para isso).

export async function uploadJoiaImage(pngBuffer: Buffer): Promise<string | null> {
  // Lido dentro da função: em ES modules o import é avaliado ANTES do dotenv.config(),
  // então ler process.env no topo do módulo viria vazio.
  const SUPABASE_URL =
    process.env.SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    "https://unoixnntunmnoeeqfhqq.supabase.co";

  // Prefere a service_role (ignora RLS); cai para a anon/publishable se não houver.
  const SUPABASE_KEY =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    "";

  const BUCKET = process.env.SUPABASE_JOIAS_BUCKET || "joias-personalizadas";

  if (!SUPABASE_KEY) {
    console.warn("[upload] Sem SUPABASE key — pulando upload, usando base64.");
    return null;
  }
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    const filename = `joia-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.png`;
    const { error } = await supabase.storage.from(BUCKET).upload(filename, pngBuffer, {
      contentType: "image/png",
      upsert: false,
    });
    if (error) {
      console.warn("[upload] Falhou:", error.message);
      return null;
    }
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename);
    return data?.publicUrl ?? null;
  } catch (e) {
    console.warn("[upload] Exceção:", e instanceof Error ? e.message : e);
    return null;
  }
}
