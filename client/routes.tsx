import { createRoutesFromElements, Route } from 'react-router-dom'
import App from './components/App'
import EditTodo from './components/EditTodo'
import Layout from './components/Layout'

export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<App />} />
    <Route path="/edit/:id" element={<EditTodo />} />
  </Route>,
)
