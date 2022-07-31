import React, {useState} from "react";
import {Navbar, Nav, Container, Button, Form} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import "./Navigation.css";
import {UploadForm} from "./UploadForm";


const Navigation = ({selectedImage}) => {

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="sticky-top custom-navigation-bar">
            <Container fluid className="custom-navigation-bar__container">
                <Navbar.Brand className="custom-navigation-bar__branding">
                    {/* Use require('./path') in image src due to webpack issue */}
                    <a href="//zhana-aygerim.kz/">
                        <img
                            src={require("../../Images/zhana-logo.webp")}
                            height="30"
                            className="d-inline-block align-top custom-navigation-bar__brand-logo"
                        />{" "}
                    </a>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {selectedImage ? (
                            <Nav.Item>
                                <NavLink className="nav-link" to="/editor"> Редактор
                                </NavLink>
                            </Nav.Item>
                        ) : (
                            <></>
                        )}

                        <Nav.Item>
                            <NavLink className="nav-link" to="/catalog">
                                Каталог
                            </NavLink>
                        </Nav.Item>
                    </Nav>
                    <Nav>
                        {/*<Form.Control type="file" size="sm"/>*/}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
