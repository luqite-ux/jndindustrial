import { getSupabaseClient, tenantId } from './supabase'
import type { NewsPostView } from './news'
import type { Locale } from './i18n'
const pick=(value:Record<string,string>|null|undefined,locale:string,fallback='')=>value?.[locale]||value?.en||Object.values(value??{}).find(Boolean)||fallback
function map(row:any,locale:Locale):NewsPostView{return {slug:row.slug,publishedAt:row.published_at||row.created_at,updatedAt:row.updated_at,image:row.featured_image,title:pick(row.title_i18n,locale,row.title),excerpt:pick(row.excerpt_i18n,locale,row.excerpt),body:[pick(row.content_i18n,locale,row.content)].filter(Boolean)}}
export async function getPublishedArticles(locale:Locale='en'){const db=getSupabaseClient(),tenant=tenantId();if(!db||!tenant)return [];const {data,error}=await db.from('articles').select('slug,title,title_i18n,excerpt,excerpt_i18n,content,content_i18n,featured_image,published_at,created_at,updated_at,sort_order').eq('tenant_id',tenant).eq('is_published',true).order('sort_order',{ascending:true}).order('published_at',{ascending:false});return error?[]:(data??[]).map(row=>map(row,locale))}
export async function getArticleBySlug(slug:string,locale:Locale='en'){return (await getPublishedArticles(locale)).find(row=>row.slug===slug)}
