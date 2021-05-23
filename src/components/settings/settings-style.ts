import styled, { css } from 'styled-components';

import {
  Container as container,
  Navbar as navbar,
  Form as form,
} from 'react-bootstrap';

export const Container = styled(container)`
  font-family: 'Roboto', sans-serif;
`;

export const Navbar = styled(navbar)`
  overflow-x: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  border-bottom: solid 1px #ddd;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const NavItem = styled.div`
  padding-bottom: 5px;
  font-family: Inconsolata;
  text-decoration: none #fff;
  color: #1a1a1a !important;
  font-size: x-large;
  text-underline-offset: 19px;
  cursor: pointer;
  transition: all 0.3s ease-in-out !important;
  display: inline-flex !important;
  margin: 0 auto;

  @media only screen and (max-width: 768px) {
    margin: 0 20px !important;
  }

  :hover {
    text-decoration: underline #1a1a1a;
  }
`;

const style = css`
  font-family: 'Inter', sans-serif;
`;

export const Title = styled.div`
  ${style}
  padding-top: 10px;
`;

export const Description = styled.div`
  ${style}
  padding-bottom: 10px;
`;

export const Form = styled(form)`
  margin: 0 auto;
  max-width: 720px;
  padding: 5vh 5vw 0 5vw;
`;
