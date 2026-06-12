// Reduz a foto enviada antes de mandar para a API de geração.
// Motivo: o Vercel (plano Hobby) limita o corpo da requisição a ~4.5MB. Uma foto
// de celular em base64 estoura esse limite. Aqui reescalamos para no máx. ~1280px
// e reenviamos como JPEG, mantendo o base64 pequeno (~300-800KB) sem perda visível.
export async function downscaleImage(
  file: File,
  maxDim = 1280,
  quality = 0.85,
): Promise<string> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new Image();
    el.onload = () => resolve(el);
    el.onerror = () => reject(new Error("Falha ao carregar a imagem"));
    el.src = dataUrl;
  });

  const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
  // Sem upscale: se a imagem já é pequena, mantém como está
  if (scale === 1 && dataUrl.length < 3_500_000) return dataUrl;

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(img.width * scale);
  canvas.height = Math.round(img.height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) return dataUrl;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", quality);
}
