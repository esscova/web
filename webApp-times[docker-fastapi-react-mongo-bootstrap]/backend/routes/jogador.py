from fastapi import APIRouter
from core.database import conexao
from models.jogador import Jogador
from schemas.jogador import jogadorEntidade, listaJogadoresEntidade
from typing import List
from bson import ObjectId

router = APIRouter()

@router.get('/')
async def inicio():
    return{'calma':'poha'}

# lista jogadores 
@router.get('/jogadores', response_model=List[Jogador])
async def lista_jogadores():
    return listaJogadoresEntidade(conexao.local.jogador.find())
    

# lista jogador
@router.get('/jogadores/{jogador_id}')
async def busca_jogador(jogador_id:str):
    return jogadorEntidade(
        conexao.local.jogador.find_one(
            {'_id':ObjectId(jogador_id)}
        )
    )

# cadastra jogador
@router.post('/jogadores', response_model=List[Jogador])
async def cadastra_jogadores(jogador: Jogador):
    conexao.local.jogador.insert_one(dict(jogador))
    return listaJogadoresEntidade(conexao.local.jogador.find())

# atualiza jogador
@router.put('/jogadores/{jogador_id}')
async def atualiza_jogador(jogador_id:str, jogador:Jogador):
    conexao.local.jogador.find_one_and_update(
        {'_id':ObjectId(jogador_id)},
        {'$set': dict(jogador)}
    )
    return jogadorEntidade(
        conexao.local.jogador.find_one({'_id':ObjectId(jogador_id)})
    )

# exclui jogador
@router.delete('/jogadores/{jogador_id}')
async def exclui_jogador(jogador_id:str):
    return jogadorEntidade(
        conexao.local.jogador.find_one_and_delete(
            {'_id':ObjectId(jogador_id)}
        )
    )