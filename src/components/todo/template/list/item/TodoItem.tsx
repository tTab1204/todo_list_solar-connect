import { Itodo } from 'components/todo/TodoService';
import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { CheckOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import { Divider } from 'antd';

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #119955;
  font-size: 16px;
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;

const CheckCircle = styled.div<{ done: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 16px;
  border: 1px solid #33bb77;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 1px solid #dddddd;
      color: #dddddd;
    `}
`;

const Text = styled.div<{ done: boolean }>`
  font-size: 16px;
  font-weight: 500;
  color: #119955;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
      text-decoration: line-through;
    `}
`;

const ContentBox = styled.div`
  display: block;
  flex: 1;
`;

const DateBox = styled.div<{ isExpired: boolean }>`
  font-size: 12px;
  font-weight: 500;
  color: ${({ isExpired }) => (isExpired ? '#f5222d' : '#ad6800')};
`;

interface TodoItemProps {
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  todo: Itodo;
}

const TodoItem = ({ toggleTodo, removeTodo, todo }: TodoItemProps) => {
  const handleToggle = (id: string) => {
    toggleTodo(id);
  };

  const handleRemove = (id: string) => {
    removeTodo(id);
  };

  return (
    <div>
      <TodoItemBlock>
        <CheckCircle done={todo.done} onClick={() => handleToggle(todo.id)}>
          {todo.done && <CheckOutlined />}
        </CheckCircle>
        <ContentBox>
          <Text done={todo.done}>{todo.text}</Text>

          <DateBox isExpired={todo.isExpired}>
            {todo.deadline && <CalendarOutlined style={{ marginRight: '0.3rem' }} />}
            {todo.deadline}
          </DateBox>
        </ContentBox>

        <Remove>
          <DeleteOutlined onClick={() => handleRemove(todo.id)} />
        </Remove>
      </TodoItemBlock>
      <Divider style={{ margin: 0 }} />
    </div>
  );
};

export default React.memo(TodoItem);
