import { createFileRoute } from '@tanstack/react-router'

// import do better auth 
import { signIn, signOut } from '../lib/auth-client'
// import do react

// imagem do grupo
const karina = '/imgs/karina.jpeg'


export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {

  const handleGoogleLogin = async () => {
    await signIn.social({ 
      provider: 'google',
      callbackURL: '/' // Opcional: para onde redirecionar após login
    })
  }

  return (
    <>
      {/* section para o login e logout */}
      <section className='h-[600px] flex flex-row justify-center items-center'>
        {/* child section para a imagem do grupo */}
        <div className='w-[40%] h-[90%] flex flex-col justify-center items-center'>
          <img src={karina} alt="imagem do grupo" className='h-[80%] w-[80%] text-center bg-cover bg-center rounded-2xl border text-slate-400'/>
        </div>
        {/* child section para login e logout */}
        <div className='w-[60%] h-[90%] flex flex-col justify-center items-center'>
          {/* better auth Logout*/}
          <div className='h-[75%] w-[100%] bg-sky-900 flex justify-center items-center'>
            <button onClick={async ()=>{
              try{
                signOut()
                alert("logout feito com sucesso")
              } catch (error){
                alert("erro ao fazer logout")
              }
            }}
            className='p-5 bg-red-600 rounded-lg text-white font-bold hover:bg-red-800 transition-colors'
            >
              Logout
            </button>
          </div>
          {/* googleLogin */}
          <div className='h-[25%] w-[100%] bg-teal-900 flex justify-center items-center gap-3'>
            <button onClick={()=> signIn.social({provider: 'google'})} className='google-login'>

            </button>
          </div>
        </div>
      </section>    
    </>
  )
}
