/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export type Itodo = {
  id: string;
  text: string;
  done: boolean;
  deadline: string;
  isExpired: boolean;
};

let initialTodos: Itodo[] = [];

export const useTodo = () => {
  const [todoState, setTodoState] = useState(initialTodos);
  const [nextIdState, setNextIdState] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [todoState]);

  const getUniqueTodoId = () => {
    setNextIdState(uuidv4());
  };

  const toggleTodo = (id: string) => {
    setTodoState((prevState) => prevState.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
  };

  const removeTodo = (id: string) => {
    setTodoState((prevState) => prevState.filter((todo: Itodo) => todo.id !== id));
  };

  const createTodo = (todo: Itodo) => {
    setTodoState((prevState) =>
      prevState.concat({
        ...todo,
        id: uuidv4(),
      }),
    );
  };

  const loadData = () => {
    setLoading(true);
    let data = localStorage.getItem('todos');
    if (data === undefined) data = '';
    initialTodos = JSON.parse(data!);
    if (initialTodos && initialTodos?.length >= 1) {
      getUniqueTodoId();
    }
    setTodoState(initialTodos);
    setLoading(false);
  };

  const saveData = () => {
    localStorage.setItem('todos', JSON.stringify(todoState));
  };

  return {
    todoState,
    nextIdState,
    toggleTodo,
    removeTodo,
    createTodo,
    loading,
  };
};
