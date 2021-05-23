import styled from 'styled-components';

export const Item = styled.div`
  padding: 0.5rem;
  :hover {
    background: #ddd;
  }
`;

export const Text = styled.span`
  color: #1ff;
  font-weight: 400;
  font-family: Inter, 'Roboto', Inconsolata, sans-serif;
  border-radius: 4px;
  font-size: large;
  cursor: pointer;
  transition: all 0.3s;
  :hover {
    color: #1aa !important;
  }
`;

export const ProjectFiles = styled.div`
  clear: both;
  background: #f0f0f0;
  border-radius: 5px;
  -ms-word-break: break-all;
  word-break: break-all;
  word-break: break-word;
  text-align: left;
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  hyphens: auto;
  position: relative;
  box-shadow: 0px 0px 2px black;
`;
