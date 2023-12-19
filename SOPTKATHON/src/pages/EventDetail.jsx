import { Navigate, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import Header from '../components/EventDetail/Header';
import Main from '../components/EventDetail/Main';
import MainNone from '../components/EventDetail/MainNone';
import { WriteButton } from '../assets';
import axios from 'axios';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

export const EventDetail = () => {
  const [detailData, setDetailData] = useState([]);
  const { uuId } = useParams();
  const navigate = useNavigate();

  const handleCreateMessage = () => {
    navigate(`/create-message/${uuId}`);
  };

  useEffect(() => {
    const fetchUser = async () => {
      console.log(import.meta.env.VITE_BASE_URL);
      try {
        console.log('요청 시작~!');
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rooms/${uuId}`, {
          header: {
            withCredentals: true,
            'Access-Control-Allow-Origin': '*',
          },
        });
        console.log('응답 데이터', response);
        setDetailData(response.data.data);
      } catch (error) {
        console.error('에러:', error);
      }
    };

    fetchUser();
  }, [uuId]);

  return (
    <div>
      {/* 헤더(시작합니다까지 투명)
    main(안에 받았어요(messageHeader) 그 다음에 포스팃 나열 Flex) */}
      <Header />
      {detailData.celeb_num ? <Main /> : <MainNone />}
      <FixedButton src={WriteButton} alt="Write Button" onClick={handleCreateMessage} />
    </div>
  );
};

export default EventDetail;

const FixedButton = styled.img`
  position: fixed;
  bottom: 2.5rem;
  right: 1.5rem;
  z-index: 3;
`;
