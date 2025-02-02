"use client";

import * as React from "react";
import {
  Brain,
  TrendingUp,
  Sigma,
  Network,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/button";

const analyses = [
  {
    title: "Análise Preditiva",
    description: "Preveja tendências futuras com modelos de machine learning",
    icon: <Brain className="h-6 w-6 text-purple-500 dark:text-purple-400" />,
    tags: ["IA", "ML", "Previsão"],
  },
  {
    title: "Análise Estatística",
    description: "Obtenha insights estatísticos detalhados dos seus dados",
    icon: <Sigma className="h-6 w-6 text-blue-500 dark:text-blue-400" />,
    tags: ["Estatística", "Métricas", "Insights"],
  },
  {
    title: "Análise de Tendências",
    description: "Identifique padrões e tendências nos seus dados",
    icon: <TrendingUp className="h-6 w-6 text-emerald-500 dark:text-emerald-400" />,
    tags: ["Tendências", "Padrões", "Análise"],
  },
  {
    title: "Análise de Correlação",
    description: "Descubra relações entre diferentes variáveis",
    icon: <Network className="h-6 w-6 text-sky-500 dark:text-sky-400" />,
    tags: ["Correlação", "Variáveis", "Relações"],
  },
];

export default function AnalisePage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-neutral-50/50 dark:bg-neutral-950">
      <div className="w-full max-w-7xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 bg-clip-text text-transparent dark:from-neutral-100 dark:via-neutral-200 dark:to-neutral-100">
            Análise de Dados
          </h1>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Utilize nossos algoritmos avançados de IA para extrair insights
            valiosos dos seus dados.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {analyses.map((analysis, index) => (
            <div
              key={index}
              className="group relative rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800">
                  {analysis.icon}
                </div>
                <div>
                  <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                    {analysis.title}
                  </h2>
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                    {analysis.description}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {analysis.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center rounded-md bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <Button
                variant="ghost"
                className="mt-4 w-full justify-between dark:hover:bg-neutral-800"
              >
                Iniciar Análise
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
              Recursos de IA
            </h3>
          </div>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            Nossa plataforma utiliza algoritmos avançados de IA para:
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "Detecção automática de anomalias",
              "Previsão de séries temporais",
              "Segmentação de dados",
              "Análise de sentimento",
              "Classificação automática",
              "Recomendações personalizadas",
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-md bg-neutral-50 px-3 py-2 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
              >
                <div className="h-1 w-1 rounded-full bg-yellow-500" />
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
} 