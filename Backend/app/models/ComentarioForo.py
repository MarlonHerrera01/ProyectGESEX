from sqlalchemy import Column, String, DateTime, Text, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime
from app.database import Base

class ComentarioForo(Base):
    __tablename__ = "comentarios_foro"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    tema_id = Column(UUID(as_uuid=True), ForeignKey("temas_foro.id"), nullable=False)
    autor = Column(String, nullable=False)
    contenido = Column(Text, nullable=False)
    fecha = Column(DateTime, default=datetime.utcnow)

    tema = relationship("TemaForo", back_populates="comentarios")
