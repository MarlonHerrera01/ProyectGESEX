from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.Test import Test
from app.schemas.Test import TestCreate, TestOut
import json
from uuid import UUID

router = APIRouter(prefix="/cuestionarios", tags=["Tests"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=TestOut)
def crear_test(test: TestCreate, db: Session = Depends(get_db)):
    nuevo_test = Test(
        preguntas=json.dumps({
            "titulo": test.titulo,
            "dimensiones": [dim.dict() for dim in test.dimensiones]
        })
    )
    db.add(nuevo_test)
    db.commit()
    db.refresh(nuevo_test)

    return TestOut(
        id=nuevo_test.id,
        titulo=test.titulo,
        dimensiones=test.dimensiones
    )

@router.get("/", response_model=list[TestOut])
def listar_tests(db: Session = Depends(get_db)):
    tests = db.query(Test).all()
    result = []
    for test in tests:
        data = json.loads(test.preguntas)
        result.append(TestOut(
            id=test.id,
            titulo=data["titulo"],
            dimensiones=data["dimensiones"]
        ))
    return result

@router.get("/{id}", response_model=TestOut)
def obtener_test(id: UUID, db: Session = Depends(get_db)):
    test = db.query(Test).filter(Test.id == id).first()
    if not test:
        raise HTTPException(status_code=404, detail="Test no encontrado")
    
    data = json.loads(test.preguntas)
    return TestOut(
        id=test.id,
        titulo=data["titulo"],
        dimensiones=data["dimensiones"]
    )

@router.put("/{id}", response_model=TestOut)
def actualizar_test(id: UUID, test_actualizado: TestCreate, db: Session = Depends(get_db)):
    test = db.query(Test).filter(Test.id == id).first()
    if not test:
        raise HTTPException(status_code=404, detail="Test no encontrado")
    
    test.preguntas = json.dumps({
        "titulo": test_actualizado.titulo,
        "dimensiones": [dim.dict() for dim in test_actualizado.dimensiones]
    })

    db.commit()
    db.refresh(test)

    return TestOut(
        id=test.id,
        titulo=test_actualizado.titulo,
        dimensiones=test_actualizado.dimensiones
    )

@router.delete("/{id}")
def eliminar_test(id: UUID, db: Session = Depends(get_db)):
    test = db.query(Test).filter(Test.id == id).first()
    if not test:
        raise HTTPException(status_code=404, detail="Test no encontrado")
    
    db.delete(test)
    db.commit()
    return {"mensaje": "Test eliminado correctamente"}
