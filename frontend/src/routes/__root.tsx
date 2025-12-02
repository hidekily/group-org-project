import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import '../styles.css'
import {useSession} from '@/lib/auth-client'
import { authClient } from './../lib/auth-client';


export const Route = createRootRoute({
  component: RootDocument,
})


function RootDocument() {
  const {data: session, isPending, error} = authClient.useSession()

  console.log('Session data:', session)
  console.log('Session isPending:', isPending)
  console.log('Session error:', error)

  return (
    <>
        {/* section for navbar */}
        <section className='h-[10vh] flex items-center justify-center gap-4'>
          {/* navbar for routes */}
          <nav className='flex flex-row w-[30%] h-[85%] bg-slate-600 rounded-lg text-xl
                          mt-4 justify-center items-center gap-2 text-emerald-500 font-bold'>

            {/* link para Home  */}
            <Link to="/" activeProps={{className: 'text-2xl'}} >
              Home
            </Link> |

            {/* Link para o grupo */}
            <Link to="/group" activeProps={{className: 'text-2xl'}}>
              Grupo
            </Link> |

            {/* link para lista de manwha do lucas */}
            <Link to="/manwha" activeProps={{className: 'text-2xl'}}>
              Manwha
            </Link>
          </nav>

          <nav className='w-[8%] h-[85%] flex justify-center items-center
                          bg-slate-600 rounded-lg text-xl
                          mt-4 text-emerald-500 font-bold'
          >
            {isPending ? 'Carregando...' : session?.user?.name || 'Não logado'}
          </nav>
        </section>

        <Outlet />
    </>
    )
}
