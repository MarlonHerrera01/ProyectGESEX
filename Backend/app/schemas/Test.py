from pydantic import BaseModel
from typing import List
from uuid import UUID

class Dimension(BaseModel):
    nombre: str
    preguntas: List[str]

class TestCreate(BaseModel):
    titulo: str
    dimensiones: List[Dimension]

class TestOut(BaseModel):
    id: UUID
    titulo: str
    dimensiones: List[Dimension]

    class Config:
        orm_mode = True
