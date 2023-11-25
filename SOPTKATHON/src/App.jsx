import Router from './Router';
import styled from 'styled-components';
import { useEffect } from 'react';
function App() {
  const setScreenSize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    const maxWidth = Math.min(37.5, windowWidth);
    document.documentElement.style.setProperty('--app-max-width', `${maxWidth}rem`);
  };

  useEffect(() => {
    setScreenSize();
    window.addEventListener('resize', setScreenSize);

    return () => {
      window.removeEventListener('resize', setScreenSize);
    };
  }, []);
  return (
    <>
      <MobileWrapper>
        <Router></Router>
      </MobileWrapper>
    </>
  );
}

export default App;

const MobileWrapper = styled.div`
  display: flex;

  position: relative;
  flex-direction: column;
  align-items: center;

  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.mainBlack};
  color: ${({ theme }) => theme.colors.mainWhite};
  padding-right: 1.6rem;
  padding-left: 1.6rem;

  max-width: var(--app-max-width, 37.5rem);
  min-height: calc(var(--vh, 1vh) * 100);
`;
