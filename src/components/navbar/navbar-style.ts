import styled, { css } from 'styled-components';

import {
  Navbar as navbar,
  Nav as nav,
  Form as form,
  FormControl as formControl,
  NavDropdown,
} from 'react-bootstrap';

import { Link } from 'react-router-dom';

export const Navbar = styled(navbar)`
  overflow-x: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }

  width: 100%;
  -webkit-box-shadow: 0 4px 6px -6px black;
  -moz-box-shadow: 0 4px 6px -6px black;
  box-shadow: 0 3px 5px -5px black;
`;

export const AuthorizedNavbarStyle = styled(navbar)`
  width: 100%;
  -webkit-box-shadow: 0 4px 6px -6px black;
  -moz-box-shadow: 0 4px 6px -6px black;
  box-shadow: 0 3px 5px -5px black;
`;

export const NavbarBrand = styled(navbar.Brand)`
  padding-left: 1.5vw !important;
  padding-right: 1.5vw !important;
  margin: 0;
  font-weight: 500;
  position: absolute;
  top: -25px;
  left: 0;

  font-family: 'Inter', sans-serif;
  color: black !important;
`;

export const Form = styled(form)``;

const NavItemStyle = css`
  font-weight: 400;
  font-family: Inter, 'Roboto', Inconsolata, sans-serif;
  border-radius: 4px;
  font-size: larger;
  display: block;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s;
`;

export const SearchControl = styled(formControl)`
  ${NavItemStyle}
  box-shadow: none !important;
  outline: none !important;
  color: #424242 !important;
  background-color: white !important;
  cursor: text;

  :focus,
  :active {
    margin-right: 6rem !important;
    outline: none !important;
    box-shadow: 0px 16px 12px -20px black !important;
  }
`;

export const NavItem = styled(nav.Item)`
  ${NavItemStyle}
  :hover {
    -webkit-box-shadow: 0 3px 5px -5px black;
    -moz-box-shadow: 0 3px 5px -5px black;
    box-shadow: 0px 16px 12px -20px black;
  }
`;

export const NewCourse = styled(Link)`
  ${NavItemStyle}
  position: absolute;
  right: 70px;
  top: -5px;
  :hover {
    -webkit-box-shadow: 0 3px 5px -5px black;
    -moz-box-shadow: 0 3px 5px -5px black;
    box-shadow: 0px 16px 12px -20px black;
  }
`;

export const Dropdown = styled(NavDropdown)`
  font-weight: 300;
  font-family: Inter, 'Roboto', Inconsolata, sans-serif;
  border-radius: 4px;
  font-size: larger;
  .dropdown-menu {
    right: 0;
    left: auto;
  }
`;

export const Nav = styled(nav)``;
