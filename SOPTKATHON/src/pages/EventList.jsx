import { PlusBtn, SmallLogo } from '../assets/icons/icon';
import React, { useEffect, useState } from 'react';

import EventItem from '../components/createEvent/EventItem';
import { client } from '../apis/client';
import styled from 'styled-components';
import { Navigate,useNavigate } from 'react-router-dom';


const EventList = () => {
  const [data, setData] = useState();
  const userId = 3; //session
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const { data } = await client.post(`/rooms`, {
        user_id: userId,
      });
      console.log(data);
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePlusBtn = () => {
    navigate(`/create-event`);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <EventListWrapper>
      <SmallLogoIcon />
      <HeadText>{data?.data.user_nickname} 님의 이벤트 </HeadText>
      <EventListContainer>
        {data?.data.room_list.length > 0 ? (
          data?.data.room_list.map((item) => (
            <EventItem title={item.room_name} date={item.time} key={item.room_id} onClick={useNavigate('./rooms/{room_uuid}')}></EventItem>

          ))
        ) : (
          <EmptyEventWrapper>아직 생성한 이벤트가 없어요.</EmptyEventWrapper>
        )}
      </EventListContainer>

      <BtnWrapper>
        {' '}
        <PlusBtn onClick={handlePlusBtn}></PlusBtn>
      </BtnWrapper>
    </EventListWrapper>
  );
};

export default EventList;

const EventListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  width: 100%;
`;

const SmallLogoIcon = styled(SmallLogo)`
  margin-left: 0.8rem;
  margin-top: 5.6rem;
`;

const HeadText = styled.h1`
  ${({ theme }) => theme.fonts.head1};
  margin-top: 2.7rem;
`;

const EventListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  justify-content: center;
  gap: 1.2rem;
  margin-top: 3rem;
`;

const EmptyEventWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 62.8rem;
  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.mediumGrey};
`;

// const PlusBtnIc=styled(PlusBtn)`

// `
const BtnWrapper = styled.div`
  width: 100%;

  position: fixed;
  bottom: 2.5rem;
  left: 78rem;
  z-index: 1;

  cursor: pointer;
`;
