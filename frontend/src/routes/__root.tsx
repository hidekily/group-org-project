import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import '../styles.css'

export const Route = createRootRoute({
  component: RootDocument,
})

function RootDocument() {
  return (
    <>
        {/* section for navbar */}
        <section className='h-[10vh] flex items-center justify-center'>
          {/* navbar for routes */}
          <nav className='flex flex-row w-[30%] h-[85%] bg-slate-600 rounded-lg text-xl
                          mt-4 justify-center items-center gap-2 text-emerald-500 font-bold'>

            {/* link para Home  */}
            <Link to="/" activeProps={{className: 'text-2xl'}} >
              Home
            </Link> |

            {/* Link para despesas do grupo */}
            <Link to="/despesas" activeProps={{className: 'text-2xl'}}>
              Manwha
            </Link> |

            {/* link para lista de manwha do lucas */}
            <Link to="/manwha" activeProps={{className: 'text-2xl'}}>
              Grupo
            </Link>
          </nav>
        </section>

        <Outlet />
    </>
    )
}
