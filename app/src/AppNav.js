import React, { Component } from 'react';
import {Nav,Navbar,NavItem,NavbarBrand, NavLink} from 'reactstrap';
import {Navigate} from 'react-router-dom';
import Logo from './Img/webLogo.png'
import { ReactSession } from 'react-client-session';

class AppNav extends Component {
    state = {  }

    constructor(){
      super();
      this.deleteSession= this.deleteSession.bind(this);

    } 

    deleteSession() {
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('role');
      sessionStorage.removeItem('email');
      
    }

    render() {

      if(ReactSession.get('role') === 'admin') {
        return (
          <div>
            <Navbar color="dark" dark expand="md">
              <NavbarBrand href="/adminHome"><img src={Logo} alt="Logo" height="90px"/></NavbarBrand>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink href="/categories">Categorías</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/expenses">Gastos</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#">Cerrar sesión</NavLink>
                  </NavItem>
                </Nav>
            </Navbar>
          </div>
        );
      }
      if(ReactSession.get('role') === 'user') {
        return (
          <div>
            <Navbar color="dark" dark  expand="md">
              <NavbarBrand href="/userHome"><img src={Logo} alt="Logo" height="90px"/>Bienvenid@ {ReactSession.get('user')}</NavbarBrand>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink href="/expenses">Mis gastos</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#" onClick={this.deleteSession}>Cerrar sesión</NavLink>
                  </NavItem>
                </Nav>
            </Navbar>
          </div>
        );
      }
      else {
        return (
          <div>
            <Navbar color="dark" dark  expand="md">
              <NavbarBrand href="/"><img src={Logo} alt="Logo" height="90px"/></NavbarBrand>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink href="/categories">Categorías</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/expenses">Mis gastos</NavLink>
                  </NavItem>
                </Nav>
            </Navbar>
          </div>
        );
      }
          

    }
}
 
export default AppNav;