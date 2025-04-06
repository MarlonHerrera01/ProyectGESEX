from fastapi import FastAPI
from app.routers import Usuario, Administrador, Test, Respuestas

app = FastAPI()

app.include_router(Usuario.router)
app.include_router(Administrador.router)
app.include_router(Test.router)
app.include_router(Respuestas.router)