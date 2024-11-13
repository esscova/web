from pydantic import BaseModel
from typing import Optional

class Jogador(BaseModel):
    jogador_id: Optional[str] 
    jogador_nome: str
    jogador_idade: int
    jogador_time: str

    class Config:
        from_atrributes = True
        
