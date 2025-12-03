import { createFileRoute } from '@tanstack/react-router'

// import do better auth
import { signIn, signOut, useSession } from '../lib/auth-client'

// imagem do grupo
const karina = '/imgs/karina.jpeg'


export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {

  const {data: session} = useSession()

  const handleGoogleLogin = async () => {
    await signIn.social({
      provider: 'google',
      callbackURL: window.location.origin + '/'
    })
  }

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <>
      {/* section para o login e logout */}
      <section className='min-h-[600px] flex flex-col md:flex-row justify-center items-center p-4 md:p-0'>
        {/* child section para a imagem do grupo */}
        <div className='w-full md:w-[40%] h-[300px] md:h-[90%] flex flex-col justify-center items-center mb-6 md:mb-0'>
          <img src={karina} alt="imagem do grupo" className='h-full w-full max-w-[400px] md:h-[80%] md:w-[80%] object-cover md:object-none md:bg-cover md:bg-center rounded-2xl border text-slate-400'/>
        </div>
        {/* child section para login e logout */}
        <div className='w-full md:w-[60%] h-auto md:h-[90%] flex flex-col justify-center items-center px-4 md:px-0'>
          {session ? (
            <div>
              <button className='button-home bg-slate-600 text-emerald-500' onClick={handleLogout}>Logout</button>
            </div>
          ): 
          (
          <div>
            <button className='button-home bg-slate-600 text-emerald-500' onClick={handleGoogleLogin}>Login</button>
          </div>
          )}
        </div>
      </section>
    </>
  )
}
