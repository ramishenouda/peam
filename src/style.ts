import styled from 'styled-components';

import deleteIcon from '@material-ui/icons/Delete';

import { Container as container } from 'react-bootstrap';

interface Props {
  color?: string;
  left?: string;
  right?: string;
}

export const GridView = styled.div`
  display: grid;
  padding: 20px;
  grid-template-columns: 70% 25%;
  grid-column-gap: 40px;

  @media only screen and (max-width: 768px) {
    display: block;
  }
`;

export const GridViewRL = styled.div`
  display: grid;
  padding: 20px;
  grid-template-columns: 20% 79%;
  grid-column-gap: 1%;

  @media only screen and (max-width: 768px) {
    display: block;
  }
`;

export const GridViewEQ = styled.div`
  display: grid;
  padding: 20px;
  grid-template-columns: 49% 49%;
  grid-column-gap: 1%;

  @media only screen and (max-width: 768px) {
    display: block;
  }
`;

export const Section = styled.section`
  background: #f9f9f9;
  padding: 10px;
  margin-bottom: auto;
  border-radius: 5px;
`;

export const VerticalGridView = styled(container)`
  display: grid;
  grid-template-columns: 23% 77%;
  grid-column-gap: 20px;
  border-radius: 5px;
  padding: 10px;

  @media only screen and (max-width: 801px) {
    display: block;
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

export const Div = styled.div`
  clear: both;
  background: #f0f0f0;
  border-radius: 5px;
  transition: 0.5s;

  :hover {
    background: #e3e3e3;
  }

  -ms-word-break: break-all;
  word-break: break-all;
  word-break: break-word;

  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  hyphens: auto;
  position: relative;
`;

export const DeleteIcon = styled(deleteIcon)`
  cursor: pointer;
  color: #ca3623;
  :hover {
    color: #ff1111;
  }
`;

export const VerticalCenterdElement = styled.div`
  position: absolute;
  left: ${(props: Props) => (props.left ? props.left : 'initial')};
  right: ${(props: Props) => (props.right ? props.right : 'initial')};
  top: 50%;
  transform: translateY(-50%) !important;
  min-width: fit-content;
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
  min-width: max-content !important;

  margin: 0 20px;

  @media only screen and (max-width: 768px) {
    margin-right: 20px;
    margin-left: 0;
    min-width: fit-content;
  }

  :hover {
    text-decoration: underline #1a1a1a;
  }
`;

export const CodeEditor = styled.pre`
  list-style: none;
  counter-reset: code-editor-counter;
  .line-number {
    background: white !important;
    padding: 2px 0px;
    color: #777;
    font-family: Roboto;
    font-size: 14px;
  }

  ::-webkit-scrollbar {
    width: 0px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  ::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }
`;
