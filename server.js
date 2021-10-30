const express = require('express');

const app = express();
const socket = require('socket.io');
const { isNullOrUndefined } = require('util');

const server = app.listen(8000, () => {
  console.log('Server is running on Port:', 8000)
});

const io = socket(server);

let tasks = [];

io.on('connection', (socket) => {
  console.log('New connection from ' + socket.id);
  socket.emit('updateData', {tasks});

  socket.on('addTask', ({id, name}) => {
    tasks.push({id, name});
    console.log(tasks);
    socket.broadcast.emit('addTask', {id: id, name: name}); 
  });
  
  socket.on('removeTask', ({taskId, name}) => {
    tasks = tasks.filter(({id}) => id !== taskId);
    socket.broadcast.emit('removeTask', { id: taskId, name: name }); 
  });
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})