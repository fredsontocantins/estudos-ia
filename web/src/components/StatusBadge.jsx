const colorByStatus = {
  Pendente: 'status-pendente',
  'Em andamento': 'status-andamento',
  'Em validação': 'status-validacao',
  Homologado: 'status-homologado',
  Bloqueado: 'status-bloqueado',
}

export default function StatusBadge({ status }) {
  const statusClass = colorByStatus[status] ?? 'status-pendente'

  return <span className={`badge ${statusClass}`}>{status}</span>
}
