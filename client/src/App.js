import React from 'react';
import io from 'socket.io-client';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      tasks: [],
      taskName: '',
    };
  }

  componentDidMount() {
    this.socket = io('http://localhost:8000');
  };

  removeTask(id) {
    // console.log(id);
    this.setState({
      tasks: this.state.tasks.filter((e, i) => i !== id),
    });
    this.socket.emit('removeTask', {id});
  };

  submitForm(event) {
    event.preventDefault();
    this.addTask(this.state.taskName);
    this.socket.emit('addTask', {taskName: this.state.taskName});
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
            
              {this.state.tasks.map((e, i) => {
                  return(
                    <li className="task" key={'li_' + i}>
                      <p>{e}</p>
                      <button key={'button_' + i} className="btn btn--red" onClick={() => this.removeTask(i)}>Remove</button>
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