
import { useState } from 'react'
import './App.css'
import Ordem from './components/ordem'

const ordem = [
  {
    idOrdem: crypto.randomUUID(),
    dsCliente: 'angelo hank',
    dsServico: 'troca de freio',
    nuValor: 85,
    fgConcluida: true
  },

  {
    idOrdem: crypto.randomUUID(),
    dsCliente: 'jackson',
    dsServico: 'conserto de pneu',
    nuValor: 30,
    fgConcluida: false
  },

  {
    idOrdem: crypto.randomUUID(),
    dsCliente: 'edri',
    dsServico: 'troca o farol',
    nuValor: 50,
    fgConcluida: false
  }
]

function App() {
  const [ordemServico, setOrdemServico] = useState(ordem)
  const [dsCliente, setDsCliente] = useState("")
  const [dsServico, setDsServico] = useState("")
  const [nuValor, setNuValor] = useState("")
  const [erro, setErro] = useState("")

  const cadastrarOrdem = (e) => {
    e.preventDefault()

    if (!dsCliente || !dsServico || nuValor === ""
    ) {
      setErro("preencha todos os campos")
      return
    }

    const valor = Number(nuValor)

    if (!Number.isFinite(valor) || valor < 0) {
      setErro("digite um valor valido")
      return
    }


    const novaOrdem = {
      idOrdem: crypto.randomUUID(),
      dsCliente: dsCliente.trim(),
      dsServico: dsServico.trim(),
      nuValor: valor,
      fgConcluida: false
    }

    setOrdemServico([...ordemServico, novaOrdem])
    setDsCliente(""),setDsServico(""),setNuValor("")
    setErro("")
  }

  const concluirOrdem = (idOrdem) => {
    setOrdemServico(
      ordemServico.map((ordem) =>
        ordem.idOrdem === idOrdem
          ? { ...ordem, fgConcluida: !ordem.fgConcluida }
          : ordem
      )
    )
  }

  const removerOrdem = (idOrdem) => {
    setOrdemServico(
      ordemServico.filter((ordem) => ordem.idOrdem !== idOrdem)
    )
  }

  const ordensAbertas = ordemServico.filter(
    (ordem) => !ordem.fgConcluida
  )

  const valorAberto = ordensAbertas.reduce(
    (total, ordem) => total + ordem.nuValor,
    0
  )

  return (
    <div className="App">
      <h1>ordem de servico</h1>

      <form onSubmit={cadastrarOrdem}>
        <input
          type="text"
          name="dsCliente"
          placeholder="cliente"
          value={dsCliente}
          onChange={(e) => setDsCliente(e.target.value)}
        />

        <input
          type="text"
          name="dsServico"
          placeholder="serviço"
          value={dsServico}
          onChange={(e) => setDsServico(e.target.value)}
        />

        <input
          type="number"
          name="nuValor"
          placeholder="valor"
          min="0"
          step="any"
          value={nuValor}
          onChange={(e) => setNuValor(e.target.value)}
        />

        <button type="submit">cadastrar</button>
      </form>

      {erro && <p className="erro">{erro}</p>}

      <div className="resumo">
        <p>total de ordens: {ordemServico.length}</p>
        <p>ordens em aberto: {ordensAbertas.length}</p>
        <p>
          valor em aberto: R$ {valorAberto}
        </p>
      </div>

      {ordemServico.length === 0 ? (
        <p>nenhuma ordem cadastrada.</p>
      ) : (
        <div className="lista">
          {ordemServico.map((ordem) => (
            <Ordem
              key={ordem.idOrdem}
              ordem={ordem}
              concluirOrdem={concluirOrdem}
              removerOrdem={removerOrdem}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
