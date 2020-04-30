import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Redirect } from 'react-router';

class NavbarHeader extends React.Component {
  render(){
    return (
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Application pizza</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/catalogue">Catalogue des pizzas</Nav.Link>
          <Nav.Link href="/livreurs">Liste des livreurs</Nav.Link>
          <Nav.Link href="/quartiers">Liste des quartiers</Nav.Link>
          <Nav.Link href="/commandes">Commandes clients</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Rechercher" className="mr-sm-2" />
          <Button variant="outline-info">Go !</Button>
        </Form>
      </Navbar>
    );
  }
}

export default NavbarHeader;
