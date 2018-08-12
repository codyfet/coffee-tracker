import React from 'react';
import ReactDOM from 'react-dom';

import { Navbar, Nav, NavItem } from 'react-bootstrap';

import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <Navbar inverse>
            <Nav>
                <NavItem eventKey={1} href="#">
                    <Link to='/'>Мой трекер</Link>
                </NavItem>
                <NavItem eventKey={2} href="#">
                    <Link to='/rating'>Рейтинг</Link>
                </NavItem>
            </Nav>
            <Nav pullRight>
                <NavItem eventKey={1} href="#">
                    John Doe
                </NavItem>
            </Nav>
        </Navbar>
    )
}