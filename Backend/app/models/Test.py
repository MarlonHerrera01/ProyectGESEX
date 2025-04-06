from sqlalchemy import Column, String, ForeignKey, Table
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from app.database import Base

class Test(Base):
    __tablename__ = "tests"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    preguntas = Column(String)  # Se puede guardar como JSON string

    # Las respuestas las gestionaremos en una tabla aparte, con relaciones

    def __repr__(self):
        return f"<Test id={self.id}>"
