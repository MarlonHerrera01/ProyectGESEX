from sqlalchemy import Column, String, Integer, DateTime, Text
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from sqlalchemy.orm import relationship
from sqlalchemy import JSON
import uuid
from datetime import datetime
from app.database import Base

class TemaForo(Base):
    __tablename__ = "temas_foro"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    titulo = Column(String, nullable=False)
    autor = Column(String, nullable=False)
    contenido = Column(Text, nullable=False)
    tags = Column(JSON, nullable=True)
    fecha = Column(DateTime, default=datetime.utcnow)
    votos = Column(Integer, default=0)

    comentarios = relationship("ComentarioForo", back_populates="tema", cascade="all, delete-orphan")
