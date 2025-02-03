"use client";

import { useEffect, useState } from 'react';

export default function TestPage() {
  const [status, setStatus] = useState<string>('Testando conexão...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function testConnection() {
      try {
        const response = await fetch('http://localhost:8000/api/test');
        const data = await response.json();
        setStatus(`Conexão OK: ${data.message}`);
      } catch (error) {
        console.error('Erro ao testar conexão:', error);
        setError(`Erro na conexão: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
        setStatus('Falha na conexão');
      }
    }

    testConnection();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Teste de Conexão com Backend</h1>
        <p className={`text-lg ${error ? 'text-red-500' : 'text-green-500'}`}>
          {status}
        </p>
        {error && (
          <p className="text-red-500 mt-2">
            {error}
          </p>
        )}
      </div>
    </main>
  );
} 