from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.Respuestas import Respuesta
from app.schemas.Respuestas import RespuestaCreate, RespuestaOut

router = APIRouter(prefix="/Respuestas", tags=["Respuestas"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=RespuestaOut)
def enviar_respuesta(respuesta: RespuestaCreate, db: Session = Depends(get_db)):
    nueva = Respuesta(**respuesta.dict())
    db.add(nueva)
    db.commit()
    db.refresh(nueva)
    return nueva

@router.get("/", response_model=list[RespuestaOut])
def listar_respuestas(db: Session = Depends(get_db)):
    return db.query(Respuesta).all()
