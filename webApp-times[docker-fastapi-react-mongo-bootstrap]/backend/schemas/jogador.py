def jogadorEntidade(db_item) -> dict:
    return {
        "jogador_id": str(db_item['_id']),   
        "jogador_nome": db_item['jogador_nome'], 
        "jogador_idade": db_item['jogador_idade'], 
        "jogador_time": db_item['jogador_time'] 
    }


def listaJogadoresEntidade(db_item_lista) -> list:
    return [jogadorEntidade(item) for item in db_item_lista] 
