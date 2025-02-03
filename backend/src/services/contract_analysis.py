import pandas as pd
import numpy as np
from datetime import datetime
import logging
import os

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ContractAnalysisService:
    def __init__(self):
        self.df = None
        # Carrega o arquivo automaticamente ao inicializar o serviço
        try:
            file_path = os.path.join("uploads", "Contratos.xlsx")
            self.load_data(file_path)
            logger.info("Arquivo carregado automaticamente na inicialização do serviço")
        except Exception as e:
            logger.error(f"Erro ao carregar arquivo na inicialização: {str(e)}")

    def load_data(self, file_path: str) -> None:
        """Carrega e prepara os dados dos contratos"""
        try:
            logger.info(f"Iniciando carregamento do arquivo: {file_path}")
            
            if not os.path.exists(file_path):
                logger.error(f"Arquivo não encontrado: {file_path}")
                raise ValueError(f"Arquivo não encontrado: {file_path}")
            
            # Tenta ler o arquivo Excel
            logger.info("Lendo arquivo Excel...")
            self.df = pd.read_excel(file_path)
            logger.info(f"Arquivo carregado com sucesso. Shape: {self.df.shape}")
            logger.info(f"Colunas encontradas: {self.df.columns.tolist()}")
            
            # Verifica se as colunas necessárias existem
            required_columns = ['status', 'modalidade', 'data_cadastro', 'data_encerramento']
            missing_columns = [col for col in required_columns if col not in self.df.columns]
            if missing_columns:
                logger.error(f"Colunas obrigatórias ausentes: {missing_columns}")
                raise ValueError(f"Colunas obrigatórias ausentes: {missing_columns}")
            
            logger.info("Iniciando conversão de datas...")
            # Converte datas
            try:
                self.df['data_cadastro'] = pd.to_datetime(self.df['data_cadastro'], format='%d/%m/%Y', errors='coerce')
                self.df['data_encerramento'] = pd.to_datetime(self.df['data_encerramento'], format='%d/%m/%Y', errors='coerce')
                logger.info("Datas convertidas com sucesso")
            except Exception as e:
                logger.error(f"Erro ao converter datas: {str(e)}")
                raise ValueError("Erro ao converter datas. Verifique o formato (deve ser dd/mm/aaaa)")

            # Verifica valores únicos em colunas importantes
            logger.info("Verificando valores únicos nas colunas...")
            logger.info(f"Valores únicos em 'status': {self.df['status'].unique()}")
            logger.info(f"Valores únicos em 'modalidade': {self.df['modalidade'].unique()}")
            logger.info("Carregamento dos dados concluído com sucesso")

        except Exception as e:
            logger.error(f"Erro ao carregar dados: {str(e)}")
            raise ValueError(f"Erro ao carregar dados: {str(e)}")

    def get_status_analysis(self) -> dict:
        """Análise de status dos contratos"""
        if self.df is None:
            raise ValueError("Dados não carregados")

        status_counts = self.df['status'].map({'A': 'Ativo', 'E': 'Encerrado'}).value_counts()
        
        return {
            "data": [
                {"name": status, "value": int(count)}
                for status, count in status_counts.items()
            ]
        }

    def get_modalidade_analysis(self) -> dict:
        """Análise de modalidades de contrato"""
        if self.df is None:
            raise ValueError("Dados não carregados")

        modalidade_counts = self.df['modalidade'].value_counts()
        
        return {
            "data": [
                {"name": str(modalidade), "value": int(count)}
                for modalidade, count in modalidade_counts.items()
            ]
        }

    def get_temporal_analysis(self) -> dict:
        """Análise temporal dos contratos"""
        if self.df is None:
            raise ValueError("Dados não carregados")

        temporal_data = (
            self.df.groupby(self.df['data_cadastro'].dt.to_period('M'))
            .size()
            .reset_index()
        )
        temporal_data.columns = ['data', 'quantidade']
        
        return {
            "data": [
                {
                    "date": data.strftime("%Y-%m"),
                    "quantidade": int(quantidade)
                }
                for data, quantidade in zip(temporal_data['data'], temporal_data['quantidade'])
            ]
        }

    def get_responsavel_analysis(self) -> dict:
        """Análise de responsáveis por contratos"""
        if self.df is None:
            raise ValueError("Dados não carregados")

        resp_counts = (
            self.df.groupby('responsavel')
            .size()
            .sort_values(ascending=False)
            .head(10)
        )
        
        return {
            "data": [
                {"name": str(resp), "value": int(count)}
                for resp, count in resp_counts.items()
            ]
        } 