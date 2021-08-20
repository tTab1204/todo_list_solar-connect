/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

export type Itodo = {
  id: number;
  text: string;
  done: boolean;
  deadline: string;
  isExpired: boolean;
};

let initialTodos: Itodo[] = [];

export const useTodo = () => {
  const [todoState, setTodoState] = useState(initialTodos);
  const [loading, setLoading] = useState(true);

  let nextId = Date.now();

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [todoState]);

  const toggleTodo = (id: number) => {
    setTodoState((prevState) => prevState.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
  };

  const removeTodo = (id: number) => {
    setTodoState((prevState) => prevState.filter((todo: Itodo) => todo.id !== id));
  };

  const createTodo = (todo: Itodo) => {
    setTodoState((prevState) =>
      prevState?.concat({
        ...todo,
        id: nextId,
      }),
    );
  };

  const loadData = () => {
    setLoading(true);
    let data = localStorage.getItem('todos');
    if (data === null) data = '[]';
    initialTodos = JSON.parse(data);

    setTodoState(initialTodos);
    setLoading(false);
  };

  const saveData = () => {
    localStorage.setItem('todos', JSON.stringify(todoState));
  };

  return {
    todoState,
    toggleTodo,
    removeTodo,
    createTodo,
    loading,
    nextId,
  };
};
