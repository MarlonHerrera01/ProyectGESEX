from pydantic import BaseModel
from uuid import UUID
from datetime import datetime

class ComentarioForoCreate(BaseModel):
    tema_id: UUID
    contenido: str

class ComentarioForoOut(ComentarioForoCreate):
    id: UUID
    autor: str
    fecha: datetime

    class Config:
        orm_mode = True
