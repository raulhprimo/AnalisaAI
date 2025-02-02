"use client";

import * as React from "react";
import {
  BarChart3,
  LineChart,
  PieChart,
  ScatterChart,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/button";


const charts = [
  {
    title: "Gráfico de Barras",
    description: "Compare valores entre diferentes categorias",
    icon: <BarChart3 className="h-6 w-6 text-blue-500 dark:text-blue-400" />,
  },
  {
    title: "Gráfico de Linha",
    description: "Visualize tendências ao longo do tempo",
    icon: <LineChart className="h-6 w-6 text-emerald-500 dark:text-emerald-400" />,
  },
  {
    title: "Gráfico de Pizza",
    description: "Analise a distribuição proporcional dos dados",
    icon: <PieChart className="h-6 w-6 text-purple-500 dark:text-purple-400" />,
  },
  {
    title: "Gráfico de Dispersão",
    description: "Identifique correlações entre variáveis",
    icon: <ScatterChart className="h-6 w-6 text-sky-500 dark:text-sky-400" />,
  },
];

export default function VisualizacaoPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-neutral-50/50 dark:bg-neutral-950">
      <div className="w-full max-w-7xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 bg-clip-text text-transparent dark:from-neutral-100 dark:via-neutral-200 dark:to-neutral-100">
            Visualização de Dados
          </h1>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Escolha entre diversos tipos de gráficos para visualizar seus dados
            de forma clara e interativa.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {charts.map((chart, index) => (
            <div
              key={index}
              className="group relative rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800">
                  {chart.icon}
                </div>
                <div>
                  <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                    {chart.title}
                  </h2>
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                    {chart.description}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                className="mt-4 w-full justify-between dark:hover:bg-neutral-800"
              >
                Criar Visualização
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
            Recursos Avançados
          </h3>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            Personalize suas visualizações com recursos avançados:
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              "Filtros Dinâmicos",
              "Animações Interativas",
              "Exportação em Alta Resolução",
              "Temas Personalizados",
              "Dados em Tempo Real",
              "Compartilhamento Fácil",
            ].map((feature, index) => (
              <div
                key={index}
                className="rounded-md bg-neutral-50 px-3 py-2 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
              >
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
} 