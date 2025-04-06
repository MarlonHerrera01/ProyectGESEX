from pydantic import BaseModel

class AdministradorBase(BaseModel):
    usuario_id: int
    cargo: str

class AdministradorCreate(AdministradorBase):
    pass

class AdministradorOut(AdministradorBase):
    id: int

    model_config = {
        "from_attributes": True
    }