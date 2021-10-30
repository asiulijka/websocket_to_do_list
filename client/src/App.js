import React from 'react';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      tasks: [],
      taskName: '',
    };
  }

  componentDidMount() {
    this.socket = io('localhost:8000');

    this.socket.on('addTask', (task) => {
      // console.log("addTask");
      this.addTask(task);
    });

    this.socket.on('removeTask', ({id}) => {
      // console.log("removeTask");
      this.removeTask(id, false);
    });

    this.socket.on('updateData', ({tasks}) => {
      console.log("updateData " + tasks);
      this.updateTasks(tasks);
    });

  }

  updateTasks(tasks) {
    this.setState(
      {tasks: tasks}
    );
  };

  removeTask(taskId, isLocal) {
    // console.log(id);
    this.setState({
      tasks: this.state.tasks.filter(({id}) => id !== taskId),
    });
    if(isLocal) {
      this.socket.emit('removeTask', {taskId})
    };
  };

  submitForm(event) {
    event.preventDefault();
    const newTask = {id: uuidv4(), name: this.state.taskName};
    this.addTask(newTask);
    this.socket.emit('addTask', newTask);
  };

  addTask(task){
    // console.log(task);
    this.setState(
      {
        taskName: '',
        tasks: [...this.state.tasks, task]
      }
    );
    // console.log(this.state);
  };

  render() {
    return (
      <div className="App">
        <header>
          <h1>ToDoList.app</h1>
        </header>
    
        <section className="tasks-section" id="tasks-section">
          <h2>Tasks</h2>
    
          <ul className="tasks-section__list" id="tasks-list">
            
              {this.state.tasks.map(({id, name}) => {
                  return(
                    <li className="task" key={'li_' + id}>
                      <p>{name}</p>
                      <button key={'button_' + id} className="btn btn--red" onClick={() => this.removeTask(id, true)}>Remove</button>
                    </li>
                  );
                })
              }
              
            
            {/* <li class="task">Go out with a dog <button class="btn btn--red">Remove</button></li> */}
          </ul>
    
          <form id="add-task-form">
            <input 
              className="text-input" 
              autoComplete="off" 
              type="text" 
              placeholder="Type your description" 
              id="task-name" 
              value={this.state.taskName}
              onChange={e => this.setState({
                taskName: e.target.value
              })} 
            />
            <input className="btn" type="submit" onClick={e => this.submitForm(e)} value='Add' />
          </form>
    
        </section>
      </div>
    );
  };

};

export default App;