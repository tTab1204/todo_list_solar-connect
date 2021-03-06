import { Itodo } from 'components/todo/TodoService';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { CheckOutlined, DeleteOutlined, CalendarOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Modal, Button, Divider } from 'antd';

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
  padding: 12px;

  &:hover {
    background-color: #f0f0f0;
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
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  todo: Itodo;
}

const TodoItem = ({ toggleTodo, removeTodo, todo }: TodoItemProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleToggle = (id: number) => {
    toggleTodo(id);
  };

  const handleRemove = (id: number) => {
    removeTodo(id);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
          <DeleteOutlined onClick={showModal} />
        </Remove>
      </TodoItemBlock>
      <Divider style={{ margin: 0 }} />

      {/* Modal */}
      <Modal
        title={<InfoCircleOutlined style={{ color: 'gray' }} />}
        width={450}
        centered
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            ??????
          </Button>,
          <Button key="submit" type="primary" onClick={() => handleRemove(todo.id)}>
            ??????
          </Button>,
        ]}
      >
        <p>
          {todo.text}
          ???(???) ?????? ?????????????????????????
        </p>
      </Modal>
    </div>
  );
};

export default React.memo(TodoItem);
