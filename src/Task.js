import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Task = ({ task, onComplete, onIncomplete, onDelete, provided }) => {
  return (
    <Draggable draggableId={task.id} index={provided.draggableProps.index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          {!task.completed ? (
            <button onClick={() => onComplete(task)}>Mark as Completed</button>
          ) : (
            <button onClick={() => onIncomplete(task)}>Mark as Incomplete</button>
          )}
          <button onClick={() => onDelete(task)}>Delete</button>
        </li>
      )}
    </Draggable>
  );
};

export default Task;
