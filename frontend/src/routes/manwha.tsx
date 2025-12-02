import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/manwha')({
  component: RouteComponent,
})
function RouteComponent() {

  // lista de manwhas importada do backend
  const [manwhas, setManwhas] = useState([])
  
  // valores do forms 
  const [formName, setFormName] = useState('')
  const [formCap, setFormCap] = useState('')
  
  // loading state
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  // const para enviar o forms 
  const handleSubmit = async () => {
    if (!formName || !formCap) return alert('Preencha tudo')
    
    setSubmitting(true)

    const res = await fetch('http://localhost:3001/api/manwha', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: formName, chapterNumber: +formCap })
    }).finally(() => setSubmitting(false))

    if (res.ok) {
      setManwhas([...manwhas, await res.json()])
      setFormName('')
      setFormCap('')
    } else {
      alert('Erro')
    }
  }

  return(
    <>
      <section className='h-[90vh] bg-emerald-900 flex flex-col justify-start items-center'>
        <section className="h-[8vh] bg-slate-700 w-[50%] flex flex-row justify-center items-center gap-3">
          <input 
            type="text" 
            value={formName}
            onChange={(e) => setFormName(e.target.value)} 
            placeholder='type manwha name'
            className='rounded-lg bg-rose-900'          
          />
          <input 
            type="number" 
            value={formCap}
            onChange={(e) => setFormCap(e.target.value)} 
            placeholder='type its chapter'
            className='rounded-lg bg-rose-900'          
          />
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className='p-2 bg-rose-600 rounded-lg text-white font-bold hover:bg-rose-800 transition-colors'
          >
            Add Manwha
          </button>
        </section>

        <section className="grid grid-cols-4 gap-4 h-[82vh] w-[100%] overflow-y-auto bg-rose-900">
          {/* aqui vai a lista de manwhas */}
        </section>
      </section>
    </>
  )
}
