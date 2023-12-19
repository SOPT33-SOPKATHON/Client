import { PlusBtn, SmallLogo } from '../assets/icons/icon';
import React, { useEffect, useState } from 'react';

import EventItem from '../components/createEvent/EventItem';
import { client } from '../apis/client';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const EventList = () => {
  const [data, setData] = useState();
  const id = sessionStorage.getItem('userId'); //session
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const { data } = await client.post(`/rooms`, {
        user_id: id,
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
    console.log(data);
  }, []);

  return (
    <EventListWrapper>
      <SmallLogoIcon />
      <HeadText>{data?.data.user_nickname} 님의 이벤트 </HeadText>
      <EventListContainer>
        {data?.data.room_list.length > 0 ? (
          data?.data.room_list.map((item) => (
            <EventItem title={item.room_name} date={item.time} key={item.room_id} roomId={item.room_uuid}></EventItem>
          ))
        ) : (
          <EmptyEventWrapper>아직 생성한 이벤트가 없어요.</EmptyEventWrapper>
        )}
      </EventListContainer>
      <BtnWrapper>
        <PlusBtnIc onClick={handlePlusBtn}></PlusBtnIc>
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

const PlusBtnIc = styled(PlusBtn)``;
const BtnWrapper = styled.div`
  position: fixed;

  width: 34.3rem;
  height: 6rem;
  bottom: 3rem;
  display: flex;
  justify-content: end;
  cursor: pointer;
`;
