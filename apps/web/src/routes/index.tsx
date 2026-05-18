import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    return redirect({ to: "/app" })
  },
  component: Index,
})

function Index() {
  return null
}
