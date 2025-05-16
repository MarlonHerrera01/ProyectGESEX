from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID

from app.database import get_db
from app.models.ComentarioForo import ComentarioForo
from app.schemas.ComentarioForo import ComentarioForoCreate, ComentarioForoOut
from app.utils.auth_utils import get_current_user_email

router = APIRouter(prefix="/foro/comentarios", tags=["Foro - Comentarios"])

@router.post("/", response_model=ComentarioForoOut)
def agregar_comentario(
    comentario: ComentarioForoCreate,
    db: Session = Depends(get_db),
    user_email: str = Depends(get_current_user_email)
):
    nuevo = ComentarioForo(
        tema_id=comentario.tema_id,
        contenido=comentario.contenido,
        autor=user_email
    )
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

@router.get("/tema/{tema_id}", response_model=list[ComentarioForoOut])
def listar_comentarios_tema(tema_id: UUID, db: Session = Depends(get_db)):
    return db.query(ComentarioForo)\
             .filter_by(tema_id=tema_id)\
             .order_by(ComentarioForo.fecha)\
             .all()
