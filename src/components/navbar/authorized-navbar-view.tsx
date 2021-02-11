import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Navbar, NavbarBrand, Nav, NavItem, Form, SearchControl, Dropdown } from './navbar-style';
import { SystemState } from '../../store/system/types';

type Props = {

}

export const AuthorizedNavbar = (props: Props) => {
    const systemState: SystemState = useSelector((state: any) => state.system);

    const [windowSize, setWindowSize] = useState(window.innerWidth);
    useEffect(() => {
      window.addEventListener('resize', setSize);
  
      return function cleanup () {
        window.removeEventListener('resize', setSize);
      }
    }, []);

    const mdScreen = windowSize < 768;
  
    const setSize = () => {
      setWindowSize(window.innerWidth)
    }

    return (
        <Navbar expand='md'>
            <Link className="disable-link-style" to="/"><NavbarBrand>PEAM</NavbarBrand></Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto text-right">
                    <Form>
                        <SearchControl type="text" placeholder="Search Peam" className={`form-peam ${mdScreen && 'mt-2'}`} />
                    </Form>
                    <Link to="/new" className="disable-link-style">
                        <NavItem className={`navbar-item ml-2`}>
                            New course
                        </NavItem>
                    </Link>
                    <Dropdown title={systemState.username}>
                        <Dropdown.Item disabled={true}>
                            <span>
                                Signed in as <br /> <strong>{systemState.username}</strong>
                            </span>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link to={"/" + systemState.username} className="link">
                                Your Profile
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link to={"/" + systemState.username + "/courses"} className="link">
                                Your Courses
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link to={"/" + systemState.username + "/settings"} className="link">
                                Settings
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link to="/sign_out">
                                Sign out
                            </Link>
                        </Dropdown.Item>
                    </Dropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
