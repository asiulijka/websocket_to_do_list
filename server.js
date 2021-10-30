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
  socket.on('message', () => {updateData, tasks});
});

io.on('addTask', () => {
  tasks.push({taskName, id: socket.id});
  socket.broadcast.emit('message', { content: 'new task ' +  taskName }); 
});

io.on('removeTask', () => {
  const index = tasks.indexOf(taskName);
  if (index > -1) {
    tasks.splice(index, 1);
    socket.broadcast.emit('message', { content: taskName + ' was removed' }); 
  }
   
});







app.use((req, res) => {
  res.status(404).send('404 not found...');
})