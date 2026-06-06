import OpenAI, { toFile } from "openai";

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

    // ── Etapa 1: GPT-4o Vision extrai descrição cirúrgica ──
    console.log("[gerar-joia] Etapa 1: analisando foto com GPT-4o Vision...");
    let poseDescription = "";
    try {
      const vision = await openai.chat.completions.create({
        model: "gpt-4o",
        max_tokens: 500,
        messages: [{
          role: "user",
          content: [
            { type: "image_url", image_url: { url: imageBase64, detail: "high" } },
            {
              type: "text",
              text: `You are a master jewelry sculptor's assistant. Analyze this photo with extreme precision for sculpting purposes.

Describe ONLY the following — no names, no identification:
1. POSE: exact angle of each limb (e.g. "right arm extended 45° upward, left arm bent 90° at elbow downward"), torso tilt, weight distribution, exact knee and hip angles
2. HEAD: exact tilt angle, chin direction, profile or front-facing, hair style (e.g. "tight bun on top", "loose ponytail falling left", "straight hair shoulder length")
3. CLOTHING: every garment visible — type, fit, any decorative details (rhinestones, fringe, patterns, belts, logos), sleeve length, neckline
4. HANDS: fingers open/closed/spread, thumb position, wrist angle
5. FEET & SHOES: shoe type (ballet slipper, sneaker, boot), any straps/laces, pointed or flexed foot, ankle angle

Be extremely specific with angles and positions. This is for sculpting — precision matters above everything.`,
            },
          ],
        }],
      });
      const raw = vision.choices[0]?.message?.content ?? "";
      if (raw && !raw.toLowerCase().startsWith("i'm sorry") && !raw.toLowerCase().startsWith("i cannot") && raw.length > 50) {
        poseDescription = raw;
      }
    } catch (e) {
      console.warn("[gerar-joia] GPT-4o Vision falhou:", e instanceof Error ? e.message : e);
    }

    // ── Etapa 2: gpt-image-1 com foto + descrição precisa ──
    const metalSurface = isOuro
      ? "18K yellow gold — warm rich golden color, mirror-polished surface, deep golden metallic reflections, subtle dark shadows in engraved recesses"
      : "sterling silver 925 — brilliant cool white-silver, mirror-polished surface, bright silver metallic reflections, subtle dark shadows in engraved recesses";

    const bgColor = isOuro
      ? "warm neutral beige-gray studio background"
      : "cool neutral gray studio background (RGB ~175,175,175)";

    const poseSection = poseDescription
      ? `\nEXACT POSE REFERENCE FROM THE PHOTO:\n${poseDescription}\nReproduce every detail above with 100% fidelity in the sculpture.\n`
      : "";

    const prompt = [
      `Transform the person in this photo into an ultra-realistic luxury jewelry pendant made of ${metalSurface}.`,
      ``,
      `PENDANT FORM: The person's ENTIRE BODY is the pendant — full free-standing 3D sculptural figure with NO rectangular plate and NO flat base. The pendant silhouette follows the exact body outline.`,
      poseSection,
      `SCULPTING — museum-quality master jeweler, ultra high-relief 3D:`,
      `• FACE: sculpted eyes (eyelids, lashes), nose (bridge, nostrils, tip), lips (upper bow, lower fullness), cheekbones, jawline, chin, ears if visible`,
      `• HAIR: exact style in metal — each section, bun wrap, ponytail curve, loose strand flow, fringe, braided texture — reproduced precisely in the metal surface`,
      `• CLOTHING: every fold, crease, hem; rhinestones = tiny raised metal dots; fringe = individual thin metal strands; patterns engraved with sharp lines; belt or waistband with fine detailing`,
      `• HANDS: each finger individually sculpted with separation, knuckle lines, nail shape`,
      `• FEET & SHOES: full shoe detail — straps, ribbons, soles, laces, ankle wrapping — all sculpted`,
      `• BODY: smooth anatomical contours, subtle muscle definition, realistic proportions matching the photo`,
      ``,
      `BAIL: thick polished pendant bail at the very top — smooth oval/teardrop loop in matching metal, naturally attached to the figure's topmost point`,
      ``,
      `PHOTOGRAPHY:`,
      `• Background: ${bgColor}, perfectly uniform, no shadows on background`,
      `• Lighting: soft top-left key light + gentle bottom fill — shows the 3D relief depth with realistic highlights and shadows on every sculpted surface`,
      `• Camera: wide lens, FULL pendant visible — pendant max 60% of image height, 20% empty space at top, 20% at bottom, 10% on each side`,
      `• CRITICAL: bail loop fully visible at top with space above, feet/base fully visible at bottom with space below — NOTHING cut off`,
      `• NO chain, NO hands, NO neck, NO stand, NO props`,
      `• Ultra sharp 8K — every engraved line and surface detail crystal clear`,
      `• Photorealistic luxury product photography, premium jewelry catalog quality`,
      `• NO text, NO watermark, NO logo`,
    ].join("\n");

    console.log("[gerar-joia] Etapa 2: gerando com gpt-image-1 portrait 1024x1536...");

    const response = await (openai.images.generate as Function)({
      model: "gpt-image-1",
      prompt,
      size: "1024x1536",
    });

    const item     = (response as any).data?.[0];
    const imageUrl = item?.url ?? (item?.b64_json ? `data:image/png;base64,${item.b64_json}` : null);

    if (!imageUrl) {
      return Response.json({ error: "Sem imagem gerada." }, { status: 500 });
    }

    console.log("[gerar-joia] Pingente gerado com sucesso!");
    return Response.json({ imageUrl });

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Erro inesperado.";
    console.error("[gerar-joia] Erro:", msg);
    return Response.json({ error: msg }, { status: 500 });
  }
}
