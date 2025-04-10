from pydantic import BaseModel
from typing import List
from datetime import date
from uuid import UUID

# Subschema para agrupar respuestas por dimensión
class RespuestaDimension(BaseModel):
    dimension: str
    respuestas: List[int]

# Esquema para crear una respuesta
class RespuestaCreate(BaseModel):
    usuario_id: UUID
    test_id: UUID
    respuestas: List[RespuestaDimension]
    edad: int
    genero: str
    nivel_educativo: str
    contexto_cultural: str
    fecha: date

# Esquema de salida (incluye el ID generado)
class RespuestaOut(RespuestaCreate):
    id: UUID

    class Config:
        orm_mode = True
