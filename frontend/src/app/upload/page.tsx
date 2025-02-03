"use client";

import * as React from "react";
import { Upload, FileType, FileUp, X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/button";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";

interface FileWithPreview extends File {
  uploadStatus?: 'idle' | 'uploading' | 'success' | 'error';
  error?: string;
}

export default function UploadPage() {
  const router = useRouter();
  const [isDragging, setIsDragging] = React.useState(false);
  const [files, setFiles] = React.useState<FileWithPreview[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFiles = async (newFiles: FileList | null) => {
    if (!newFiles) return;
    
    const validFiles = Array.from(newFiles).map(file => {
      console.log('Arquivo selecionado:', {
        name: file.name,
        type: file.type,
        size: file.size
      });
      return {
        ...file,
        uploadStatus: 'idle' as const
      };
    });

    setFiles(prev => [...prev, ...validFiles]);
  };

  const uploadFile = async (file: FileWithPreview) => {
    try {
      console.log('Iniciando upload do arquivo:', file.name);
      
      // Atualiza status para uploading
      setFiles(prev => 
        prev.map(f => 
          f === file ? { ...f, uploadStatus: 'uploading' as const } : f
        )
      );

      // Verifica se é um arquivo válido
      if (!(file instanceof File)) {
        throw new Error('Arquivo inválido');
      }

      // Faz upload do arquivo
      const result = await api.uploadFile(file);
      console.log('Upload concluído:', result);

      // Atualiza status para success
      setFiles(prev => 
        prev.map(f => 
          f === file ? { ...f, uploadStatus: 'success' as const } : f
        )
      );

      // Redireciona para a página de visualização após 1 segundo
      setTimeout(() => {
        router.push('/visualizacao');
      }, 1000);
    } catch (error) {
      console.error('Erro no upload:', error);
      // Atualiza status para error
      setFiles(prev => 
        prev.map(f => 
          f === file ? { 
            ...f, 
            uploadStatus: 'error' as const,
            error: error instanceof Error ? error.message : 'Erro ao fazer upload'
          } : f
        )
      );
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-neutral-50/50 dark:bg-neutral-950">
      <div className="w-full max-w-7xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 bg-clip-text text-transparent dark:from-neutral-100 dark:via-neutral-200 dark:to-neutral-100">
            Upload de Dados
          </h1>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Faça upload dos seus arquivos para começar a análise. Suportamos
            diversos formatos como CSV, Excel e JSON.
          </p>
        </header>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".csv,.xlsx,.xls,.json"
          onChange={(e) => handleFiles(e.target.files)}
        />

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
            handleFiles(e.dataTransfer.files);
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
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="mt-4"
            >
              <FileType className="mr-2 h-4 w-4" />
              Selecionar Arquivo
            </Button>
          </div>
        </div>

        {files.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-4">
              Arquivos Selecionados
            </h3>
            <div className="space-y-3">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900"
                >
                  <div className="flex items-center space-x-4">
                    <FileType className="h-8 w-8 text-neutral-500" />
                    <div>
                      <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        {file.name}
                      </p>
                      {file.error && (
                        <p className="text-sm text-red-500">{file.error}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {file.uploadStatus === 'idle' && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => uploadFile(file)}
                      >
                        <FileUp className="h-4 w-4" />
                      </Button>
                    )}
                    {file.uploadStatus === 'uploading' && (
                      <Loader2 className="h-4 w-4 animate-spin text-neutral-500" />
                    )}
                    {file.uploadStatus === 'success' && (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    )}
                    {file.uploadStatus === 'error' && (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 