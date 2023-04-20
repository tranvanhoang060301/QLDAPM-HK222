import React, { useEffect, useState } from "react";
import { Todo } from "./todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";
import "./base.css";

export const TodoWrapper = ({ active, optionList }) => {
  const [todos, setTodos] = useState([]);
  const [optionItem, setOptionItem] = useState([]);

  useEffect(() => {
    const tmp = [];
    optionList.map((item) => {
      tmp.push({
        id: uuidv4(),
        name: item,
        completed: false,
        isEditing: false,
      });
    });
    setOptionItem(tmp);
  }, []);

  const addTodo = (todo) => {
    setTodos([...todos, { id: uuidv4(), name: todo, completed: false, isEditing: false }]);
  };

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const editTodo = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo)));
  };

  const editTask = (task, id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo)));
  };

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
