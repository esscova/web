import React from "react";
import Jogador from "./Jogador";

function JogadorList(props) {
    if (!props.jogadorList || props.jogadorList.length === 0) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <ul>
                {props.jogadorList.map((jogador, indice) => {
                    return ( <Jogador 
                                jogador={jogador} 
                                key={indice} 
                                excluiJogador={props.excluiJogador}
                                setJogadorId={props.setJogadorId}
                                setJogadorNome={props.setJogadorNome}
                                setJogadorIdade={props.setJogadorIdade}
                                setJogadorTime={props.setJogadorTime}
                                setTextoBotao={props.setTextoBotao}
                            />)
                })}
            </ul>
        </div>
    );
}

export default JogadorList;
