import './Ordem.css'

function Ordem({ ordem, concluirOrdem, removerOrdem }) {
  return (
    <div className={ordem.fgConcluida ? "ordem concluida" : "ordem"}>
      <p>Cliente: {ordem.dsCliente}</p>
      <p>Serviço: {ordem.dsServico}</p>
      <p>Valor: R$ {ordem.nuValor}</p>

      {ordem.fgConcluida && <span>feita</span>}

      <div className="botoes">
        <button onClick={() => concluirOrdem(ordem.idOrdem)}>
          {ordem.fgConcluida ? 'desfazer' : 'Concluir'}
        </button>

        <button onClick={() => removerOrdem(ordem.idOrdem)}>
          Remover
        </button>
      </div>
    </div>
  )
}

export default Ordem