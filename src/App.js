import React, {useState} from 'react';
import { Container, Row, Col, ListGroup, Form, Badge, Alert} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import Header from './components/header/header';
import Task from './components/task/task';

function App() {
  const todoData = localStorage.getItem('todos') || '{}';
  const doneData = localStorage.getItem('dones') || '{}';
  const [newTask, setNewTask] = useState('');
  const [todos, setTodos] = useState(JSON.parse(todoData));
  const [dones, setDones] = useState(JSON.parse(doneData));
  const [message, setMessage] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (newTask.trim().length === 0) {
        return;
      }
      const newTodos = {...todos};
      const todo = {
        id: new Date().getTime(),
        content: newTask,
      }
      newTodos[todo.id] = todo;
      setNewTask('');
      setTodos(newTodos);
      updateLocalStorage('todos', newTodos);

      setMessage('Create task success');
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  }

  const updateLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  }

  const makeTaskDone = (taskId) => {
    const taskDone = todos[taskId];
    const newTodos = {...todos};
    const newDones = {...dones};
    newDones[taskDone.id] = taskDone;
    delete newTodos[taskId];
    setTodos(newTodos);
    updateLocalStorage('todos', newTodos);
    setDones(newDones);
    updateLocalStorage('dones', newDones);

    setMessage('Make done success');
    setTimeout(() => {
      setMessage('');
    }, 3000);
  }

  const removeTask = (taskId) => {
    const newTodos = {...todos};
    delete newTodos[taskId];
    setTodos(newTodos);
    updateLocalStorage('todos', newTodos);

    setMessage('Remove task success');
    setTimeout(() => {
      setMessage('');
    }, 3000);
  }

  return (
    <div className="App">
      <Container>
        <Row>
          <Col></Col>
          <Col xs={8} className='content'>
            <Header title={'Todo list'}/>
            <div>
              <Form.Group controlId="taskname">
                <Form.Control
                  onChange={e => setNewTask(e.target.value)}
                  value={newTask} type="task"
                  placeholder="Enter for add new task..."
                  onKeyPress={handleKeyDown}
                />
              </Form.Group>
              <ListGroup>
                {Object.keys(todos).map((key) => (
                  <Task
                    key={key}
                    task={todos[key]}
                    makeTaskDone={makeTaskDone}
                    removeTask={removeTask}
                  />
                ))}
              </ListGroup>

              {message.length !== 0 ?
                <Alert className='message' variant='success'>{message}</Alert> : null
              }

              <div className='list-done'>
                {Object.keys(dones).map((key) => (
                  <Badge key={key} variant="success">{dones[key].content}</Badge>
                ))}
              </div>
            </div>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
