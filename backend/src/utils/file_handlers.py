import pandas as pd
import numpy as np
from pathlib import Path

def analyze_excel_file(file_path: str) -> dict:
    """Analisa o arquivo Excel e retorna informações básicas sobre sua estrutura"""
    df = pd.read_excel(file_path)
    
    info = {
        "total_rows": len(df),
        "total_columns": len(df.columns),
        "columns": list(df.columns),
        "dtypes": df.dtypes.astype(str).to_dict(),
        "sample_data": df.head().to_dict('records'),
        "missing_values": df.isnull().sum().to_dict()
    }
    
    return info

if __name__ == "__main__":
    # Caminho relativo ao arquivo
    file_path = Path(__file__).parent.parent.parent / "uploads" / "Contratos.xlsx"
    info = analyze_excel_file(str(file_path))
    print("\nInformações do arquivo:")
    print(f"Total de linhas: {info['total_rows']}")
    print(f"Total de colunas: {info['total_columns']}")
    print("\nColunas disponíveis:")
    for col in info['columns']:
        print(f"- {col} ({info['dtypes'][col]})")
    print("\nPrimeiras linhas:")
    for row in info['sample_data']:
        print(row)
