import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';

const TodoHeadBlock = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 52px;
  padding-bottom: 24px;
  border-bottom: 3px solid #33bb77;
`;

const DayText = styled.div`
  font-size: 22px;
  color: #119955;
  padding-top: 5px;
`;

const DateText = styled.div`
  font-size: 26px;
  color: #119955;
  padding-left: 10px;
  padding-right: 10px;
`;

export const TimeText = styled.div`
  font-size: 26px;
  color: #119955;
  padding-left: 10px;
`;

const TodoHead = () => {
  let timer: any = null;
  const [time, setTime] = useState(moment());

  useEffect(() => {
    timer = setInterval(() => {
      setTime(moment());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dayString = time.format('LLLL').slice(0, 9);
  const dateString = time.format('LL');
  const timeString = time.format('LTS');

  return (
    <TodoHeadBlock>
      <DayText>{dayString}</DayText>
      <DateText>{dateString}</DateText>
      <TimeText>{timeString}</TimeText>
    </TodoHeadBlock>
  );
};

export default React.memo(TodoHead);
