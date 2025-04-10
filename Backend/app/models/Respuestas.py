from sqlalchemy import Column, ForeignKey, String, Date, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.mutable import MutableList
from sqlalchemy.types import JSON
from sqlalchemy.orm import relationship
import uuid
from app.database import Base

class Respuesta(Base):
    __tablename__ = "respuestas"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    test_id = Column(UUID(as_uuid=True), ForeignKey("tests.id"), nullable=False)
    usuario_id = Column(UUID(as_uuid=True), ForeignKey("usuarios.id"), nullable=False)
    respuestas = Column(MutableList.as_mutable(JSON), nullable=False)  # Lista de respuestas
    edad = Column(Integer, nullable=False)
    genero = Column(String, nullable=False)
    nivel_educativo = Column(String, nullable=False)
    contexto_cultural = Column(String, nullable=False)
    fecha = Column(Date, nullable=False)

    # Relaciones
    usuario = relationship("Usuario", back_populates="respuestas", lazy="joined")
    test = relationship("Test", back_populates="respuestas", lazy="joined")

    def __repr__(self):
        return f"<Respuesta id={self.id} usuario_id={self.usuario_id} test_id={self.test_id}>"
