import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/admin/')({
  component: RouteComponent,
})

function RouteComponent() {
  return 'Hello /_admin/admin/!'
}
