import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Task from './Task';

const TaskManagementSystem = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Fetch tasks for the user's group from the mock API
  useEffect(() => {
    fetch(`http://localhost:5000/tasks?groupId=${user.groupId}`)
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, [user]);
 

 const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return;
    const newTask = {
      title,
      description,
      completed: false,
      groupId: user.groupId, // Hardcoded groupId for simplicity (replace with user's groupId in a real app)
      userId: user.userId, // Hardcoded userId for simplicity (replace with actual user ID in a real app)
    };
     //alert(user.userId);
     //alert(user.groupId);
     //console.log(newTask);
    // Save the new task to the mock API
    fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks([...tasks, data]);
        setTitle('');
        setDescription('');
        toast.success('Task added successfully!');
      });
  };

  const handleComplete = (task) => {
    const updatedTask = { ...task, completed: true };

    // Update the task on the mock API
    fetch(`http://localhost:5000/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedTasks = tasks.map((t) => (t.id === data.id ? data : t));
        setTasks(updatedTasks);
        toast.info('Task marked as completed!');
      });
  };

  const handleIncomplete = (task) => {
    const updatedTask = { ...task, completed: false };

    // Update the task on the mock API
    fetch(`http://localhost:5000/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedTasks = tasks.map((t) => (t.id === data.id ? data : t));
        setTasks(updatedTasks);
        toast.info('Task marked as incomplete!');
      });
  };

  const handleDelete = (task) => {
    // Delete the task from the mock API
    fetch(`http://localhost:5000/tasks/${task.id}`, {
      method: 'DELETE',
    }).then(() => {
      const updatedTasks = tasks.filter((t) => t.id !== task.id);
      setTasks(updatedTasks);
      toast.error('Task deleted!');
    });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(sourceIndex, 1);
    reorderedTasks.splice(destinationIndex, 0, movedTask);
    setTasks(reorderedTasks);
  };

  
 
  return (
    <div className="container taskmanagement">
      <h1 className="center">Welcome, {user.username}!</h1>
      <h2 className="center">Task Management System</h2>
      
        <form id="taskform" onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Title"
        />
        <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Description"
        />
        <button class="btn btn-lg btn-info" type="submit">Add Task</button>
      </form>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <ul class="row" ref={provided.innerRef} {...provided.droppableProps}>
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <Task
                      task={task}
                      onComplete={handleComplete}
                      onIncomplete={handleIncomplete}
                      onDelete={handleDelete}
                      provided={provided}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <ToastContainer />

    </div>
  );
};

export default TaskManagementSystem;
