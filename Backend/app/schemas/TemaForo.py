from pydantic import BaseModel
from typing import List, Optional
from uuid import UUID
from datetime import datetime

class TemaForoCreate(BaseModel):
    titulo: str
    contenido: str
    tags: Optional[List[str]] = []

class TemaForoOut(TemaForoCreate):
    id: UUID
    autor: str
    fecha: datetime
    votos: int
    num_comentarios: int  # contador de comentarios

    class Config:
        orm_mode = True
