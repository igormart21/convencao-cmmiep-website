const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY missing" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { imageDataUrl, referenceImageDataUrl, categoria, material, estilo, genero, perfilBike, inscricao } = await req.json();

    if (!imageDataUrl || typeof imageDataUrl !== "string") {
      return new Response(JSON.stringify({ error: "imageDataUrl é obrigatório" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const isOuro = material === "Ouro 18K";
    const metalCor = isOuro
      ? "OURO 18K AMARELO maciço, tom dourado quente e brilhante (#D4AF37), polimento espelhado com reflexos amarelo-dourados intensos. NUNCA prateado, NUNCA cinza, NUNCA branco."
      : "PRATA 925 maciça, tom prateado frio e brilhante (#C0C0C0 / cromado), polimento espelhado com reflexos prateados. NUNCA dourado, NUNCA amarelo, NUNCA cobre.";

    // ===== Categoria / modalidade esportiva =====
    const generoLabel = genero === "Feminino" ? "mulher" : "homem";
    let categoriaDesc = "";
    switch (categoria) {
      case "Corredores":
        categoriaDesc = `MODALIDADE CORRIDA DE RUA: a miniatura DEVE representar um(a) ${generoLabel} CORREDOR(A), em pose dinâmica de corrida (uma perna à frente, braços flexionados em movimento de corrida), vestindo trajes esportivos leves de corredor (regata/camiseta técnica + shorts curtos de corrida + tênis de corrida claramente esculpidos nos pés). Corpo atlético e enxuto típico de corredor de rua.`;
        break;
      case "Musculação":
        categoriaDesc = `MODALIDADE MUSCULAÇÃO: a miniatura DEVE representar um(a) ${generoLabel} praticante de musculação, em pose de academia (por exemplo, executando uma rosca de bíceps com halter na mão OU em pose flexionando o bíceps), corpo musculoso e definido, vestindo regata/top esportivo + shorts/bermuda de academia + tênis. Mostrar halter ou peso na mão se possível.`;
        break;
      case "Fisiculturismo":
        categoriaDesc = `MODALIDADE FISICULTURISMO: a miniatura DEVE representar um(a) ${generoLabel} fisiculturista em POSE CLÁSSICA DE PALCO (front double biceps OU most muscular), físico extremamente musculoso e hipertrofiado, com músculos exagerados e definidos, vestindo APENAS sunga/posing trunk de competição. Pose de competição, não de academia.`;
        break;
      case "Ciclista": {
        const bikeTipo =
          perfilBike === "Mountain Bike"
            ? "MOUNTAIN BIKE (quadro robusto, pneus largos com travas, suspensão dianteira visível, guidão reto)"
            : "BICICLETA SPEED/ROAD (quadro fino aerodinâmico, pneus finos lisos, guidão drop curvado para baixo)";
        categoriaDesc = `MODALIDADE CICLISMO: a miniatura DEVE representar um(a) ${generoLabel} CICLISTA EM CIMA DA BICICLETA, em posição de pedalada, vestindo macacão/camisa de ciclismo + bermuda de ciclismo + capacete aerodinâmico na cabeça + óculos esportivos. A bicicleta deve ser claramente uma ${bikeTipo}, esculpida em relevo no metal junto com o ciclista, ambos formando uma única peça do pingente. Sem capuz, sem moletom.`;
        break;
      }
      case "Crossfit":
        categoriaDesc = `MODALIDADE CROSSFIT: a miniatura DEVE representar um(a) ${generoLabel} atleta de crossfit em pose funcional intensa (por exemplo, segurando uma BARRA OLÍMPICA acima da cabeça em snatch/clean OU com KETTLEBELL na mão), corpo atlético e musculoso, vestindo regata/top + shorts curtos + tênis de crossfit. Mostre o equipamento (barra, anilhas ou kettlebell) esculpido junto.`;
        break;
      case "Triatlon":
        categoriaDesc = `MODALIDADE TRIATLON: a miniatura DEVE representar um(a) ${generoLabel} TRIATLETA em pose de corrida com macacão/uniforme de triatlo (tri-suit colado ao corpo) + óculos esportivos, corpo extremamente atlético e enxuto. Pode incluir um sutil elemento de bicicleta ou óculos de natação ao lado, mas a figura central é o triatleta em movimento.`;
        break;
      default:
        categoriaDesc = `Miniatura esportiva de um(a) ${generoLabel} atleta em pose dinâmica.`;
    }

    const estiloDesc =
      estilo === "Underground"
        ? "ESTILO UNDERGROUND OBRIGATÓRIO: a miniatura da pessoa DEVE aparecer usando APENAS estes três acessórios urbanos, claramente visíveis e bem esculpidos em relevo no metal: (1) BONÉ na cabeça, (2) ÓCULOS ESCUROS no rosto e (3) RELÓGIO de pulso no braço. PROIBIDO incluir correntes, colares, cordões no pescoço, piercings, tatuagens, capuz, moletom ou qualquer outro acessório além desses três. O pescoço, tronco e pele devem ficar limpos, sem qualquer corrente ou desenho de tatuagem. Apenas boné + óculos + relógio, nada mais."
        : "ESTILO CLÁSSICO: pingente puro e minimalista, apenas a silhueta da pessoa em pose limpa, SEM acessórios extras, contornos suaves e elegantes.";

    const corFio = isOuro
      ? "fio dourado tom-sobre-tom (ouro sobre ouro)"
      : "fio prateado tom-sobre-tom (prata sobre prata)";

    const inscricaoLimpa = typeof inscricao === "string" ? inscricao.trim().replace(/\s+/g, " ") : "";
    const inscricaoLinhas = inscricaoLimpa
      ? inscricaoLimpa.match(/.{1,12}(?:\s|$)|\S{1,12}/g)?.map((linha) => linha.trim()).filter(Boolean) ?? [inscricaoLimpa]
      : [];
    const inscricaoFormatada = inscricaoLinhas.join(" / ");

    const inscricaoTexto = inscricaoLimpa
      ? `OBRIGATÓRIO: grave EXATAMENTE E LITERALMENTE o seguinte texto, caractere por caractere, sem traduzir, sem reescrever, sem inventar palavras, sem trocar números, sem adicionar nada e sem remover nada: «${inscricaoLimpa}». PROIBIDO inventar nomes, frases, datas, números, tempos, distâncias ou qualquer outro caractere que não esteja entre as aspas acima. PROIBIDO completar, abreviar ou estilizar de forma que altere o conteúdo. Se houver "/", ":", letras maiúsculas, acentos ou números, mantenha-os IDÊNTICOS. Distribua o texto em até duas linhas retas paralelas centralizadas, se necessário, usando esta separação visual: "${inscricaoFormatada}". A gravação deve ficar CENTRALIZADA EXCLUSIVAMENTE NO RETÂNGULO SEGURO DO PEITO da figura. Antes de gravar, identifique visualmente a caixa interna do peito/tronco e aplique uma margem interna grande de segurança em todos os lados; a gravação deve ficar dentro dessa caixa menor, nunca encostando nas bordas do corpo. Use LETRAS CONDENSADAS/APERTADAS, estreitas na largura, com escala horizontal reduzida, como uma fonte compacta de bordado. Se qualquer linha tiver risco de passar da caixa do peito, APERTE mais as letras na horizontal e DIMINUA a fonte até caber; é obrigatório sacrificar tamanho para manter 100% do texto dentro do peito. Todas as linhas devem ser perfeitamente RETAS, horizontais, niveladas, sem inclinação, sem arco, sem curvatura e sem perspectiva torta. REGRA ABSOLUTA DE CONTENÇÃO: NENHUMA LETRA, NÚMERO, ACENTO, BARRA, PONTO OU TRAÇO pode sair para fora do boneco, do peito ou do tronco; não pode invadir ombros, braços, pescoço, rosto, pernas nem o fundo. A gravação deve simular um BORDADO em ${corFio}, com CONTORNO PRETO FINO e UNIFORME em volta de cada letra e número (espessura idêntica em caracteres finos como "1", "I", "l", "/" e em caracteres largos como "M", "W", "0"). Letras e números nítidos, legíveis, alinhados pelo centro do peito, com espaçamento uniforme e acabamento perfeito.`
      : "ATENÇÃO: NÃO grave NENHUM texto, número, palavra, letra, símbolo ou inscrição no pingente. O peito e o tronco devem ficar completamente LIMPOS, sem qualquer marca, sem qualquer caractere, sem qualquer logo. Pingente liso, sem gravação alguma.";

    const corEnfase = isOuro
      ? "O PINGENTE INTEIRO DEVE SER 100% DOURADO (ouro amarelo). Cor obrigatória: amarelo-ouro brilhante. Proibido qualquer tom prateado, cinza ou branco no metal."
      : "O PINGENTE INTEIRO DEVE SER 100% PRATEADO (prata polida). Cor obrigatória: prata cromada brilhante. Proibido qualquer tom dourado, amarelo ou cobre no metal.";

    const generoTexto =
      genero === "Feminino"
        ? "A figura DEVE ser claramente FEMININA, com silhueta, traços e proporções de uma mulher."
        : "A figura DEVE ser claramente MASCULINA, com silhueta, traços e proporções de um homem.";

    const temReferencia = typeof referenceImageDataUrl === "string" && referenceImageDataUrl.length > 0;

    const referenciaTexto = temReferencia
      ? `IMAGEM 1 = PINGENTE DE REFERÊNCIA OFICIAL DO CATÁLOGO (a primeira imagem enviada). Esta imagem é a VERDADE ABSOLUTA do estilo da peça. Você DEVE COPIAR FIELMENTE desta referência: o traço escultural, as proporções (cabeça, tronco, braços, pernas), a POSE EXATA, as roupas, os acessórios esportivos, o equipamento, o tipo de acabamento metálico, o tom do metal, a iluminação, os reflexos, as sombras, o enquadramento, o tamanho da argolinha e o fundo. O pingente final DEVE PARECER O MESMO BONECO da referência, como se fosse a mesma peça do catálogo, apenas com o ROSTO trocado.

IMAGEM 2 = FOTO DO CLIENTE (a segunda imagem enviada). Use APENAS COMO REFERÊNCIA DE IDENTIDADE FACIAL: rosto, traços faciais, tipo de cabelo, cor de pele aproximada. NÃO copie pose, roupas, fundo, iluminação, acessórios ou qualquer outra coisa da foto do cliente — TUDO ISSO vem da IMAGEM 1.

REGRA DE OURO: o resultado deve ser VISUALMENTE IDÊNTICO à IMAGEM 1 (mesmo boneco, mesma pose, mesmas roupas, mesmo metal, mesmo estilo, mesmo enquadramento, mesmo fundo), apenas substituindo o rosto pelo rosto da pessoa da IMAGEM 2.`
      : `Use a foto enviada APENAS COMO REFERÊNCIA DE IDENTIDADE (rosto, traços faciais, tipo de cabelo, cor de pele aproximada e biotipo geral) da pessoa.`;

    const prompt = `${referenciaTexto}

ESTILO VISUAL OBRIGATÓRIO DO PINGENTE (idêntico ao catálogo padrão da marca, mesmo traço dos bonecos pré-definidos):
- Escultura miniatura 3D estilizada, proporções de pingente de joia de luxo (cabeça levemente maior que o realista, corpo atlético compacto), NÃO realista fotográfico, NÃO cartoon infantil — é uma MINIATURA JOALHEIRA esculpida.
- Traço limpo, contornos suaves e arredondados, superfícies polidas, volumes bem definidos com sombras metálicas suaves (mesmo acabamento dos bonecos exibidos na seleção de estilo).
- Pingente único e isolado, pendurado por uma ARGOLINHA PEQUENA E DISCRETA no topo da cabeça.
- Toda a peça (corpo, roupas, equipamentos, acessórios) esculpida em UMA ÚNICA PEÇA do mesmo metal, sem cores externas, sem pintura, apenas o tom do metal.
- Acabamento idêntico em todos os pingentes: joalheiro premium, espelhado, reflexos coerentes, sombras editoriais.

METAL: ${metalCor} ${corEnfase}

${generoTexto}

${categoriaDesc}

A POSE, ROUPAS, ACESSÓRIOS E EQUIPAMENTOS ESPORTIVOS DEVEM SER COPIADOS DA IMAGEM DE REFERÊNCIA DO CATÁLOGO (quando fornecida) — não copie a pose nem as roupas da foto do cliente. Copie APENAS o ROSTO/IDENTIDADE da pessoa e aplique no boneco do catálogo, mantendo o MESMO TRAÇO ESCULTURAL.

${estiloDesc}.

${inscricaoTexto}

Fundo neutro preto profundo, iluminação editorial de catálogo de joalheria, fotografia macro de produto. Apenas o pingente isolado em destaque, centralizado, mesmo enquadramento dos pingentes da galeria de estilos.`;

    const userContent: any[] = [{ type: "text", text: prompt }];
    if (temReferencia) {
      userContent.push({ type: "image_url", image_url: { url: referenceImageDataUrl } });
    }
    userContent.push({ type: "image_url", image_url: { url: imageDataUrl } });


    const aiResponse = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3.1-flash-image-preview",
          messages: [
            {
              role: "user",
              content: userContent,
            },
          ],
          modalities: ["image", "text"],
        }),
      },
    );

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error("AI gateway error:", aiResponse.status, errText);
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Muitas requisições. Tente novamente em instantes." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "Créditos de IA esgotados. Adicione créditos no workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      return new Response(JSON.stringify({ error: "Falha ao gerar pingente" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await aiResponse.json();
    const generatedImageUrl =
      data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!generatedImageUrl) {
      console.error("No image in AI response:", JSON.stringify(data).slice(0, 500));
      return new Response(JSON.stringify({ error: "Imagem não retornada pela IA" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ imageUrl: generatedImageUrl }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("gerar-pingente error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Erro desconhecido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
