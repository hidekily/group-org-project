import { createFileRoute } from '@tanstack/react-router'

// import do better auth 
import {signIn, signOut, signUp } from '../lib/auth-client'
// import do react
import { useState } from 'react'

// imagem do grupo
const karina = '/imgs/karina.jpeg'


export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    await signIn.email({ email, password }) // ← Função async com dados
  }

  return (
    <>
      {/* section para o login e logout */}
      <section className='h-[600px] flex flex-row justify-center items-center'>
        {/* child section para a imagem do grupo */}
        <div className='w-[40%] h-[90%] flex flex-col justify-center items-center'>
          <img src={karina} alt="imagem do grupo" className='h-[80%] w-[80%] text-center bg-cover bg-center rounded-lg'/>
        </div>
        {/* child section para login e logout */}
        <div className='w-[60%] h-[90%] flex flex-col justify-center items-center bg-emerald-900'>
          {/* better auth */}
          <input 
            type="email"
            placeholder='emailexemplo@gmail.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password"
            placeholder='suasenha123'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Entrar</button>
        
        </div>
      </section>    
    </>
  )
}
