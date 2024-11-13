
import { useState, useEffect, useCallback } from 'react'
import './App.css'
import axios from 'axios'
import JogadorList from './components/JogadorList';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function App() {
  const[jogadorList, setJogadorList] = useState([]);
  const[jogadorNome, setJogadorNome] = useState('');
  const[jogadorIdade, setJogadorIdade] = useState('');
  const[jogadorTime, setJogadorTime] = useState('');
  const[jogadorId, setJogadorId] = useState('');
  const [textoBotao, setTextoBotao] = useState('Cadastrar')

  const carregaJogadores = useCallback(() => {
    axios.get(`${API_URL}/jogadores`)
    .then(resposta => {
      console.log('dados da api:', resposta.data);
      setJogadorList(resposta.data);
    })
    .catch((error) => {
      console.log('erro ao carregar: ',error)
    });
  }, []);

  useEffect(() => {
    carregaJogadores()
  }, [carregaJogadores]);

  const adicionaJogador = () => {
    const jogador = {
      'jogador_id':'',
      'jogador_nome':jogadorNome,
      'jogador_idade':parseInt(jogadorIdade),
      'jogador_time':jogadorTime
    }
    axios.post(`${API_URL}/jogadores`, jogador)
    .then(resposta => {
      alert('jogador criado com sucesso');
      carregaJogadores();
      setJogadorNome('');
      setJogadorIdade('');
      setJogadorTime('');
    })
    .catch((error) => {
      console.log('erro ao cadastrar', error)
    })
  }

  const excluiJogador = (jogadorId) => {
    axios.delete(`${API_URL}/jogadores/${jogadorId}`)
    .then(resposta => {
      alert('Jogador removido com sucesso: ' + resposta.data);
      setJogadorList(jogadorList.filter(jogador => jogador.jogador_id !== jogadorId));
    })
    .catch((error) => {
      console.log('Erro ao excluir jogador', error);
    });
  }

  const atualizaJogador = (jogadorId, jogador) => {
    axios.put(`${API_URL}/jogadores/${jogadorId}`, jogador, {
      headers:{'Content-Type':'application/json'}
    })
    .then(resposta => {
      alert('Jogador atualizado com sucesso.')
      carregaJogadores(); 
      setJogadorId('');
      setJogadorNome('');
      setJogadorIdade('');
      setJogadorTime('');
      setTextoBotao('Cadastrar');
    })
    .catch((error) => {
      console.log('erro ao atualizar jogador', error);
      if (error.response){ 
        console.error('Dados da resposta de erro:', error.response.data);
        console.error('Status do erro:', error.response.status);
        console.error('Headers do erro:', error.response.headers);
      }
    })
  }

  const adicionaAtualizaJogador = () => {
    const jogador = {
    'jogador_id':jogadorId,
    'jogador_nome': jogadorNome,
    'jogador_idade': parseInt(jogadorIdade),
    'jogador_time': jogadorTime
    }

    if(jogadorId !== ''){
      atualizaJogador(jogadorId, jogador);
    } else {
      adicionaJogador(jogador)
    }
  }
  return (
    <>
      <div className='container'>
        <div 
          className='mt-3 justify-content-center align-items-center mx-auto'
          style={{'width':'70vw', 'backgroundcolor':'#ffffff'}}
        >
          <h2 className='text-center text-white bg-success card mb-1'>Gerenciamento de Jogadores</h2>
          <h6 className="card text-center text-white bg-success mb-2 pb-2">Informações do Jogador</h6>
          <div className="card-body text-center">
            <h5 className="card text-center text-white bg-dark pb-1">Cadastro do Jogador</h5>

            <span className="card-text">
              <input 
                type="text" 
                className="mb-2 form-control" 
                placeholder="Informe o nome" 
                onChange={ e => setJogadorNome(e.target.value) }
                value={jogadorNome}
              />
              <input 
                type="number" 
                className="mb-2 form-control" 
                placeholder="Informe a idade" 
                onChange={ e => setJogadorIdade(e.target.value) }
                value={jogadorIdade}
              />
              <input 
                type="text" 
                className="mb-2 form-control" 
                placeholder="Informe o time" 
                onChange={ e => setJogadorTime(e.target.value) }
                value={jogadorTime}
              />
              <button 
                className="btn btn-outline-success mb-4"
                onClick={adicionaAtualizaJogador}
              >
                {textoBotao}
              </button>
            </span>
          <h5 className='card text-center text-white bg-dark pb-1 mb-4'>Lista de Jogadores</h5>
          <div>
            <JogadorList 
              jogadorList={jogadorList} 
              excluiJogador={excluiJogador} 
              setJogadorId={setJogadorId}
              setJogadorNome={setJogadorNome}
              setJogadorIdade={setJogadorIdade}
              setJogadorTime={setJogadorTime}
              setTextoBotao={setTextoBotao}
            />
          </div>
          </div>
          <h6 className='card text-center text-light bg-success py-1'>&copy; WGN - 2024 </h6>
        </div>
      </div>
    </>
  )
}

export default App
