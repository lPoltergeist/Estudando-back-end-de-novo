const express = require('express');
const cors = require('cors');
const { v4: uuid } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  
  const {username} = request.headers;
  const user = users.find((user) => user.username === username)

  if (!user) {
    return response.status(400).json({error: "user not found"});
  }

  request.user = user;

  return next();
}

app.post('/users', (request, response) => {
  
 const {name, username} = request.body;

 const userNameAlreadyExists = users.some((user) => user.username === username);
 
 if (userNameAlreadyExists) {
  return response.status(400).json({error:'username already exist.'});
 }

 users.push({
  id: uuid(),
  username,
  name,
  todo: []
 })

  return response.status(201).send('funcionou');
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  
  const {user} = request;
  
  return response.status(201).json(user.todo);
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  
 const {title, deadline} = request.body;
 const {user} = request;

 const todo = {
    id: uuid(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date(),
    }

    user.todo.push(todo);

    return response.status(201).send(todo);
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  
  const { user } = request;
  const { id } = request.params;
  const { title, deadline } = request.body;
  
  const todo = user.todo.find((todo) => todo.id === id);

  if (!todo) {
    return response.status(400).send({error: "Todo does not exist or wrong id."})
  }

  todo.title = title;
  todo.deadline = new Date(deadline);

  return response.status(200).send(todo)

});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  
  const { user } = request;
  const { id } = request.params;

const todo = user.todo.find((todo) => todo.id === id);

if (!todo) {
  return response.status(400).send({error: "Todo does not exist or wrong id."})
}

todo.done = true;

return response.status(200).send(todo)


});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  
  const {user} = request;
  const { id } = request.params;

  const todo = user.todo.find((todo) => todo.id === id);

  if (!todo) {
    return response.status(400).send({error: "Todo does not exist or wrong id."})
  }

   user.todo.splice(todo, 1);
   return response.status(200).send()
});

module.exports = app;