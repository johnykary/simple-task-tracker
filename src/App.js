import {useState} from 'react';

import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([
    {
        id: 1,
        text: 'Doctor',
        day: 'Feb 5th at 2:30pm',
        reminder: true
    },
    {
        id: 2,
        text: 'Meeting at school',
        day: 'Feb 6th at 2:30pm',
        reminder: true
    },
    {
        id: 3,
        text: 'Food',
        day: 'Feb 5th at 2:30pm',
        reminder: false
    },
])

//Add task
const addTask = (task) =>{
  const id = Math.floor(Math.random() * 10000) + 1;
  const newTask = {id, ...task}
  setTasks([...tasks, newTask])
}

//Delete Task
const deleteTask = (id) =>{
  setTasks(tasks.filter(task => task.id !== id))
}

//Toggle reminder
const toggleRemider = (id) => {
  setTasks(tasks.map(task => task.id===id ? {...task, reminder: !task.reminder} : task))
}


  return (
    <div className="container">
      <Header title="Hello" onAdd={()=>setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
     {showAddTask && <AddTask onAdd={addTask}/>}
     {tasks.length > 0 ? <Tasks tasks = {tasks} onDelete = {deleteTask} onToggle={toggleRemider}/> : 'No Tasks to Show'}
    </div>
  );
}

export default App;
