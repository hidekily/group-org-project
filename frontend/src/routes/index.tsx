import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <>
      <section className='h-[600px] bg-emerald-500 flex flex-row justify-center items-center'>
        <div className='w-[40%] h-[90%] flex flex-col justify-center items-center bg-zinc-900 bg-cover bg-center rounded-lg'>
          <img src="../imgs/karina.jpeg" alt="imagem do grupo" className='h-[50%] w-[50%] bg-emerald-900 text-center'/>
        </div>
        <div className='w-[60%] h-[90%] flex flex-col justify-center items-center bg-sky-700'>

        </div>
      </section>    
    </>
  )
}
