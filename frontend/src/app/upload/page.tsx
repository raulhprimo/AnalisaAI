"use client";

import * as React from "react";
import { Upload, FileType, FileUp } from "lucide-react";
import { Button } from "@/components/button";


export default function UploadPage() {
  const [isDragging, setIsDragging] = React.useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-neutral-50/50 dark:bg-neutral-950">
      <div className="w-full max-w-7xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 bg-clip-text text-transparent dark:from-neutral-100 dark:via-neutral-200 dark:to-neutral-100">
            Upload de Dados
          </h1>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Faça upload dos seus arquivos para começar a análise. Suportamos
            diversos formatos como CSV, Excel, JSON e SQL.
          </p>
        </header>

        <div
          className={`relative mt-8 rounded-xl border-2 border-dashed p-12 transition-colors ${
            isDragging
              ? "border-blue-500 bg-blue-50/50 dark:border-blue-400 dark:bg-blue-950/10"
              : "border-neutral-200 dark:border-neutral-800"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            // Implementar lógica de upload
          }}
        >
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-900">
              <Upload className="h-6 w-6 text-neutral-600 dark:text-neutral-400" />
            </div>
            <h2 className="mt-4 text-lg font-medium text-neutral-900 dark:text-neutral-100">
              Arraste seus arquivos aqui
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              ou clique para selecionar
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Button variant="outline" size="sm">
                <FileType className="mr-2 h-4 w-4" />
                Selecionar Arquivo
              </Button>
              <Button variant="outline" size="sm">
                <FileUp className="mr-2 h-4 w-4" />
                Upload em Lote
              </Button>
            </div>
          </div>

          <div className="mt-8">
            <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
              <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                Formatos Suportados
              </h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {["CSV", "Excel", "JSON", "SQL"].map((format) => (
                  <span
                    key={format}
                    className="inline-flex items-center rounded-md bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                  >
                    {format}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 