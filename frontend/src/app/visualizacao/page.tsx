"use client";

import React from "react";
import {
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, LineChart, Line } from "recharts";

interface ChartData {
  name: string;
  value: number;
}

interface TemporalData {
  date: string;
  quantidade: number;
}

interface ChartCardProps {
  title: string;
  description?: string;
  data: ChartData[] | TemporalData[];
  type: 'bar' | 'line';
}

function ChartCard({ title, description, data, type }: ChartCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'bar' ? (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          ) : (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="quantidade" stroke="#8884d8" />
            </LineChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default function VisualizacaoPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string>();
  const [statusData, setStatusData] = React.useState<ChartData[]>([]);
  const [modalidadeData, setModalidadeData] = React.useState<ChartData[]>([]);
  const [temporalData, setTemporalData] = React.useState<TemporalData[]>([]);
  const [responsavelData, setResponsavelData] = React.useState<ChartData[]>([]);

  const loadData = React.useCallback(async () => {
    try {
      setIsLoading(true);
      setError(undefined);
      
      const response = await fetch('http://localhost:8000/api/analise');
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `Erro ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Dados recebidos da API:', data);

      if (!data) {
        throw new Error('Nenhum dado retornado da API');
      }

      // Ajustando o acesso aos dados conforme a estrutura da API
      setStatusData(data.status_analysis?.data || []);
      setModalidadeData(data.modalidade_analysis?.data || []);
      setTemporalData(data.temporal_analysis?.data || []);
      setResponsavelData(data.responsavel_analysis?.data || []);
    } catch (err) {
      console.error('Erro completo:', err);
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados. Verifique se o servidor está rodando.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-neutral-50/50 dark:bg-neutral-950">
      <div className="w-full max-w-7xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 bg-clip-text text-transparent dark:from-neutral-100 dark:via-neutral-200 dark:to-neutral-100">
            Análise de Contratos
          </h1>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Visualize análises detalhadas dos seus contratos através de gráficos
            interativos.
          </p>
          {error && (
            <div className="mt-4 flex items-center justify-center gap-2 text-red-500">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          )}
          <Button
            variant="outline"
            className="mt-4"
            onClick={loadData}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Carregando...
              </>
            ) : (
              'Atualizar Dados'
            )}
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartCard
            title="Status dos Contratos"
            description="Distribuição entre contratos ativos e encerrados"
            data={statusData}
            type="bar"
          />

          <ChartCard
            title="Modalidades"
            description="Distribuição dos contratos por modalidade"
            data={modalidadeData}
            type="bar"
          />

          <ChartCard
            title="Evolução Temporal"
            description="Quantidade de contratos ao longo do tempo"
            data={temporalData}
            type="line"
          />

          <ChartCard
            title="Análise por Responsável"
            description="Distribuição de contratos por responsável"
            data={responsavelData}
            type="bar"
          />
        </div>

        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Insights</CardTitle>
            <CardDescription>Principais observações das análises</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {!isLoading && (
                <>
                  <div className="rounded-md bg-neutral-50 px-4 py-3 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                    <strong>Status:</strong> {statusData.length > 0 ? statusData[0].value : 0} contratos ativos e{' '}
                    {statusData.length > 1 ? statusData[1].value : 0} encerrados
                  </div>
                  <div className="rounded-md bg-neutral-50 px-4 py-3 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                    <strong>Modalidade mais comum:</strong>{' '}
                    {modalidadeData.length > 0 ? modalidadeData[0].name : 'Nenhum dado'}
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
} 