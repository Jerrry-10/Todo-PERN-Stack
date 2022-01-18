const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db")
const usersinfo = []
app.use(cors());
app.use(express.json());

//create a todo
app.post("/todos", async (req,res) =>{
    try{
       const { description } = req.body;
       const newTodo = await pool.query(
           "INSERT INTO todo(description) VALUES($1) RETURNING *",
            [description]
       );

       res.json(newTodo.rows[0])
    }catch(err){
    console.error(err.message);
    }
})
//get all todo
app.get("/todos", async(req,res)=>{
    try{
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows)
    }catch(err){
        console.log(err.message)
    }
})
//get a todo
app.get("/todos/:id", async (req, res) =>{
    try{
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])
        res.json(todo.rows[0])
    }catch(err){
        console.error(err.message)
    }
})
//update a todo
app.put("/todos/:id", async(req,res)=>{
    try{
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",
        [description, id]);

        res.json("Todo was updated!")
    }catch(err){
        console.error(err.message)
    }
})

//delete a todo

app.delete("/todos/:id", async(req,res)=>{
    try{
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id])
        res.json("Todo was deleted!")
    }catch(err){
        console.error(err.message)
    }
})
//////////////////////////////////////////////////////////
/////////Login///////////////////////////////////////////
app.get('/users', async (req, res) =>{
    try{
        const allUsers = await pool.query("SELECT * FROM users");
        res.json(allUsers.rows)
    }catch(err){
        console.log(err.message)
    }
})
// app.get("/todos", async(req,res)=>{
//     try{
//         const allTodos = await pool.query("SELECT * FROM todo");
//         res.json(allTodos.rows)
//     }catch(err){
//         console.log(err.message)
//     }
// })
// app.post('/users', async (req,res) =>{
//     const user = {name: req.body.name, password: req.body.password};
//     // const newUser = await pool.query("INSERT INTO user(name) VALUES ($1) RETURNING *",
//     // [name])
//     // res.json(users,rows[0])
//     usersinfo.push(user);
//     res.status(201).send()
// })
app.post('/users', async(req,res) =>{
    const {name} = req.body
    const {password} = req.body
    const {email} = req.body
    const newUser = await pool.query(
        "INSERT INTO users(name, password,email) VALUES($1, $2, $3) RETURNING *",[name,password,email]
    )
    res.json(newUser.rows[0])
})


// try{
//     const { description } = req.body;
//     const newTodo = await pool.query(
//         "INSERT INTO todo(description) VALUES($1) RETURNING *",
//          [description]
//     );

//     res.json(newTodo.rows[0])
//  }catch(err){
//  console.error(err.message);
//  }
// })


app.listen(5000, ()=>{
    console.log("server has started on port 5000");
});