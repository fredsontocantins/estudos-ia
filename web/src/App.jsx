import { useEffect, useMemo, useState } from 'react'

import Filtros from './components/Filtros'
import Form from './components/Form'
import Tabela from './components/Tabela'
import { api } from './services/api'

function App() {
  const [dados, setDados] = useState([])
  const [filtroStatus, setFiltroStatus] = useState('')
  const [buscaCliente, setBuscaCliente] = useState('')

  async function carregarDados() {
    const response = await api.get('/homologacoes')
    setDados(response.data)
  }

  useEffect(() => {
    carregarDados()
  }, [])

  const dadosFiltrados = useMemo(() => {
    return dados
      .filter((item) => !filtroStatus || item.status === filtroStatus)
      .filter((item) => item.cliente?.toLowerCase().includes(buscaCliente.toLowerCase()))
  }, [dados, filtroStatus, buscaCliente])

  const resumo = useMemo(
    () => ({
      total: dados.length,
      homologados: dados.filter((item) => item.status === 'Homologado').length,
      andamento: dados.filter((item) => item.status === 'Em andamento').length,
    }),
    [dados],
  )

  return (
    <main className="container">
      <header>
        <h1>Controle de Homologação</h1>
        <p>Painel operacional com filtros, edição inline e visão consolidada do time.</p>
      </header>

      <section className="summary-grid">
        <article className="summary-card">
          <span>Total</span>
          <strong>{resumo.total}</strong>
        </article>
        <article className="summary-card">
          <span>Homologados</span>
          <strong>{resumo.homologados}</strong>
        </article>
        <article className="summary-card">
          <span>Em andamento</span>
          <strong>{resumo.andamento}</strong>
        </article>
      </section>

      <div className="layout-grid">
        <Form onCreated={carregarDados} />
        <Filtros
          filtroStatus={filtroStatus}
          setFiltroStatus={setFiltroStatus}
          buscaCliente={buscaCliente}
          setBuscaCliente={setBuscaCliente}
        />
      </div>

      <Tabela dados={dadosFiltrados} atualizar={carregarDados} />
    </main>
  )
}

export default App
