const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());

let users = [
    {id: 1, name: "Sahil"},
    {id: 2, name: "Meow"},
];

//get users
app.get("/users", (req, res)=>{
    res.json(users);
});


app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name
  };

  users.push(newUser);
  res.json(newUser);
});


app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const user = users.find(u => u.id === id);
  if (!user) return res.send("User not found");

  user.name = req.body.name;
  res.json(user);
});


app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);

  users = users.filter(u => u.id !== id);
  res.send("Deleted");
});

app.listen(5000, ()=>{
    console.log("connected");
})