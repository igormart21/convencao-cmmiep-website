# Funcionalidade: Personalização de Joia com IA

## Como vai funcionar

O usuário faz upload de uma foto e o site gera uma prévia da joia personalizada usando IA.

```
Usuário faz upload da foto
        ↓
Site envia a foto + prompt para o Replicate
        ↓
Replicate processa com IA (5-15 segundos)
        ↓
Retorna imagem da joia gerada
        ↓
Usuário vê o preview e clica em "Pedir no WhatsApp"
```

---

## O que é o Replicate

Plataforma que dá acesso a modelos de IA prontos via API — sem precisar de servidor potente nem treinar modelos.

Site: https://replicate.com

---

## Custo estimado

| Modelo | Custo por imagem | Qualidade |
|---|---|---|
| Stable Diffusion | ~R$0,05 | Boa |
| FLUX | ~R$0,20 | Muito alta (recomendado) |
| Ideogram | ~R$0,30 | Alta |

**Estimativa:** 100 previews/mês com FLUX = ~R$20/mês

---

## O que precisa para implementar

1. Criar conta em replicate.com (gratuito para começar)
2. Adicionar créditos (~$5 já dá bastante uso)
3. Gerar uma API key no painel do Replicate
4. Criar uma Vercel serverless function para proteger a API key
5. Criar a página `/personalizar` com:
   - Upload de foto
   - Seleção da linha de joia (Imperium, Strata, etc.)
   - Seleção do material (Ouro 18k / Prata)
   - Botão "Gerar prévia"
   - Preview da imagem gerada
   - Botão "Pedir no WhatsApp"

---

## Modelo recomendado

**FLUX** — pela qualidade foto-realista, ideal para apresentar joias premium.

---

## Para retomar esta tarefa

Passe a API key do Replicate e peça ao Claude Code para implementar a página de personalização com IA.
