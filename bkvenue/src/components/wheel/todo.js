import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
export const Todo = ({ task, deleteTodo }) => {
  return (
    <div className="Todo mx-auto">
      <div className="text-center fs-3 fw-semibold mx-auto">
        {task.name}
      </div>
      <div className="delbut fs-3 text-white bg-danger px-2 rounded-3">
        <FontAwesomeIcon icon={faTimes} onClick={() => deleteTodo(task.id)} />
      </div>
    </div>
  );
};
