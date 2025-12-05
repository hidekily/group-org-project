import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/group/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div className='h-[10vh] bg-sky-800 mt-1'>
      
      </div>
    </>
  )
}
