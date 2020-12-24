import React from 'react';

import { Navbar, Nav, Form, FormControl } from 'react-bootstrap'

import './navbar-style.css';

type Props = {
  color?: 'primary'| 'info' | 'success' | 'warning' | 'danger' | 'dark' | 'rose';
  signIn?: boolean;
  signUp?: boolean;
  search?: boolean;
  hide?: boolean;
  logo?: boolean;
};

const mdScreen = window.innerWidth < 768

const NavbarView = (props: Props) => {
  if(props.hide)
    return <></>

  return (
    <div className='navbar-view'>
      <Navbar className={`navbar ${props.color}`} variant='dark' expand='md'>
        {
          (props.logo || props.logo === undefined) &&
          <Navbar.Brand className='navbar-brand' href="home">PEAM</Navbar.Brand>
        }
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-right">
            <Form>
              {
                (props.search || props.search === undefined) &&
                <FormControl type="text" placeholder="Search Peam" className={`navbar-search ${mdScreen && 'mt-2'}`} />
              }
            </Form>
            {
              (props.signIn || props.signIn === undefined) &&
              <Nav.Link className={`navbar-item ml-2 ${mdScreen && 'mt-1'}`} href="login">Sign in</Nav.Link>
            }
            {
              (props.signUp || props.signUp === undefined) &&
              <Nav.Link className={`navbar-item ml-2 ${!mdScreen && 'mr-5'}`} href="join">Sign up</Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarView
