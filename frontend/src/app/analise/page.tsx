"use client";

import * as React from "react";
import {
  Brain,
  TrendingUp,
  Sigma,
  Network,
  ArrowRight,
  Send,
  Loader2
} from "lucide-react";
import { Button } from "@/components/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface KeyboardEvent {
  key: string;
}

const analyses = [
  {
    title: "Análise Preditiva",
    description: "Preveja tendências futuras com modelos de machine learning",
    icon: <Brain className="h-6 w-6 text-purple-500 dark:text-purple-400" />,
    prompt: "Faça uma análise preditiva dos dados dos contratos, identificando possíveis tendências futuras.",
  },
  {
    title: "Análise Estatística",
    description: "Obtenha insights estatísticos detalhados dos seus dados",
    icon: <Sigma className="h-6 w-6 text-blue-500 dark:text-blue-400" />,
    prompt: "Realize uma análise estatística detalhada dos contratos, mostrando médias, medianas e distribuições importantes.",
  },
  {
    title: "Análise de Tendências",
    description: "Identifique padrões e tendências nos seus dados",
    icon: <TrendingUp className="h-6 w-6 text-emerald-500 dark:text-emerald-400" />,
    prompt: "Identifique os principais padrões e tendências nos dados dos contratos ao longo do tempo.",
  },
  {
    title: "Análise de Correlação",
    description: "Descubra relações entre diferentes variáveis",
    icon: <Network className="h-6 w-6 text-sky-500 dark:text-sky-400" />,
    prompt: "Analise as correlações entre diferentes aspectos dos contratos, como duração, valor e modalidade.",
  },
];

// Função para processar o texto da IA
function formatAIResponse(text: string): string {
  return text
    .replace(/###/g, '') // Remove ###
    .replace(/\*\*/g, '') // Remove **
    .split('\n')          // Divide em linhas
    .map(line => line.trim()) // Remove espaços extras
    .filter(line => line)     // Remove linhas vazias
    .join('\n\n');           // Junta com espaçamento duplo
}

export default function AnalisePage() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (message: string) => {
    if (!message.trim()) return;

    try {
      setIsLoading(true);
      // Adiciona a mensagem do usuário
      setMessages(prev => [...prev, { role: 'user', content: message }]);
      setInput('');

      // Faz a chamada para a API
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar mensagem');
      }

      const data = await response.json();
      
      // Adiciona a resposta do assistente
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Erro:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Desculpe, ocorreu um erro ao processar sua mensagem.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-neutral-50/50 dark:bg-neutral-950">
      <div className="w-full max-w-7xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 bg-clip-text text-transparent dark:from-neutral-100 dark:via-neutral-200 dark:to-neutral-100">
            Análise de Dados com IA
          </h1>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Converse com nossa IA para obter insights valiosos dos seus dados. Use os botões abaixo para prompts predefinidos ou faça suas próprias perguntas.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
              <Button
                variant="ghost"
                className="mt-4 w-full justify-between dark:hover:bg-neutral-800"
                onClick={() => handleSend(analysis.prompt)}
                disabled={isLoading}
              >
                Usar Prompt
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <Card className="mb-4">
          <CardContent className="p-4">
            <ScrollArea className="h-[400px] pr-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-neutral-100 dark:bg-neutral-800'
                    }`}
                  >
                    {message.role === 'assistant' ? (
                      <div className="whitespace-pre-line text-sm leading-relaxed">
                        {formatAIResponse(message.content)}
                      </div>
                    ) : (
                      <div className="text-sm">
                        {message.content}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={scrollRef} />
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Input
            placeholder="Digite sua pergunta..."
            value={input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
            onKeyPress={(e: KeyboardEvent) => {
              if (e.key === 'Enter' && !isLoading) {
                handleSend(input);
              }
            }}
            disabled={isLoading}
          />
          <Button 
            onClick={() => handleSend(input)}
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </main>
  );
} 