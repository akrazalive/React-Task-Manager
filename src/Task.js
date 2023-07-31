import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Task = ({ task, onComplete, onIncomplete, onDelete, provided }) => {
  return (
    <Draggable draggableId={task.id} index={provided.draggableProps.index}>
      {(provided) => (
        <li class="col-md-3 col-sm-12"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          {!task.completed ? (
            <button class="btn btn-sm btn-success" onClick={() => onComplete(task)}>Mark as Completed</button>
          ) : (
            <button class="btn btn-sm btn-warning"  onClick={() => onIncomplete(task)}>Mark as Incomplete</button>
          )}
          <button class="btn btn-sm btn-danger" onClick={() => onDelete(task)}>Delete</button>
        </li>
      )}
    </Draggable>
  );
};

export default Task;
