from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import List, Optional
from pydantic import BaseModel
import os
from tempfile import NamedTemporaryFile
import logging

from src.schemas.data import DataAnalysisRequest, AnalysisResponse, AnalysisType
from src.services.analysis import DataAnalysisService
from src.services.contract_analysis import ContractAnalysisService
from src.services.chat_service import ChatService

logger = logging.getLogger(__name__)

router = APIRouter()
analysis_service = DataAnalysisService()
contract_service = ContractAnalysisService()
chat_service = ChatService(contract_service=contract_service)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

class ChatMessage(BaseModel):
    message: str

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """Upload de arquivo para análise"""
    try:
        if not file.filename:
            logger.error("Arquivo não fornecido")
            raise HTTPException(status_code=400, detail="Arquivo não fornecido")
        
        logger.info(f"Recebendo arquivo: {file.filename}")
        logger.info(f"Tipo do arquivo: {file.content_type}")
        
        # Lê o conteúdo do arquivo
        content = await file.read()
        file_size = len(content)
        logger.info(f"Tamanho do arquivo: {file_size} bytes")
        
        # Verifica se o arquivo está vazio
        if file_size == 0:
            logger.error("Arquivo vazio recebido")
            raise HTTPException(status_code=400, detail="Arquivo vazio")
        
        # Reseta o cursor do arquivo para o início
        await file.seek(0)
        
        # Verifica extensão
        ext = file.filename.split('.')[-1].lower()
        logger.info(f"Extensão do arquivo: {ext}")
        
        if ext not in ['csv', 'xlsx', 'xls', 'json']:
            logger.error(f"Formato não suportado: {ext}")
            raise HTTPException(status_code=400, detail="Formato de arquivo não suportado")
        
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        logger.info(f"Salvando arquivo em: {file_path}")
        
        try:
            # Salva o arquivo
            with open(file_path, "wb") as buffer:
                buffer.write(content)
            logger.info("Arquivo salvo com sucesso")
            
            # Carrega dados no serviço
            logger.info("Iniciando carregamento dos dados no serviço")
            contract_service.load_data(file_path)
            logger.info("Dados carregados com sucesso")
            
            return {
                "message": "Arquivo carregado com sucesso",
                "filename": file.filename,
                "size": file_size,
                "type": file.content_type
            }
        except Exception as e:
            logger.error(f"Erro ao processar arquivo: {str(e)}")
            if os.path.exists(file_path):
                os.unlink(file_path)
            raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Erro no upload: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_data(request: DataAnalysisRequest):
    """Realiza análise nos dados carregados"""
    try:
        results = analysis_service.analyze(
            analysis_type=request.analysis_type,
            columns=request.columns
        )
        
        return AnalysisResponse(
            file_name=request.file_name,
            analysis_type=request.analysis_type,
            results=results,
            visualization_url=results.get("visualization")
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/contracts/status")
async def get_contract_status():
    """Análise de status dos contratos"""
    try:
        logger.info("Iniciando análise de status dos contratos")
        return contract_service.get_status_analysis()
    except Exception as e:
        logger.error(f"Erro na análise de status: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/contracts/modalidade")
async def get_contract_modalidade():
    """Análise de modalidades dos contratos"""
    try:
        logger.info("Iniciando análise de modalidades")
        return contract_service.get_modalidade_analysis()
    except Exception as e:
        logger.error(f"Erro na análise de modalidades: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/contracts/temporal")
async def get_contract_temporal():
    """Análise temporal dos contratos"""
    try:
        logger.info("Iniciando análise temporal")
        return contract_service.get_temporal_analysis()
    except Exception as e:
        logger.error(f"Erro na análise temporal: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/contracts/responsavel")
async def get_contract_responsavel():
    """Análise por responsável"""
    try:
        logger.info("Iniciando análise por responsável")
        return contract_service.get_responsavel_analysis()
    except Exception as e:
        logger.error(f"Erro na análise por responsável: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/test")
async def test_connection():
    """Rota de teste para verificar se o backend está funcionando"""
    logger.info("Teste de conexão realizado com sucesso")
    return {"status": "ok", "message": "Backend está funcionando"}

@router.post("/chat")
async def chat(message: ChatMessage):
    """Processa uma mensagem do chat usando IA"""
    try:
        logger.info(f"Processando mensagem do chat: {message.message}")
        response = chat_service.process_message(message.message)
        
        if response is None:
            raise HTTPException(status_code=500, detail="Erro ao processar mensagem")
        
        return {"response": response}
    except Exception as e:
        logger.error(f"Erro no chat: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
