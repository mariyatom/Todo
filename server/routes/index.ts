import { Router } from 'express'

import * as db from '../db/db'

const router = Router()
// file created_by mariya

router.get('/', async (req, res, next) => {
  try {
    const todos = await db.getAllTodos()
    res.json(todos)
  } catch (e) {
    next(e)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { task, isComplete, priority, isFun, dueDate } = req.body
    const newTodo = {
      task,
      isComplete,
      priority: Number(priority),
      isFun,
      dueDate,
    }
    const id = await db.addNewTodo(newTodo)
    res.status(201).json({ id })
  } catch (e) {
    next(e)
  }
})
export default router
