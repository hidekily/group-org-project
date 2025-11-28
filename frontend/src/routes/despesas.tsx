import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/despesas')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/despesas"!</div>
}
