import pandas as pd
import numpy as np
from typing import Dict, Any, List, Optional
import matplotlib.pyplot as plt
import seaborn as sns
from io import BytesIO
import base64

from src.schemas.data import AnalysisType, DescriptiveStats

class DataAnalysisService:
    def __init__(self):
        self.data: Optional[pd.DataFrame] = None
        
    def load_data(self, file_path: str) -> None:
        """Carrega dados de diferentes formatos"""
        if file_path.endswith('.csv'):
            self.data = pd.read_csv(file_path)
        elif file_path.endswith('.xlsx'):
            self.data = pd.read_excel(file_path)
        elif file_path.endswith('.json'):
            self.data = pd.read_json(file_path)
        else:
            raise ValueError("Formato de arquivo não suportado")

    def get_descriptive_stats(self, columns: Optional[List[str]] = None) -> Dict[str, DescriptiveStats]:
        """Calcula estatísticas descritivas das colunas numéricas"""
        if self.data is None:
            raise ValueError("Dados não carregados")

        if columns:
            numeric_cols = [col for col in columns if col in self.data.select_dtypes(include=[np.number]).columns]
        else:
            numeric_cols = self.data.select_dtypes(include=[np.number]).columns

        stats = {}
        for col in numeric_cols:
            desc = self.data[col].describe()
            stats[col] = DescriptiveStats(
                count=desc['count'],
                mean=desc['mean'],
                std=desc['std'],
                min=desc['min'],
                q1=desc['25%'],
                median=desc['50%'],
                q3=desc['75%'],
                max=desc['max']
            )
        return stats

    def get_correlation_analysis(self, columns: Optional[List[str]] = None) -> Dict[str, Any]:
        """Calcula matriz de correlação"""
        if self.data is None:
            raise ValueError("Dados não carregados")

        if columns:
            numeric_cols = [col for col in columns if col in self.data.select_dtypes(include=[np.number]).columns]
        else:
            numeric_cols = self.data.select_dtypes(include=[np.number]).columns

        corr_matrix = self.data[numeric_cols].corr()
        
        # Gera visualização
        plt.figure(figsize=(10, 8))
        sns.heatmap(corr_matrix, annot=True, cmap='coolwarm', center=0)
        plt.title('Matriz de Correlação')
        
        # Converte plot para base64
        buffer = BytesIO()
        plt.savefig(buffer, format='png', bbox_inches='tight')
        plt.close()
        buffer.seek(0)
        image_base64 = base64.b64encode(buffer.getvalue()).decode()

        return {
            "correlation_matrix": corr_matrix.to_dict(),
            "visualization": f"data:image/png;base64,{image_base64}"
        }

    def get_distribution_analysis(self, columns: Optional[List[str]] = None) -> Dict[str, Any]:
        """Analisa a distribuição das colunas"""
        if self.data is None:
            raise ValueError("Dados não carregados")

        if columns:
            numeric_cols = [col for col in columns if col in self.data.select_dtypes(include=[np.number]).columns]
        else:
            numeric_cols = self.data.select_dtypes(include=[np.number]).columns[:5]  # Limita a 5 colunas

        # Gera visualização
        fig, axes = plt.subplots(len(numeric_cols), 2, figsize=(15, 5*len(numeric_cols)))
        fig.suptitle('Análise de Distribuição')

        results = {}
        for i, col in enumerate(numeric_cols):
            # Histograma
            sns.histplot(data=self.data, x=col, ax=axes[i, 0])
            axes[i, 0].set_title(f'Histograma - {col}')
            
            # Box plot
            sns.boxplot(data=self.data, y=col, ax=axes[i, 1])
            axes[i, 1].set_title(f'Box Plot - {col}')

            # Estatísticas
            results[col] = {
                "skewness": float(self.data[col].skew()),
                "kurtosis": float(self.data[col].kurtosis()),
                "outliers_count": len(self.data[self.data[col].abs() > self.data[col].std() * 3])
            }

        # Converte plot para base64
        buffer = BytesIO()
        plt.savefig(buffer, format='png', bbox_inches='tight')
        plt.close()
        buffer.seek(0)
        image_base64 = base64.b64encode(buffer.getvalue()).decode()

        return {
            "statistics": results,
            "visualization": f"data:image/png;base64,{image_base64}"
        }

    def analyze(self, analysis_type: AnalysisType, columns: Optional[List[str]] = None) -> Dict[str, Any]:
        """Ponto de entrada principal para análises"""
        if analysis_type == AnalysisType.DESCRIPTIVE:
            return {"stats": self.get_descriptive_stats(columns)}
        elif analysis_type == AnalysisType.CORRELATION:
            return self.get_correlation_analysis(columns)
        elif analysis_type == AnalysisType.DISTRIBUTION:
            return self.get_distribution_analysis(columns)
        elif analysis_type == AnalysisType.TIMESERIES:
            raise NotImplementedError("Análise de séries temporais ainda não implementada")
        else:
            raise ValueError("Tipo de análise não suportado")
