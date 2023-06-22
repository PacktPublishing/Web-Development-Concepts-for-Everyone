const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const pool = require('./modules/pool');

app.use(express.static('server/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET TASKS
app.get('/api/tasks', async (req, res) => {
  const queryString = `SELECT * FROM "tasks" ORDER BY "completed";`;
  try {
    const response = await pool.query(queryString);
    res.send(response.rows);
  } catch (error) {
    console.log(`Query failed: ${error}`);
    res.sendStatus(500);
  }
});

// POST TASKS
app.post('/api/tasks', async (req, res) => {
  const newTask = req.body.task;
  // Note that we could do a lot more error checking and normalization here.
  const queryString = `INSERT INTO "tasks" ("task_name", "completed") VALUES ($1, $2);`;
  try {
    const response = await pool.query(queryString, [newTask, false]);
    res.sendStatus(200);
  } catch (error) {
    console.log(`Query failed: ${error}`);
    res.sendStatus(500);
  }
});

// DELETE TASKS
app.delete('/api/tasks/:id', async (req, res) => {
  const queryString = `DELETE FROM "tasks" WHERE "id"=$1;`;
  try {
    const response = await pool.query(queryString, [req.params.id]);
    res.sendStatus(200);
  } catch (error) {
    console.log(`Query failed: ${error}`);
    res.sendStatus(500);
  }
});

// UPDATE TASKS
app.put('/api/tasks/:id', async (req, res) => {
  // Note, we could be fancier here and 'toggle' completed, but we are keeping it simple.
  const queryString = `UPDATE "tasks" SET "completed"=$1 WHERE "id"=$2;`;
  try {
    const response = await pool.query(queryString, [true, req.params.id]);
    res.sendStatus(200);
  } catch (error) {
    console.log(`Query failed: ${error}`);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
