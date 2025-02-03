import * as React from "react";
import { BentoGrid, type BentoItem } from "@/components/ui/bento-grid";
import {
  BarChart3,
  Upload,
  Brain,
  Download,
} from "lucide-react";

const items: BentoItem[] = [
  {
    title: "Upload de Dados",
    meta: "Suporte Multi-formato",
    description:
      "Faça upload de seus arquivos CSV, Excel, JSON ou SQL para análise detalhada",
    icon: <Upload className="w-4 h-4 text-blue-500 dark:text-blue-400" />,
    status: "Ativo",
    tags: ["CSV", "Excel", "JSON"],
    colSpan: 2,
    hasPersistentHover: true,
  },
  {
    title: "Visualização Interativa",
    meta: "10+ tipos de gráficos",
    description: "Crie visualizações interativas e personalizáveis dos seus dados",
    icon: <BarChart3 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />,
    status: "Novo",
    tags: ["Gráficos", "Dashboards"],
  },
  {
    title: "Análise Estatística",
    meta: "IA Integrada",
    description: "Análises estatísticas avançadas com insights gerados por IA",
    icon: <Brain className="w-4 h-4 text-purple-500 dark:text-purple-400" />,
    tags: ["Estatísticas", "IA", "ML"],
    colSpan: 2,
  },
  {
    title: "Exportação de Dados",
    meta: "Múltiplos formatos",
    description: "Exporte suas análises e visualizações em diversos formatos",
    icon: <Download className="w-4 h-4 text-sky-500 dark:text-sky-400" />,
    status: "Premium",
    tags: ["PDF", "Excel", "API"],
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-neutral-50/50 dark:bg-neutral-950">
      <div className="w-full max-w-7xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            <span className="text-neutral-900 dark:text-white">ANALIS</span>
            <span className="text-purple-600 dark:text-purple-400">AI</span>
          </h1>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Plataforma moderna e intuitiva para análise e visualização de dados,
            com recursos avançados de IA para insights mais profundos
          </p>
        </header>

        <BentoGrid items={items} />
      </div>
    </main>
  );
} 