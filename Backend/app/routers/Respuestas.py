from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
from datetime import datetime

from app.database import SessionLocal
from app.models.Respuestas import Respuesta
from app.models.Usuario import Usuario
from app.schemas.Respuestas import RespuestaCreate, RespuestaOut
from app.models.Segmentacion import Segmentacion

router = APIRouter(prefix="/Respuestas", tags=["Respuestas"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=RespuestaOut)
def enviar_respuesta(respuesta: RespuestaCreate, db: Session = Depends(get_db)):
    nueva = Respuesta(
        usuario_id=respuesta.usuario_id,
        test_id=respuesta.test_id,
        respuestas=respuesta.respuestas,
        fecha=datetime.utcnow()
    )

    db.add(nueva)
    db.commit()
    db.refresh(nueva)

    # Calcular categoría a partir de las respuestas
    categoria = Segmentacion.calcular_categoria(nueva)

    # Actualizar la categoría del usuario
    usuario = db.query(Usuario).filter_by(id=respuesta.usuario_id).first()
    if usuario:
        usuario.categoria = categoria
        db.commit()

    return nueva

@router.get("/", response_model=list[RespuestaOut])
def listar_respuestas(db: Session = Depends(get_db)):
    return db.query(Respuesta).all()

@router.get("/usuario/{usuario_id}", response_model=list[RespuestaOut])
def obtener_respuestas_por_usuario(usuario_id: UUID, db: Session = Depends(get_db)):
    respuestas = db.query(Respuesta).filter(Respuesta.usuario_id == usuario_id).all()
    if not respuestas:
        raise HTTPException(status_code=404, detail="No se encontraron respuestas para este usuario")
    return respuestas

