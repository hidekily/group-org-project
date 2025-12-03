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
        <section className='h-[10vh] flex items-center justify-center gap-4 px-4'>
          {/* navbar for routes */}
          <nav className='flex flex-row w-full md:w-[80%] lg:w-[60%] xl:w-[30%] h-[85%] bg-slate-600 rounded-lg text-base md:text-xl
                          mt-4 justify-center items-center gap-2 text-emerald-500 font-bold'>

            {/* link para Home  */}
            <Link to="/" activeProps={{className: 'text-lg md:text-2xl'}} >
              Home
            </Link> |

            {/* Link para o grupo */}
            <Link to="/group" activeProps={{className: 'text-lg md:text-2xl'}}>
              Grupo
            </Link> |

            {/* link para lista de manwha do lucas */}
            <Link to="/manwha" activeProps={{className: 'text-lg md:text-2xl'}}>
              Manwha
            </Link> |

            <p className='text-rose-400 text-sm md:text-base'>{isPending ? 'Carregando...' : session?.user?.name || 'Não logado'}</p>
          </nav>
        </section>

        <Outlet />
    </>
    )
}
