import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors';
import Todo from './models/Todo.js';


dotenv.config();

const app = express();
const port = process.env.PORT || 9000;

//middlewear
app.use(cors());
app.use(express.json());

//DB Config
mongoose.connect(process.env.CON_URL)
.then(console.log("Database Connected"))
.catch((err) => console.log(err))

//API 
app.get("/", (req, res) => res.status(200).send("CyborgBuilder"))

app.post('/todo/new', (req, res) => {
  const dbTodo = req.body;

  Todo.create(dbTodo)
    .then((data) => {
      res.status(201).send(data)
    })
    .catch((err) => {
      res.status(500).send(err)
    })

  })

  app.get("/todo/sync", (req, res) => {
    Todo.find()
      .then((data) => {
        res.status(200).send(data)
      })
      .catch((err) => {
        res.status(500).send(err)
      })
  })

  app.delete("/todo/delete/:id", async (req, res) => {

    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json(result)
      .catch((err) => {
        console.log(err)
      })
  })

  app.get("/todo/complete/:id", async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    todo.complete = !todo.complete;

    await todo.save();

    res.json(todo);
  })

app.listen(port, () => console.log(`listening on localhost ${port}`))

