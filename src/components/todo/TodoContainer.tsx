import React from 'react';
import { useTodo } from './TodoService';
import TodoTemplate from './template/TodoTemplate';
import TodoHead from './template/head/TodoHead';
import TodoList from './template/list/TodoList';
import TodoCreate from './template/create/TodoCreate';
import TodoFooter from './template/footer/TodoFooter';
import Loading from 'components/common/Loading';

const TodoContainer = () => {
  const { todoState, nextId, toggleTodo, removeTodo, createTodo, loading } = useTodo();

  return (
    <>
      {loading && <Loading size="large" />}
      {!loading && (
        <TodoTemplate>
          <TodoHead />
          <TodoCreate nextId={nextId} createTodo={createTodo} />
          <TodoList toggleTodo={toggleTodo} removeTodo={removeTodo} todos={todoState} />
          <TodoFooter todos={todoState} />
        </TodoTemplate>
      )}
    </>
  );
};

export default TodoContainer;
