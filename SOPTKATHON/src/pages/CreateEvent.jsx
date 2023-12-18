import { useEffect, useState } from 'react';

import axios from 'axios';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
  const [date, setDate] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDetail, setEventDetail] = useState('');

  const dateString = date.toString();
  const celebYear = dateString.slice(0, 4);
  const celebMonth = dateString.slice(5, 7);
  const celebDay = dateString.slice(8, 10);

  const user_id = sessionStorage.getItem('userId');

  const navigate = useNavigate();
  const handleDateChange = (e) => {
    let value = e.target.value;

    // Remove any non-digit characters
    value = value.replace(/\D/g, '');

    // Format the date as dd/mm/yyyy
    if (value.length <= 4) {
      setDate(value);
    } else if (value.length <= 6) {
      setDate(`${value.slice(0, 4)}/${value.slice(4, 6)}`);
    } else {
      setDate(`${value.slice(0, 4)}/${value.slice(4, 6)}/${value.slice(6, 8)}`);
    }
  };

  const handleEventNameChange = (e) => {
    const value = e.target.value.slice(0, 11);
    setEventName(value);
  };

  const handleEventDetailChange = (e) => {
    const value = e.target.value.slice(0, 40);
    setEventDetail(value);
  };

  const register = () => {
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/rooms/create`, {
        user_id: parseInt(user_id),
        room_name: eventName,
        room_content: eventDetail,
        celeb_year: parseInt(celebYear),
        celeb_month: parseInt(celebMonth),
        celeb_day: parseInt(celebDay),
      })
      .then((response) => {
        console.log(response.data);
        navigate('/event-list');
      })
      .catch((error) => {
        console.log('An error occurred:', error.response);
      });
  };

  return (
    <CreateEventWrapper>
      <Header>이벤트 생성</Header>
      <Title>이벤트명</Title>
      <DateInput
        value={eventName}
        onChange={(e) => handleEventNameChange(e)}
        placeholder="이벤트명을 입력해주세요 (11자)"
        inputHeight="4.4rem"
      ></DateInput>
      <Title>이벤트 날짜</Title>
      <DateInput
        value={date}
        onChange={(e) => handleDateChange(e)}
        placeholder="0000/00/00"
        inputHeight="4.4rem"
      ></DateInput>
      <Title>설명</Title>
      <DateTextArea
        value={eventDetail}
        onChange={(e) => handleEventDetailChange(e)}
        placeholder="이벤트 설명을 입력해주세요 (40자)"
      ></DateTextArea>
      <CreateEventButton
        type="submit"
        onClick={() => {
          console.log('register');
          register();
        }}
      >
        이벤트 등록
      </CreateEventButton>
    </CreateEventWrapper>
  );
};

const CreateEventWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
`;

const Header = styled.div`
  margin-top: 5.7rem;
  text-align: center;
  color: ${theme.colors.white};
  ${theme.fonts.head2};
`;

const Title = styled.div`
  ${theme.fonts.title1}
  color: ${theme.colors.white};
`;

const DateInput = styled.input`
  width: 34.3rem;
  padding: 1.5rem;
  background-color: ${theme.colors.blackGrey};
  height: ${({ inputHeight }) => inputHeight};
  border-radius: 1rem;
  border: none;
  color: white;

  resize: none;

  margin-bottom: 2.8rem;
`;

const DateTextArea = styled.textarea`
  width: 34.3rem;
  padding: 1.4rem;
  background-color: ${theme.colors.blackGrey};
  height: 24rem;
  border-radius: 1rem;
  border: none;
  color: white;
  resize: none;

  margin-bottom: 2.8rem;
`;

const CreateEventButton = styled.button`
  width: 34.3rem;
  height: 5.2rem;

  margin-bottom: 0;

  border-radius: 1.2rem;
  ${theme.fonts.title1}
  color: ${theme.colors.black};
  background-color: ${theme.colors.green};
`;

export default CreateEvent;
