import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { SystemState } from '../../store/system/types';

import PeamLogo from 'assets/peam-logo.png';

import {
  AuthorizedNavbarStyle,
  NavbarBrand,
  Nav,
  NavItem,
  Form,
  SearchControl,
  Dropdown,
  NewCourse,
} from './navbar-style';

type Props = {};

export const AuthorizedNavbar = (props: Props) => {
  const systemState: SystemState = useSelector((state: any) => state.system);

  const [windowSize, setWindowSize] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', setSize);

    return function cleanup() {
      window.removeEventListener('resize', setSize);
    };
  }, []);

  const mdScreen = windowSize < 768;

  const setSize = () => {
    setWindowSize(window.innerWidth);
  };

  if (!mdScreen) {
    return (
      <AuthorizedNavbarStyle expand="md" className="bg-g-gray">
        <Link className="disable-link-style" to="/">
          <NavbarBrand>
            <img width="100px" height="100px" src={PeamLogo} alt="peam logo" />
          </NavbarBrand>
        </Link>
        <AuthorizedNavbarStyle.Toggle aria-controls="basic-navbar-nav" />
        <AuthorizedNavbarStyle.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-right">
            <Form>
              <SearchControl
                type="text"
                placeholder="Search Peam"
                className={`form-peam ${mdScreen && 'mt-2'}`}
              />
            </Form>
            <Link to="/new" className="disable-link-style">
              <NavItem className={`ml-2`}>New course</NavItem>
            </Link>
            <Dropdown
              title={systemState.name ? systemState.name : systemState.username}
            >
              <Dropdown.Item disabled={true}>
                <span>
                  Signed in as <br /> <strong>{systemState.username}</strong>
                </span>
                <hr />
              </Dropdown.Item>
              <Link to={'/user/profile'} className="link dropdown-item mb-1">
                Your Profile
              </Link>
              {/* <Link to={"/user/courses"} className="link dropdown-item">
                                Your Courses
                            </Link>
                            <Link to={"/user/settings"} className="link dropdown-item">
                                Settings
                            </Link> */}
              <Link to="/logout" className="link dropdown-item">
                Sign out
              </Link>
            </Dropdown>
          </Nav>
        </AuthorizedNavbarStyle.Collapse>
      </AuthorizedNavbarStyle>
    );
  } else {
    return (
      <AuthorizedNavbarStyle expand="md">
        <NewCourse to="/new" className="disable-link-style">
          <NavItem className={``}>New course</NavItem>
        </NewCourse>
        <Link className="disable-link-style" to="/">
          <NavbarBrand>
            <img width="100px" height="100px" src={PeamLogo} alt="peam logo" />
          </NavbarBrand>
        </Link>
        <AuthorizedNavbarStyle.Toggle aria-controls="basic-navbar-nav" />
        <AuthorizedNavbarStyle.Collapse id="basic-navbar-nav">
          <Nav className="text-right f3">
            <Form>
              <SearchControl
                type="text"
                placeholder="Search Peam"
                className={`form-peam ${mdScreen && 'mt-2'}`}
              />
            </Form>
            <NavItem>
              <span>
                Signed in as <br /> <strong>{systemState.username}</strong>
              </span>
            </NavItem>
            <hr />
            <NavItem>
              <Link to={'/user/profile'} className="disable-link-style">
                Your Profile
              </Link>
            </NavItem>

            {/* <NavItem>
                            <Link to={"/user/courses"} className="disable-link-style">
                                Your Courses
                            </Link>
                        </NavItem>

                        <NavItem>
                            <Link to={"/user/settings"} className="disable-link-style">
                                Settings
                            </Link>
                        </NavItem> */}
            <NavItem>
              <Link to="/logout" className="disable-link-style">
                Sign out
              </Link>
            </NavItem>
          </Nav>
        </AuthorizedNavbarStyle.Collapse>
      </AuthorizedNavbarStyle>
    );
  }
};
