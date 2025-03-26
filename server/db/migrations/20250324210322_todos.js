export function up(knex) {
  return knex.schema.createTable('todos', (table) => {
    table.increments('id')
    table.string('task').notNullable()
    table.boolean('is_complete').defaultTo(false)
    table.boolean('is_archived').defaultTo(false)
    table.integer('priority')
    table.boolean('is_fun').defaultTo(false)
    table.string('due_date')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export function down(knex) {
  return knex.schema.dropTable('todos')
}
