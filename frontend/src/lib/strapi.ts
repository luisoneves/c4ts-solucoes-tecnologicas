import { z } from 'zod';

const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || 'http://localhost:1337';

// --- DEFINIÇÕES GERAIS DE SCHEMA COM ZOD ---

const StrapiImageSchema = z.object({
  url: z.string(),
  alternativeText: z.string().nullable().optional(),
});

const LinkSchema = z.object({
  id: z.number(),
  label: z.string(),
  url: z.string(),
  isExternal: z.boolean(),
});

// --- FUNÇÕES E SCHEMAS PARA "CONFIGURAÇÕES GLOBAIS" (SINGLE TYPE) ---

const HeroSchema = z.object({
  titulo: z.string(),
  subtitulo: z.string().nullable().optional(),
  botao: LinkSchema,
});

const FooterSchema = z.object({
  textoCopyright: z.string(),
  credito: LinkSchema.nullable().optional(),
});

const GlobalSettingsSchema = z.object({
  siteName: z.string(),
  logo: StrapiImageSchema,
  navbarLinks: z.array(LinkSchema),
  hero: HeroSchema.nullable().optional(),
  footer: FooterSchema.nullable().optional(),
  titulo_secao_servicos: z.string().nullable().optional(),
  titulo_secao_projetos: z.string().nullable().optional(),
});

export type GlobalSettings = z.infer<typeof GlobalSettingsSchema>;

export async function getGlobalSettings(): Promise<GlobalSettings | null> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/global-setting?populate=logo&populate=navbarLinks&populate=hero.botao&populate=footer.credito`);
    if (!response.ok) {
      console.error("Erro na API (Global Settings):", response.statusText);
      return null;
    }
    const result = await response.json();
    const validation = GlobalSettingsSchema.safeParse(result.data);

    if (validation.success) {
      return validation.data;
    } else {
      console.error("Erro de validação Zod (Global Settings):", validation.error.issues);
      return null;
    }
  } catch (error) {
    console.error("Falha ao buscar configurações globais:", error);
    return null;
  }
}

// --- FUNÇÕES E SCHEMAS PARA "SERVIÇOS" (COLLECTION TYPE) ---

const ServicoSchema = z.object({
  id: z.number(),
  titulo: z.string(),
  descricao: z.string(),
  imagem: StrapiImageSchema.nullable(),
});

// CORRIGIDO: Schema para a resposta da coleção, sem 'attributes'
const ServicosResponseSchema = z.object({
  data: z.array(ServicoSchema)
});

export type Servico = z.infer<typeof ServicoSchema>;

export async function getServices(): Promise<Servico[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/servicos?populate=imagem`);
    if (!response.ok) {
      console.error("Erro na API de Serviços:", response.statusText);
      return [];
    }
    const result = await response.json();
    const validation = ServicosResponseSchema.safeParse(result);

    if (validation.success) {
      // CORRIGIDO: Retornamos os dados diretamente, pois não há 'attributes' para mapear
      return validation.data.data;
    } else {
      console.error("Erro de validação Zod (Serviços):", validation.error.issues);
      return [];
    }
  } catch (error) {
    console.error("Falha ao buscar serviços:", error);
    return [];
  }
}

// --- FUNÇÕES E SCHEMAS PARA "PROJETOS" (COLLECTION TYPE) ---

const ProjetoSchema = z.object({
  id: z.number(),
  titulo: z.string(),
  imagem: StrapiImageSchema.nullable(),
});

// CORRIGIDO: Schema para a resposta da coleção, sem 'attributes'
const ProjetosResponseSchema = z.object({
  data: z.array(ProjetoSchema)
});

export type Projeto = z.infer<typeof ProjetoSchema>;

export async function getProjects(): Promise<Projeto[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/projetos?populate=imagem`);
    if (!response.ok) {
      console.error("Erro na API de Projetos:", response.statusText);
      return [];
    }
    const result = await response.json();
    const validation = ProjetosResponseSchema.safeParse(result);

    if (validation.success) {
      // CORRIGIDO: Retornamos os dados diretamente
      return validation.data.data;
    } else {
      console.error("Erro de validação Zod (Projetos):", validation.error.issues);
      return [];
    }
  } catch (error) {
    console.error("Falha ao buscar projetos:", error);
    return [];
  }
}

// --- FUNÇÃO AUXILIAR DE MÍDIA ---

export function getStrapiMediaUrl(media: StrapiImage | null): string {
  if (!media) return '';
  const url = media.url;
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}