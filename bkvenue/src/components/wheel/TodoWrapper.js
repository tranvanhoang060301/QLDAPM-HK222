import React, { useEffect, useState } from "react";
import { Todo } from "./todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";
import "./base.css";

export const TodoWrapper = ({ active, optionList, onOptionItemChange}) => {
  const [optionItem, setOptionItem] = useState([]);

  useEffect(() => {
    setOptionItem(optionList);
  }, [optionList]);

  console.log(optionList);
  const addTodo = (todo) => {
    setOptionItem([...optionItem, { id: uuidv4(), name: todo, completed: false, isEditing: false }]);
  };

  const deleteTodo = (id) => {
    setOptionItem(optionItem.filter((todo) => todo.id !== id));
    onOptionItemChange(id);
  }
  console.log(optionItem.map(item => item.name));

  return (
    <div className="TodoWrapper">
      <h1 className="fs-3">BẠN MUỐN ĂN GÌ ?</h1>
      {active === "whatever" ? (
        <>
          <TodoForm addTodo={addTodo} />
          {/* display todos */}
          {optionItem.map((todo) =>
            todo.isEditing ? <EditTodoForm task={todo} /> : <Todo key={todo.id} task={todo} deleteTodo={deleteTodo} />
          )}
        </>
      ) : (
        <>
          {optionItem.map((todo) =>
            todo.isEditing ? <EditTodoForm task={todo} /> : <Todo key={todo.id} task={todo} deleteTodo={deleteTodo} />
          )}
        </>
      )}
    </div>
  );
};
