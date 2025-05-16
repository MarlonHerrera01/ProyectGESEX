from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import (
    Usuario, Administrador, Test, Respuestas,
    Estadisticas, TestEstadistica, Segmentacion, Auth,
    TemaForo, ComentarioForo  # 👈 nuevos routers
)

app = FastAPI()

# CORS para permitir frontend local (React u otro)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rutas generales del sistema
app.include_router(Usuario.router)
app.include_router(Administrador.router)
app.include_router(Test.router)
app.include_router(Respuestas.router)
app.include_router(Estadisticas.router)
app.include_router(TestEstadistica.router)
app.include_router(Segmentacion.router)

# Autenticación
app.include_router(Auth.router, prefix="/api")

# Foro (nuevo)
app.include_router(TemaForo.router)
app.include_router(ComentarioForo.router)
