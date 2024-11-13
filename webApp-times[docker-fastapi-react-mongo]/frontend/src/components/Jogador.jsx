import axios from "axios";

function Jogador(props) {
    const editaJogador = (jogador) => {
        props.setJogadorId(jogador.jogador_id);
        props.setJogadorNome(jogador.jogador_nome);
        props.setJogadorIdade(jogador.jogador_idade);
        props.setJogadorTime(jogador.jogador_time);
        props.setTextoBotao('Atualizar');
    }
    return (
        <div>
            <p>
                <span className="fw-bold">
                    {props.jogador.jogador_nome} - {props.jogador.jogador_idade} - {props.jogador.jogador_time}
                </span>
                <button className="btn btn-sm" onClick={() => editaJogador(props.jogador)}>
                    <span className="badge rounded-pill bg-info">Editar</span>
                </button>
                <button 
                    className="btn btn-sm"
                    onClick={() => props.excluiJogador(props.jogador.jogador_id)}
                >
                    <span className="badge rounded-pill bg-danger">X</span>
                </button>
            </p>
        </div>
    );
}

export default Jogador;
