# AnalisAI Backend

Backend da plataforma AnalisAI, construído com FastAPI e Python.

## 🚀 Começando

1. Crie um ambiente virtual:
```bash
python -m venv venv
```

2. Ative o ambiente virtual:
```bash
# No Windows:
.\venv\Scripts\activate

# No Linux/Mac:
source venv/bin/activate
```

3. Instale as dependências:
```bash
pip install -r requirements.txt
```

4. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

5. Inicie o servidor de desenvolvimento:
```bash
python src/main.py
```

## 📁 Estrutura do Projeto

```
backend/
├── src/
│   ├── api/            # Endpoints da API
│   ├── core/           # Configurações principais
│   ├── db/             # Configuração do banco de dados
│   ├── models/         # Modelos SQLAlchemy
│   ├── schemas/        # Schemas Pydantic
│   ├── services/       # Lógica de negócios
│   └── utils/          # Utilitários
├── tests/              # Testes
├── .env.example        # Template de variáveis de ambiente
├── requirements.txt    # Dependências do projeto
└── README.md          # Esta documentação
```

## 🛠️ Tecnologias

- FastAPI
- SQLAlchemy
- PostgreSQL
- Pandas
- NumPy
- Scikit-learn
- Python-dotenv
- Pytest

## 📚 Documentação da API

Após iniciar o servidor, acesse:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 🧪 Testes

Para executar os testes:
```bash
pytest
```

## 📝 Endpoints Principais

- `POST /api/upload`: Upload de arquivos
- `GET /api/data`: Listagem de dados
- `POST /api/analyze`: Análise de dados
- `GET /api/visualize`: Geração de visualizações
- `POST /api/export`: Exportação de dados 