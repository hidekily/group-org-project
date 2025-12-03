import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'  

export const Route = createFileRoute('/manwha')({
  component: RouteComponent,
})

interface Manwha {
  id: string
  title: string
  chapterNumber: number
  link: string | null
  notes: string | null
  createdAt: string
  addedBy: {
    id: string
    name: string
    image: string | null
  }
}

function RouteComponent() {
  const [manwhas, setManwhas] = useState<Manwha[]>([])
  const [formName, setFormName] = useState('')
  const [formCap, setFormCap] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

  useEffect(() => {
    const fetchManwhas = async () => {
      try {
        const res = await fetch(`${API_URL}/api/manwha`, {
          credentials: 'include'
        })
        const data = await res.json()
        setManwhas(data)
      } catch (error) {
        alert('Erro ao carregar')
      } finally {
        setLoading(false)
      }
    }
    fetchManwhas()
  }, [API_URL])

const handleSubmit = async () => {
  if (!formName || !formCap) return alert('Preencha tudo')

  setSubmitting(true)

  try {
    const res = await fetch(`${API_URL}/api/manwha`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: formName,
        chapterNumber: parseInt(formCap)
      })
    })

    if (res.ok) {
      // ✅ AO INVÉS DE ADICIONAR MANUALMENTE, RECARREGA A LISTA
      const refreshRes = await fetch(`${API_URL}/api/manwha`, {
        credentials: 'include'
      })
      const updatedList = await refreshRes.json()
      setManwhas(updatedList)  // ← Atualiza com lista completa do banco

      setFormName('')
      setFormCap('')
      alert('Adicionado!')
    } else {
      alert('Erro ao adicionar')
    }
  } catch (error) {
    alert('Erro de conexão')
  } finally {
    setSubmitting(false)
  }
}

  const handleDelete = async (id: string) => {
    if (!confirm('Deletar?')) return

    try {
      const res = await fetch(`${API_URL}/api/manwha/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      if (res.ok) {
        setManwhas(manwhas.filter(m => m.id !== id))
        alert('Deletado!')
      } else {
        alert('Erro ao deletar')
      }
    } catch (error) {
      alert('Erro de conexão')
    }
  }

  if (loading) {
    return <div className="text-white text-center mt-10">Carregando...</div>
  }

  // ✅ Incrementar (+1)
const handleIncrement = async (id: string, currentChapter: number) => {
  const newChapter = currentChapter + 1

  // Atualiza UI imediatamente
  setManwhas(manwhas.map(m => 
    m.id === id ? { ...m, chapterNumber: newChapter } : m
  ))

  // Sincroniza com backend
  const res = await fetch(`http://localhost:3001/api/manwha/${id}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chapterNumber: newChapter })
  })

  // Se falhar, reverte
  if (!res.ok) {
    setManwhas(manwhas.map(m => 
      m.id === id ? { ...m, chapterNumber: currentChapter } : m
    ))
  }
}

// ✅ Decrementar (-1)
const handleDecrement = async (id: string, currentChapter: number) => {
  if (currentChapter <= 1) return

  const newChapter = currentChapter - 1

  setManwhas(manwhas.map(m => 
    m.id === id ? { ...m, chapterNumber: newChapter } : m
  ))

  const res = await fetch(`http://localhost:3001/api/manwha/${id}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chapterNumber: newChapter })
  })

  if (!res.ok) {
    setManwhas(manwhas.map(m => 
      m.id === id ? { ...m, chapterNumber: currentChapter } : m
    ))
  }
}

  return (
    <>
      <section className='h-[90vh] flex flex-col justify-start items-center'>
        
        {/* FORMULÁRIO */}
        <section className="h-[8vh] w-[50%] flex flex-row justify-center items-center gap-3">
          <input 
            type="text" 
            value={formName}
            onChange={(e) => setFormName(e.target.value)} 
            placeholder='Nome do manwha'
            className='p-2 rounded-lg bg-slate-800 text-white'          
          />
          <input 
            type="number" 
            value={formCap}
            onChange={(e) => setFormCap(e.target.value)} 
            placeholder='Capítulo'
            className='p-2 rounded-lg bg-slate-800 text-white'          
          />
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className='p-2 bg-emerald-600 rounded-lg text-white font-bold hover:bg-emerald-700 transition-colors disabled:opacity-50'
          >
            {submitting ? 'Enviando...' : 'Adicionar'}
          </button>
        </section>

        {/* GRID DE LISTA */}
        <section className="grid grid-cols-3 grid-rows-auto gap-4 h-[82vh] w-[100%] overflow-y-auto p-3">
          {/* SE VAZIO */}
          {manwhas.length === 0 && (
            <div className="col-span-4 text-center text-slate-400 mt-10">
              Nenhum manwha adicionado ainda
            </div>
          )}
          {/* SE TEM ITENS */}
          {manwhas.map((manwha) => (
            <div key={manwha.id} className="bg-slate-600 rounded-lg flex flex-col p-4 text-emerald-300 font-bold h-[300px]">
              <div className="h-[20%] text-3xl">{manwha.title}</div>
              <div className='h-[40%] flex flex-row gap-2 items-center'>
                <button  className="rounded-lg bg-zinc-900 h-[40px] w-[40px]" onClick={() => handleDecrement(manwha.id,manwha.chapterNumber)}>-1</button>
                <button  className="rounded-lg bg-zinc-900 h-[40px] w-[40px]" onClick={() => handleIncrement(manwha.id,manwha.chapterNumber)}>+1</button>
                <button className='rounded-lg bg-zinc-900 h-[40px] w-[40px]' onClick={() => handleDelete(manwha.id)}>🗑️</button>
              </div>
              <div className="h-[40%] flex flex-row items-center gap-5">
                <h2 className='text-3xl'>Cap: {manwha.chapterNumber}</h2>
                <p className='text-sm'>Added by: {manwha.addedBy.name}</p>
                <p className='text-sm'>{manwha.createdAt}</p>
              </div>
            </div>
          ))}
        </section>
      </section>
    </>
  )
}
