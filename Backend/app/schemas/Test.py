from pydantic import BaseModel
from typing import List
from uuid import UUID
from typing import Optional

class Dimension(BaseModel):
    nombre: str
    preguntas: List[str]

class CaracterizacionTemplate(BaseModel):
    tipo_participante: str
    campos_requeridos: List[str]

class TestCreate(BaseModel):
    titulo: str
    dimensiones: List[Dimension]
    caracterizacion_template: CaracterizacionTemplate  # nuevo campo

class TestOut(BaseModel):
    id: UUID
    titulo: str
    dimensiones: List[Dimension]
    caracterizacion_template: CaracterizacionTemplate  # nuevo campo

    class Config:
        orm_mode = True
