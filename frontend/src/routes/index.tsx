import { createFileRoute } from '@tanstack/react-router'

// import do better auth
import { signIn, signOut } from '../lib/auth-client'

// imagem do grupo
const karina = '/imgs/karina.jpeg'


export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {

  const handleGoogleLogin = async () => {
    await signIn.social({
      provider: 'google',
      callbackURL: window.location.origin
    })
  }

  const handleLogout = async () => {
    await signOut()
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
          <div className='h-[65%] w-[100%] flex justify-center items-center'>
            <button onClick={handleLogout}
            className='p-5 bg-red-600 rounded-lg text-white font-bold hover:bg-red-800 transition-colors'
            >
              Logout
            </button>
          </div>
          {/* googleLogin */}
          <div className='h-[35%] w-[100%] flex justify-center items-center gap-3'>
            <button onClick={handleGoogleLogin} className='google-login'>

            </button>
          </div>
        </div>
      </section>
    </>
  )
}
