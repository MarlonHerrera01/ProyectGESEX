from fastapi import FastAPI
from app.routers import Usuario, Administrador, Test, Respuestas , Estadisticas , TestEstadistica , Segmentacion

app = FastAPI()

app.include_router(Usuario.router)
app.include_router(Administrador.router)
app.include_router(Test.router)
app.include_router(Respuestas.router)
app.include_router(Estadisticas.router)
app.include_router(TestEstadistica.router)
app.include_router(Segmentacion.router)
