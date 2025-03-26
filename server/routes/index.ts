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

router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const todo = await db.getTodoById(id)

    if (!todo) {
      return res.sendStatus(404)
    }
    res.json(todo)
  } catch (e) {
    next(e)
  }
})

// PATCH, Set Headers: Content-Type: application/json,
//  Enter Body (raw JSON)
router.patch('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id) // Extract ID from URL params
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid event ID' })
    }
    const existingTodo = await db.getTodoById(id) // Check if todo exists
    if (!existingTodo) {
      return res.sendStatus(404) // Todo not found
    }
    const { task, isComplete, priority, isFun, dueDate } = req.body
    const updatedEvent = {
      task,
      isComplete,
      priority: Number(priority),
      isFun,
      dueDate,
    }
    await db.updateTodo(id, updatedEvent) // Update the Todo in DB
    res.sendStatus(204)
  } catch (e) {
    next(e)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const deletedRows = await db.deleteTodo(id) //should be 1 if successful, 0 if no todo with that ID exists
    if (deletedRows === 0) {
      return res.status(404).json({ error: 'Event not found' })
    }
    res.sendStatus(204) // No content (successful deletion)
  } catch (e) {
    next(e)
  }
})

// PUT endpoint to archive all completed todos
router.put('/archive-completed', async (req, res, next) => {
  // console.log('entering to archive-completed')
  try {
    const updatedCount = await db.archiveCompletedTodos()
    res.status(200).json({ updated: updatedCount })
  } catch (e) {
    next(e)
  }
})

export default router
