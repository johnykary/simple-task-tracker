import {useState, useEffect} from 'react';

import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  //Does not work with async 
  useEffect(()=>{
    const getTasks = async() =>{
      const taskFromServer = await fetchTasks()
      setTasks(taskFromServer)
    }
    getTasks()
  }, [])

  //Fetch Tasks
  const fetchTasks = async() =>{
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data;
  }

  const fetchTask = async(id) =>{
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data;
  }

//Add task
const addTask = async(task) =>{
  const res =await fetch(`http://localhost:5000/tasks`, {
    method: 'POST',
    headers:{
      'Content-type': 'application/json'
    },
    body: JSON.stringify(task)
  })

  const data = await res.json();

  setTasks([...tasks, data])
}

//Delete Task
const deleteTask = async(id) =>{

  await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'DELETE'
  })

  setTasks(tasks.filter(task => task.id !== id))
}

//Toggle reminder
const toggleRemider = async (id) => {

  const taskToToggle = await fetchTask(id);
  const updTask = {...taskToToggle, reminder:!taskToToggle.reminder}

  const res = await fetch(`http://localhost:5000/tasks/${id}`,{
    method: 'PUT',
    headers:{
      'Content-type': 'application/json'
    },
    body: JSON.stringify(updTask)
  })

  const data = await res.json();

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
