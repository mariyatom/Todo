import { createRoutesFromElements, Route } from 'react-router-dom'
import App from './components/App'
import EditTodo from './components/EditTodo'

export default createRoutesFromElements(
  <Route path="/">
    <Route index element={<App />} />
    <Route path="/edit/:id" element={<EditTodo />} />
  </Route>,
)
