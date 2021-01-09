import React from 'react';

import { Navbar, Nav, Form, FormControl } from 'react-bootstrap'
import { Link } from 'react-router-dom';

import './navbar-style.css';

type Props = {
  color?: 'shiny';
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
      <Navbar className={`${props.color} one-edge-shadow`} expand='md'>
        {
          (props.logo || props.logo === undefined) &&
          <Link className="disable-link-style" to="/"><Navbar.Brand> PEAM </Navbar.Brand></Link>
        }
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-right">
            <Form>
              {
                (props.search || props.search === undefined) &&
                <FormControl type="text" placeholder="Search Peam" className={`navbar-search form-peam navbar-item ${mdScreen && 'mt-2'}`} />
              }
            </Form>
            {
              (props.signIn || props.signIn === undefined) &&
              <Link to="/login" className="disable-link-style">
                <Nav.Item className={`navbar-item ml-2 ${mdScreen && 'mt-1'}`}>    
                  Sign in
                </Nav.Item>
              </Link>
            }
            {
              (props.signUp || props.signUp === undefined) &&
              <Link to="/join" className="disable-link-style">
                <Nav.Item className={`navbar-item ml-2 ${!mdScreen && 'mr-5'}`}>
                  Sign up
                </Nav.Item>
              </Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarView
