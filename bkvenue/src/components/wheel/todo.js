import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
export const Todo = ({ task, deleteTodo }) => {
  return (
    <div className="Todo">
      <p>
        {task.name}
      </p>
      <div>
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(task.id)} />
      </div>
    </div>
  );
};
