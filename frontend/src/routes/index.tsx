import { createFileRoute } from '@tanstack/react-router'
import karina from '../public/imgs/karina.jpeg'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <>
      <section className='h-[600px] flex flex-row justify-center items-center'>
        <div className='w-[40%] h-[90%] flex flex-col justify-center items-center'>
          <img src={karina} alt="imagem do grupo" className='h-[80%] w-[80%] text-center bg-cover bg-center rounded-lg'/>
        </div>
        <div className='w-[60%] h-[90%] flex flex-col justify-center items-center'>
          {/* better auth */}
        </div>
      </section>    
    </>
  )
}
