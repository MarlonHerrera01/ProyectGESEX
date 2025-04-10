from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID, JSONB
import uuid
from app.database import Base

class Test(Base):
    __tablename__ = "tests"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    titulo = Column(String, nullable=False)
    dimensiones = Column(JSONB, nullable=False)  # Estructura de dimensiones y preguntas en formato JSON

    def __repr__(self):
        return f"<Test id={self.id} titulo={self.titulo}>"
