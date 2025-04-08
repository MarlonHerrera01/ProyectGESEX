from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID

from app.database import SessionLocal
from app.models.Estadisticas import Estadisticas as EstadisticasModel
from app.schemas.Estadisticas import EstadisticasCreate , EstadisticasOut

router = APIRouter(prefix="/estadisticas", tags=["Estadísticas"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=EstadisticasOut)
def crear_estadistica(
    estadistica: EstadisticasCreate,
    db: Session = Depends(get_db)
):
    nueva = EstadisticasModel.Estadisticas(resumen=estadistica.resumen)
    db.add(nueva)
    db.commit()
    db.refresh(nueva)
    return nueva

@router.get("/{estadistica_id}", response_model=EstadisticasOut)
def obtener_estadistica(estadistica_id: UUID, db: Session = Depends(get_db)):
    est = db.query(EstadisticasModel.Estadisticas).filter_by(id=estadistica_id).first()
    if not est:
        raise HTTPException(status_code=404, detail="Estadística no encontrada")
    return est
