from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
from datetime import datetime, date

from app.database import SessionLocal
from app.models.Respuestas import Respuesta
from app.models.Usuario import Usuario
from app.models.Segmentacion import Segmentacion
from app.schemas.Respuestas import RespuestaCreate, RespuestaOut

router = APIRouter(prefix="/Respuestas", tags=["Respuestas"])

# Dependencia para obtener la DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# POST para recibir y guardar respuestas
@router.post("/", response_model=RespuestaOut)
def enviar_respuesta(respuesta: RespuestaCreate, db: Session = Depends(get_db)):
    nueva = Respuesta(
        test_id=respuesta.test_id,
        usuario_id=respuesta.usuario_id,
        respuestas=[r.dict() for r in respuesta.respuestas],
        caracterizacion_datos=respuesta.caracterizacion_datos,
        fecha=respuesta.fecha
    )

    db.add(nueva)
    db.commit()
    db.refresh(nueva)

    # Calcular categoría basada en las respuestas
    #categoria = Segmentacion.calcular_categoria(nueva)

    # Actualizar la categoría del usuario
    #usuario = db.query(Usuario).filter_by(id=respuesta.usuario_id).first()
    #if usuario:
    #    usuario.categoria = categoria
    #    db.commit()

    return nueva

# GET general para ver todas las respuestas
@router.get("/", response_model=list[RespuestaOut])
def listar_respuestas(db: Session = Depends(get_db)):
    return db.query(Respuesta).all()

# GET para obtener respuestas por usuario
@router.get("/usuario/{usuario_id}", response_model=list[RespuestaOut])
def obtener_respuestas_por_usuario(usuario_id: UUID, db: Session = Depends(get_db)):
    respuestas = db.query(Respuesta).filter(Respuesta.usuario_id == usuario_id).all()
    if not respuestas:
        raise HTTPException(status_code=404, detail="No se encontraron respuestas para este usuario")
    return respuestas
