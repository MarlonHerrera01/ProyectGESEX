from pydantic import BaseModel
from typing import List
from uuid import UUID

class RespuestaCreate(BaseModel):
    test_id: UUID
    usuario_id: UUID
    respuestas: List[str]

class RespuestaOut(RespuestaCreate):
    id: UUID

    class Config:
        orm_mode = True
