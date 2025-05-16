from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from uuid import UUID

from app.database import get_db
from app.models.TemaForo import TemaForo
from app.models.ComentarioForo import ComentarioForo
from app.schemas.TemaForo import TemaForoCreate, TemaForoOut
from app.utils.auth_utils import get_current_user_email

router = APIRouter(prefix="/foro/temas", tags=["Foro - Temas"])

@router.post("/", response_model=TemaForoOut)
def crear_tema(
    tema: TemaForoCreate,
    db: Session = Depends(get_db),
    user_email: str = Depends(get_current_user_email)
):
    nuevo = TemaForo(
        titulo=tema.titulo,
        contenido=tema.contenido,
        tags=tema.tags,
        autor=user_email
    )
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return TemaForoOut(**nuevo.__dict__, num_comentarios=0)

@router.get("/", response_model=list[TemaForoOut])
def listar_temas(
    tag: str = Query(None),
    autor: str = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(TemaForo, func.count(ComentarioForo.id).label("num_comentarios"))\
              .outerjoin(ComentarioForo, ComentarioForo.tema_id == TemaForo.id)\
              .group_by(TemaForo.id)

    if tag:
        query = query.filter(func.array_to_string(TemaForo.tags, ',').ilike(f"%{tag}%"))

    if autor:
        query = query.filter(TemaForo.autor.ilike(f"%{autor}%"))

    temas = query.order_by(TemaForo.votos.desc()).all()
    return [TemaForoOut(**tema.__dict__, num_comentarios=num) for tema, num in temas]

@router.patch("/{id}/votar")
def votar_tema(id: UUID, delta: int, db: Session = Depends(get_db)):
    tema = db.query(TemaForo).filter_by(id=id).first()
    if not tema:
        raise HTTPException(status_code=404, detail="Tema no encontrado")
    tema.votos += delta
    db.commit()
    return {"mensaje": "Voto registrado", "votos": tema.votos}
