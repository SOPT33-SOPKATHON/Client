import { ImgPostitClover, ImgPostitCong, ImgPostitHeart } from '../../assets/icons/icon';
import { PostIt1, PostIt2, PostIt3 } from '../../assets';
import { useEffect, useState } from 'react';

import { LightIcon } from '../../assets';
import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { useParams } from 'react-router-dom';

const getPostItImage = (postNum) => {
  switch (postNum) {
    case 1:
      return PostIt1;
    case 2:
      return PostIt2;
    case 3:
      return PostIt3;
  }
};

const Message = ({ title, content, postTime, postIt }) => {
  console.log('MESSAGE: ' + postIt);
  console.log(typeof postIt);
  return (
    <>
      {postIt === 1 && (
        <MessageBox>
          <Clover />
          <MessageWrapper>
            <Title>{title}</Title>
            <Content>{content}</Content>
            <Date>{postTime}</Date>
          </MessageWrapper>
        </MessageBox>
      )}
      {postIt === 2 && (
        <MessageBox>
          <Cong />
          <MessageWrapper>
            <Title>{title}</Title>
            <Content>{content}</Content>
            <Date>{postTime}</Date>
          </MessageWrapper>
        </MessageBox>
      )}
      {postIt === 3 && (
        <MessageBox>
          <Heart />
          <MessageWrapper>
            <Title>{title}</Title>
            <Content>{content}</Content>
            <Date>{postTime}</Date>
          </MessageWrapper>
        </MessageBox>
      )}
    </>
  );
};

const Main = () => {
  const [congData, setCongData] = useState([]); //개별 쪽지에 대한 정보
  const { uuId } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      console.log(import.meta.env.VITE_BASE_URL);
      try {
        console.log('요청 시작');
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rooms/${uuId}`, {
          header: {
            withCredentals: true,
            'Access-Control-Allow-Origin': '*',
          },
        });
        console.log(response);
        setCongData(response.data.data.celeb_list);
        console.log('응답 데이터', response.data.data);
      } catch (error) {
        console.error('에러:', error);
      }
    };

    fetchUser();
  }, [uuId]);

  return (
    <>
      <Container>
        <AlertText>
          <img src={LightIcon} className="light-icon" alt="라이트아이콘" />
          <MessageCount>{congData.length}개</MessageCount>의 축하노트를 받았어요.
        </AlertText>
        <MessageContainer>
          {congData.map((celeb) => {
            console.log(celeb.post_it);
            return (
              <Message
                key={celeb.celeb_id}
                title={celeb.nickname}
                content={celeb.celeb_content}
                postTime={celeb.post_time}
                postIt={celeb.post_it}
              />
            );
          })}
        </MessageContainer>
      </Container>
    </>
  );
};

export default Main;

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 37.5rem;
  height: auto;
  color: white;
  ${theme.fonts.head2}
`;

const AlertText = styled.div`
  display: flex;
  align-items: center;
  width: auto;
  height: 2.8rem;

  margin-top: 3.3rem;
  margin-left: 1.3rem;
  margin-bottom: 2.3rem;
  color: white;
`;

const MessageCount = styled.span`
  margin-left: 0.2rem;
  color: ${theme.colors.green};
  ${theme.fonts.head2};
`;

const MessageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem 1rem;

  margin: auto 1.6rem;
`;

const MessageWrapper = styled.div`
  position: relative;

  width: 16.6rem;
  height: 20rem;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  z-index: 2;
  /* background-image: ${({ $postIt }) => `url(${getPostItImage($postIt)})`}; */
  background: ${({ $postIt }) => `url(${getPostItImage($postIt)})`};
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  height: 2.2rem;
  margin-top: 1.9rem;
  margin-bottom: 0.1rem;
  ${({ theme }) => theme.fonts.title1};
  color: ${theme.colors.black};
`;

const Content = styled.div`
  width: 11.6rem;
  height: 12rem;
  ${({ theme }) => theme.fonts.body2};
  color: ${theme.colors.black};
`;

const Date = styled.div`
  width: auto;
  height: 1.1rem;
  padding-right: 0;
  text-align: right;

  ${theme.fonts.caption};
  color: ${theme.colors.darkGrey};
`;

const MessageBox = styled.div`
  position: relative;
`;

const Cong = styled(ImgPostitCong)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const Heart = styled(ImgPostitHeart)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const Clover = styled(ImgPostitClover)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;
