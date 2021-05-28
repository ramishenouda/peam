import styled from 'styled-components';

import { Navbar as navbar } from 'react-bootstrap';

export const Container = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: 70% 25%;
  grid-column-gap: 40px;

  @media only screen and (max-width: 768px) {
    display: block;
    text-align: center;
  }
`;

export const Title = styled.h1`
  font-family: 'Inter', 'Roboto', 'sans-serif', Tahoma, Geneva, Verdana,
    sans-serif;
  font-weight: 500;
`;

export const Description = styled.h6`
  font-family: 'Roboto', 'sans-serif';
  white-space: pre-wrap;
`;

export const Navbar = styled(navbar)`
  padding: 0 5vw 1.1vh 5vw;
  overflow-x: scroll;
  margin: 0 auto;
  text-align: center;
  padding-right: 100px !important;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export const Separator = styled.div`
  background: #cacaca;
  box-shadow: 0px 0px 1px #e2e2e2;
`;
