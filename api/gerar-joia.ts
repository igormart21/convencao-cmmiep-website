import OpenAI, { toFile } from "openai";
import { uploadJoiaImage } from "./_lib/uploadJoia";

export const runtime = "nodejs";
export const maxDuration = 300;

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "OPENAI_API_KEY não configurado." }, { status: 500 });
  }

  let body: { imageBase64?: string; material?: string };
  try { body = await req.json(); }
  catch { return Response.json({ error: "Body inválido." }, { status: 400 }); }

  const { imageBase64, material } = body;
  if (!imageBase64) {
    return Response.json({ error: "Nenhuma imagem enviada." }, { status: 400 });
  }

  const isOuro = material !== "prata";
  const openai = new OpenAI({ apiKey });

  try {
    const mimeMatch  = imageBase64.match(/^data:(image\/[\w+]+);base64,/);
    const mimeType   = (mimeMatch?.[1] ?? "image/jpeg") as "image/jpeg" | "image/png" | "image/webp";
    const ext        = mimeType === "image/png" ? "png" : mimeType === "image/webp" ? "webp" : "jpg";
    const base64Data = imageBase64.replace(/^data:image\/[\w+]+;base64,/, "");
    const imageBuffer = Buffer.from(base64Data, "base64");
    const imageFile   = await toFile(imageBuffer, `photo.${ext}`, { type: mimeType });

    // ── gpt-image-1 edit: a própria foto é enviada (images.edit), então o
    //    modelo já enxerga a pose/silhueta — sem etapa de Vision (mais rápido) ──
    const metalSurface = isOuro
      ? "real polished 18K yellow gold — authentic warm golden precious-metal color with a realistic gold metallic sheen and soft reflective highlights, exactly like genuine gold jewelry (NOT a flat yellow, NOT painted, NOT plastic)"
      : "real polished sterling silver 925 — authentic bright silver-white precious-metal color with a realistic silver metallic sheen and soft reflective highlights, exactly like genuine silver jewelry (NOT plain gray, NOT black-and-white, NOT matte paint)";

    const bgColor = isOuro
      ? "warm neutral beige-gray studio background"
      : "neutral gray studio background (RGB ~175,175,175)";

    const prompt = [
      `Convert the person in this uploaded photo into a FLAT 2D laser-cut pendant made of ${metalSurface}. Use the uploaded image as the PRIMARY GEOMETRY REFERENCE and treat it as a template.`,
      `Redraw the person as clean editorial BLACK LINE-ART (a crisp vector / ink illustration, like a comic line drawing) and cut that illustration out of the flat brushed metal — exactly like a laser-cut silhouette jewelry pendant.`,
      ``,
      `ABSOLUTE PRIORITY — SILHOUETTE FIDELITY: The final pendant MUST preserve the EXACT silhouette and pose of the original person. Replicate with maximum fidelity: pose, body contour, face direction, hairstyle, clothing contour and accessories (sunglasses, watch, belt, shoe details). The result must look as if the person was directly converted into a laser-cut silver pendant. Do NOT modify the pose. The outer silhouette must match the uploaded image as closely as possible.`,
      `STYLE — flat metal cutout, NOT a sculpture:`,
      `• Flat 2D pendant with a single uniform thickness`,
      `• NO sculpting, NO 3D relief, NO embossing, NO statue effect, NO depth modeling`,
      `• NO artistic reinterpretation, NO stylization, NO pose modification`,
      `• The outer edge is a precision laser-cut following the person's exact outline`,
      ``,
      `MATERIAL: ${metalSurface}.`,
      ``,
      `DETAILS:`,
      `• Internal features (face, hair parting, clothing folds, finger separation, shoe straps) rendered ONLY as thin BLACK engraved contour lines on the flat metal — clean line art`,
      `• Black engraved contour lines only — clean jewelry manufacturing lines, precision laser-cut edges, minimalist jewelry design`,
      `• The flat metal surface MUST read as genuine ${isOuro ? "gold" : "silver"}: realistic metallic sheen, soft reflective highlights and gentle tonal variation like real polished precious metal — NOT a flat solid color, NOT grayscale, NOT yellow paint`,
      `• Keep the SHAPE completely flat (no 3D relief, no embossing, no sculpting) — only the metal's natural surface reflections, with the detail rendered as black engraved lines`,
      ``,
      `BAIL: small flat polished pendant bail loop at the very top, in matching metal, attached to the topmost point of the silhouette`,
      ``,
      `PRODUCT PHOTOGRAPHY:`,
      `• Background: ${bgColor}, perfectly uniform — professional e-commerce product photography`,
      `• Lighting: soft studio light that creates gentle metallic reflections and highlights on the flat ${isOuro ? "gold" : "silver"} surface so it clearly looks like real precious metal, subtle drop shadow only, no shadows on the background`,
      `• Camera: straight-on flat front view, FULL pendant visible — pendant max 60% of image height, ~20% empty space at top, ~20% at bottom, ~10% on each side`,
      `• CRITICAL: bail loop fully visible at top with space above, feet/base fully visible at bottom with space below — NOTHING cut off`,
      `• NO chain, NO neck, NO hand holding it, NO stand, NO props`,
      `• Ultra sharp 8K — every black engraved contour line crisp and clean`,
      `• Premium jewelry catalog quality`,
      `• NO text, NO watermark, NO logo`,
    ].join("\n");

    console.log("[gerar-joia] gerando com gpt-image-1 portrait 1024x1536 (quality medium)...");

    const response = await (openai.images.edit as Function)({
      model: "gpt-image-1",
      image: imageFile,
      prompt,
      size: "1024x1536",
      input_fidelity: "high",
      quality: "medium",
    });

    const item     = (response as any).data?.[0];
    const b64      = item?.b64_json as string | undefined;
    const dataUrl  = b64 ? `data:image/png;base64,${b64}` : (item?.url ?? null);

    if (!dataUrl) {
      return Response.json({ error: "Sem imagem gerada." }, { status: 500 });
    }

    // Sobe para o Supabase Storage → URL pública estável (usada no pedido Shopify)
    let storageUrl: string | null = null;
    if (b64) {
      storageUrl = await uploadJoiaImage(Buffer.from(b64, "base64"));
    }

    console.log("[gerar-joia] Pingente gerado com sucesso!", storageUrl ? "(storage OK)" : "(sem storage)");
    return Response.json({ imageUrl: storageUrl ?? dataUrl, storageUrl });

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Erro inesperado.";
    console.error("[gerar-joia] Erro:", msg);
    return Response.json({ error: msg }, { status: 500 });
  }
}
