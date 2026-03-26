import { useState } from 'react'

import { api } from '../services/api'

const DEFAULT_FORM = {
  cliente: '',
  modulo: '',
  descricao: '',
  responsavel: '',
  status: 'Pendente',
  prioridade: 'Média',
  versao: '',
  observacoes: '',
}

export default function Form({ onCreated }) {
  const [form, setForm] = useState(DEFAULT_FORM)
  const [loading, setLoading] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    try {
      await api.post('/homologacoes', form)
      setForm(DEFAULT_FORM)
      onCreated()
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="card">
      <h2>Nova homologação</h2>
      <form className="form-grid" onSubmit={handleSubmit}>
        <input name="cliente" value={form.cliente} onChange={handleChange} placeholder="Cliente" required />
        <input name="modulo" value={form.modulo} onChange={handleChange} placeholder="Módulo" required />
        <input name="responsavel" value={form.responsavel} onChange={handleChange} placeholder="Responsável" />
        <input name="versao" value={form.versao} onChange={handleChange} placeholder="Versão (MAR/2026)" />

        <select name="status" value={form.status} onChange={handleChange}>
          <option>Pendente</option>
          <option>Em andamento</option>
          <option>Em validação</option>
          <option>Homologado</option>
          <option>Bloqueado</option>
        </select>

        <select name="prioridade" value={form.prioridade} onChange={handleChange}>
          <option>Baixa</option>
          <option>Média</option>
          <option>Alta</option>
          <option>Crítica</option>
        </select>

        <textarea name="descricao" value={form.descricao} onChange={handleChange} placeholder="Descrição" required rows="3" />
        <textarea name="observacoes" value={form.observacoes} onChange={handleChange} placeholder="Observações" rows="2" />

        <button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar registro'}
        </button>
      </form>
    </section>
  )
}
