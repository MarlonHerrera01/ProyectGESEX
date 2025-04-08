from sqlalchemy import Column, ForeignKey, String, Date
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
    respuestas = Column(MutableList.as_mutable(JSON))  # Lista de respuestas
    fecha = Column(Date, nullable=False)
    
 # Relaciones (si se desea acceder desde Usuario o Test, se puede extender desde allí)
    usuario = relationship("Usuario", back_populates="respuestas", lazy="joined")
    test = relationship("Test", back_populates="respuestas", lazy="joined")