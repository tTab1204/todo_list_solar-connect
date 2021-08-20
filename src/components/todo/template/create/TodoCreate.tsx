import React, { useState } from 'react';
import styled from 'styled-components';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Itodo } from 'components/todo/TodoService';
import { DatePicker } from 'antd';

const CircleButton = styled.button<{ open: boolean }>`
  background: #33bb77;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  left: 50%;
  transform: translate(50%, 0%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  border-bottom: 1px solid #eeeeee;
`;

const InsertForm = styled.form`
  display: flex;
  background: #eeeeee;
  padding-left: 40px;
  padding-top: 36px;
  padding-right: 60px;
  padding-bottom: 36px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #dddddd;
  width: 100%;
  outline: none;
  font-size: 21px;
  box-sizing: border-box;
  color: #119955;
  &::placeholder {
    color: #dddddd;
    font-size: 16px;
  }
`;

interface TodoCreateProps {
  nextId: string;
  createTodo: (todo: Itodo) => void;
}

const TodoCreate = ({ nextId, createTodo }: TodoCreateProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [pickDate, setPickDate] = useState('');

  const handleToggle = () => setOpen(!open);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  const onHandleDate = (date: any, dateString: string) => {
    setPickDate(dateString);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 새로고침 방지

    createTodo({
      id: nextId,
      text: value,
      done: false,
      deadline: pickDate,
    });

    setValue(''); // input 초기화
    setPickDate('');
    setOpen(false); // open 닫기
  };

  return (
    <>
      <InsertFormPositioner>
        <InsertForm onSubmit={handleSubmit}>
          <Input autoFocus placeholder="What's need to be done?" onChange={handleChange} value={value} />
          <DatePicker onChange={onHandleDate} style={{ width: '180px' }} />
          <CircleButton onClick={handleToggle} open={open}>
            <PlusCircleOutlined />
          </CircleButton>
        </InsertForm>
      </InsertFormPositioner>
    </>
  );
};

export default React.memo(TodoCreate);
