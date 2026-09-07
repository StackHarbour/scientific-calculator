import type { ReactNode } from 'react'
import { RelatedCalculators } from './RelatedCalculators'
import { Breadcrumbs } from './Breadcrumbs'
import { breadcrumbJsonLd, jsonLd, softwareJsonLd } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

export function CalculatorPage({ title, description, path, intro, tool, sections, faqs, exclude }: { title:string;description:string;path:string;intro:string;tool:ReactNode;sections:{title:string;content:ReactNode}[];faqs?:{question:string;answer:string}[];exclude?:string }){
 const url=`${siteConfig.url}${path}`
 return <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
  <Breadcrumbs items={[{name:'Home',href:'/'},{name:'Calculators',href:'/calculators'},{name:title}]}/>
  <header className="max-w-3xl"><h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1><p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">{intro}</p></header>
  <div className="mt-8">{tool}</div>
  <div className="prose-calculator mt-12 max-w-4xl">{sections.map(section=><section key={section.title} className="mb-10"><h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">{section.title}</h2>{section.content}</section>)}</div>
  {faqs&&<section className="mt-10 max-w-4xl"><h2 className="text-2xl font-semibold tracking-tight">Frequently asked questions</h2><div className="mt-4 divide-y divide-zinc-200 rounded-xl border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">{faqs.map(f=><details key={f.question} className="p-4"><summary className="cursor-pointer font-medium">{f.question}</summary><p className="mt-3 text-sm leading-6 text-zinc-500">{f.answer}</p></details>)}</div></section>}
  <RelatedCalculators exclude={exclude||path}/>
  {breadcrumbJsonLd([{name:'Home',url:siteConfig.url},{name:'Calculators',url:`${siteConfig.url}/scientific-calculator`},{name:title,url}])}
  {softwareJsonLd(title,description,url)}
 </div>
}

export function ArticlePage({title,description,path,children}:{title:string;description:string;path:string;children:ReactNode}){const url=`${siteConfig.url}${path}`;return <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12"><Breadcrumbs items={[{name:'Home',href:'/'},{name:'Guides',href:'/guides'},{name:title}]}/><article><header><h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1><p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">{description}</p></header><div className="prose-calculator mt-10">{children}</div></article>{jsonLd({'@context':'https://schema.org','@type':'Article','headline':title,'description':description,'mainEntityOfPage':url,'author':{'@type':'Organization','name':siteConfig.name},'publisher':{'@type':'Organization','name':siteConfig.name}})}{breadcrumbJsonLd([{name:'Home',url:siteConfig.url},{name:'Guides',url:`${siteConfig.url}/guides/scientific-notation`},{name:title,url}])}</div>}
