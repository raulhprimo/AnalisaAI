import os
from openai import OpenAI
import logging
from typing import Optional
from dotenv import load_dotenv

logger = logging.getLogger(__name__)

# Carrega as variáveis de ambiente do arquivo .env
load_dotenv()

class ChatService:
    def __init__(self, contract_service=None):
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise ValueError("OPENAI_API_KEY não encontrada nas variáveis de ambiente")
            
        self.client = OpenAI(api_key=api_key)
        self.contract_service = contract_service
        self.system_prompt = """Você é um assistente especializado em análise de contratos.
        Use as informações fornecidas sobre os contratos para responder às perguntas do usuário de forma clara e objetiva.
        Sempre baseie suas respostas nos dados concretos das análises."""

    def get_analysis_context(self) -> str:
        try:
            status_data = self.contract_service.get_status_analysis()
            modalidade_data = self.contract_service.get_modalidade_analysis()
            temporal_data = self.contract_service.get_temporal_analysis()
            responsavel_data = self.contract_service.get_responsavel_analysis()

            context = f"""
            Aqui estão os dados atuais dos contratos:

            Status dos Contratos:
            {status_data['data']}

            Modalidades:
            {modalidade_data['data']}

            Evolução Temporal:
            {temporal_data['data']}

            Responsáveis:
            {responsavel_data['data']}
            """
            return context
        except Exception as e:
            logger.error(f"Erro ao obter contexto das análises: {str(e)}")
            return "Não foi possível obter os dados das análises."

    def process_message(self, message: str) -> Optional[str]:
        try:
            context = self.get_analysis_context()
            
            response = self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": self.system_prompt},
                    {"role": "system", "content": f"Dados das análises:\n{context}"},
                    {"role": "user", "content": message}
                ],
                temperature=0.7,
                max_tokens=1000
            )
            
            return response.choices[0].message.content
        except Exception as e:
            logger.error(f"Erro ao processar mensagem no chat: {str(e)}")
            return None 