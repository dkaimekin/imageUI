import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

const Navigation = ({ selectedImage }) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="sticky-top custom-navigation-bar">
      <Container fluid className="custom-navigation-bar__container">
        <Navbar.Brand className="custom-navigation-bar__branding">
          {/* Use require('./path') in image src due to webpack issue */}
          <img
            src={require("../../Images/zhana-logo.webp")}
            alt="Placeholder Logo"
            height="30"
            className="d-inline-block align-top custom-navigation-bar__brand-logo"
          />{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {selectedImage ? (
              <Nav.Item>
                <NavLink className="nav-link" to="/editor">
                  Editor
                </NavLink>
              </Nav.Item>
            ) : (
              <></>
            )}

            <Nav.Item>
              <NavLink className="nav-link" to="/catalog">
                Catalog
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink className="nav-link" to="/">
                About us
              </NavLink>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
