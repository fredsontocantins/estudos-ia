const STATUS_OPTIONS = ['Pendente', 'Em andamento', 'Em validação', 'Homologado', 'Bloqueado']

export default function Filtros({ filtroStatus, setFiltroStatus, buscaCliente, setBuscaCliente }) {
  return (
    <section className="card filtros">
      <h2>Filtros</h2>
      <div className="filtro-grid">
        <div>
          <label htmlFor="filtroStatus">Status</label>
          <select id="filtroStatus" value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}>
            <option value="">Todos</option>
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="buscaCliente">Cliente</label>
          <input
            id="buscaCliente"
            value={buscaCliente}
            onChange={(e) => setBuscaCliente(e.target.value)}
            placeholder="Digite para buscar cliente"
          />
        </div>
      </div>
    </section>
  )
}
