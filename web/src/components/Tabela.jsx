import { useState } from 'react'

import { api } from '../services/api'
import StatusBadge from './StatusBadge'

const STATUS_OPTIONS = ['Pendente', 'Em andamento', 'Em validação', 'Homologado', 'Bloqueado']

export default function Tabela({ dados, atualizar }) {
  const [editandoId, setEditandoId] = useState(null)
  const [novoStatus, setNovoStatus] = useState('Pendente')

  async function salvarStatus(id) {
    await api.put(`/homologacoes/${id}`, { status: novoStatus })
    setEditandoId(null)
    atualizar()
  }

  return (
    <section className="card">
      <h2>Fila de homologação</h2>
      <table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Módulo</th>
            <th>Status</th>
            <th>Responsável</th>
            <th>Prioridade</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((item) => (
            <tr key={item.id}>
              <td>{item.cliente}</td>
              <td>{item.modulo}</td>
              <td>
                {editandoId === item.id ? (
                  <select value={novoStatus} onChange={(e) => setNovoStatus(e.target.value)}>
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                ) : (
                  <StatusBadge status={item.status} />
                )}
              </td>
              <td>{item.responsavel || '-'}</td>
              <td>{item.prioridade}</td>
              <td>
                {editandoId === item.id ? (
                  <button className="btn-secondary" onClick={() => salvarStatus(item.id)}>
                    💾 Salvar
                  </button>
                ) : (
                  <button
                    className="btn-secondary"
                    onClick={() => {
                      setEditandoId(item.id)
                      setNovoStatus(item.status)
                    }}
                  >
                    ✏️ Editar
                  </button>
                )}
              </td>
            </tr>
          ))}
          {dados.length === 0 ? (
            <tr>
              <td colSpan="6" className="empty">
                Nenhum registro encontrado para os filtros aplicados.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </section>
  )
}
