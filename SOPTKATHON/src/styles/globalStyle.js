import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

* {
  box-sizing: border-box;
  font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;


}


  html, body {
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
letter-spacing: -2%;
line-height: 140%;

  margin: 0 auto;
   background-color: ${({ theme }) => theme.colors.mainBlack};
  font-size: 62.5%;
  }

a {
cursor: pointer;

text-decoration: none;
color:inherit;
}


button {
border: none;
background: none;
  cursor: pointer;
font: inherit;
}

select{
  cursor: pointer;
}
`;

export default GlobalStyle;
