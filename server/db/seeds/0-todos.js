export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('todos').del()

  // Inserts seed entries
  await knex('todos').insert([
    {
      id: 1,
      task: 'Complete homework',
      is_complete: false,
      priority: 1,
      is_fun: false,
      due_date: '2025-03-30',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 2,
      task: 'Go for a walk',
      is_complete: false,
      priority: 2,
      is_fun: true,
      due_date: '2025-03-26',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
  ])
}
