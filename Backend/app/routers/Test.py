from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.Test import Test
from app.schemas.Test import TestCreate, TestOut

router = APIRouter(prefix="/Tests", tags=["Tests"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=TestOut)
def crear_test(test: TestCreate, db: Session = Depends(get_db)):
    nuevo_test = Test(preguntas="|".join(test.preguntas))  # Se guarda como string
    db.add(nuevo_test)
    db.commit()
    db.refresh(nuevo_test)
    return nuevo_test

@router.get("/", response_model=list[TestOut])
def listar_tests(db: Session = Depends(get_db)):
    tests = db.query(Test).all()
    for t in tests:
        t.preguntas = t.preguntas.split("|")
    return tests
