import styled from 'styled-components';

import { Container as container, Navbar as navbar } from 'react-bootstrap';

export const Container = styled(container)`
  display: grid;
  grid-template-columns: 23% 77%;
  grid-column-gap: 20px;
  border-radius: 5px;
  padding: 10px;

  ${({ mdscreen }) =>
    mdscreen &&
    `
    display: block;
  `}
`;

export const Section = styled.section`
  background: #f9f9f9;
  padding: 10px;
  margin-bottom: auto;
  border-radius: 5px;
`;

export const NavContainer = styled.div`
  overflow: hidden;
  position: relative;
  transition: all 0.5s ease;
`;

export const Navbar = styled(navbar)`
  overflow-x: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  display: block !important;
  border-radius: 5px;
  height: fit-content;
  background: #f9f9f9;
  transition: all 0.5s ease;

  ${({ hidden }) =>
    hidden &&
    `
      position: absolute;
      right: -50px;
    `}

  padding: 10px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Separator = styled.div`
  border-width: 1px;
  border-color: #949494;
  border-style: solid;
`;

export const NavItem = styled.div`
  font-family: Roboto, Inconsolata, sans-serif;
  text-decoration: none #fff;

  color: #1a1a1a;
  font-size: larger;
  text-underline-offset: 13px;
  cursor: pointer;
  transition: all 0.3s ease-in-out !important;
  border-radius: 5px;
  :hover {
    background: #f1f1f1;
  }

  ${({ color }) =>
    color &&
    `
        color: ${color}
    `}
`;

export const ToggleButton = styled.div`
  border: 1px solid #949494;
  border-radius: 50px;
  position: absolute;
  background: #f1f1f1;
  cursor: pointer;
  z-index: 1000 !important;
  right: -10px;
  top: -10px;
  ${({ hidden }) =>
    hidden &&
    `
    display: inline !important;
    border: none;
    width: 27px;
    left: 0;
    `}
`;
