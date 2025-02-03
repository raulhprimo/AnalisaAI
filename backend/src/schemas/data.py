from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from enum import Enum

class FileType(str, Enum):
    CSV = "csv"
    EXCEL = "xlsx"
    JSON = "json"

class AnalysisType(str, Enum):
    DESCRIPTIVE = "descriptive"
    CORRELATION = "correlation"
    DISTRIBUTION = "distribution"
    TIMESERIES = "timeseries"

class DataAnalysisRequest(BaseModel):
    file_name: str
    analysis_type: AnalysisType
    columns: Optional[List[str]] = None
    parameters: Optional[Dict[str, Any]] = None

class DescriptiveStats(BaseModel):
    count: float
    mean: Optional[float] = None
    std: Optional[float] = None
    min: Optional[float] = None
    q1: Optional[float] = None
    median: Optional[float] = None
    q3: Optional[float] = None
    max: Optional[float] = None

class AnalysisResponse(BaseModel):
    file_name: str
    analysis_type: AnalysisType
    results: Dict[str, Any]
    visualization_url: Optional[str] = None
