from pydantic import BaseModel
from typing import List
from uuid import UUID

class TestCreate(BaseModel):
    preguntas: List[str]

class TestOut(BaseModel):
    id: UUID
    preguntas: List[str]

    class Config:
        orm_mode = True
