import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/manwha')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/manwha"!</div>
}
