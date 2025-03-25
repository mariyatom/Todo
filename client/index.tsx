import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import App from './components/App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import routes from './routes.tsx'

const router = createBrowserRouter(routes)

const queryClient = new QueryClient()

// step1:remove </app> and add  <RouterProvider router={router} />,
// step2:const router = createBrowserRouter(routes),
// step3:import routes from './routes.tsx'

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>,
  )
})
