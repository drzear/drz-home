import React from "react";
import "./Header.css";
import logo from "../../../logo.svg";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { withRouter } from "react-router-dom";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";

interface HeaderProps {
    history: any;
}

interface HeaderState {
    activeLink: string;
}

class Header extends React.Component<HeaderProps, HeaderState> {
    constructor(props) {
        super(props);
        this.state = { activeLink: this.props.history.location.pathname };
    }
    handleOnClick = (path: string) => {
        this.props.history.push(path);
        this.setState({ activeLink: this.props.history.location.pathname });
    };
    render() {
        return (
            <>
                <Navbar className="navbar">
                    {/* <Navbar className="navbar"> */}
                    <Navbar.Brand href="/" className="navlink">
                        <img
                            alt="logo"
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top Spinning-logo"
                        />{" "}
                        David Ryne Zear
                    </Navbar.Brand>
                    <Nav className="ml-auto">
                        <Nav.Link
                            className={
                                "navlink" +
                                (this.state.activeLink === "/about"
                                    ? " active-navlink"
                                    : "")
                            }
                            onClick={() => this.handleOnClick("/about")}
                        >
                            About
                        </Nav.Link>
                        <Nav.Link
                            className={
                                "navlink" +
                                (this.state.activeLink === "/cv"
                                    ? " active-navlink"
                                    : "")
                            }
                            onClick={() => this.handleOnClick("/cv")}
                        >
                            Interactive CV
                        </Nav.Link>
                        <Nav.Link
                            className={
                                "navlink" +
                                (this.state.activeLink === "/contact"
                                    ? " active-navlink"
                                    : "")
                            }
                            onClick={() => this.handleOnClick("/contact")}
                        >
                            Contact
                        </Nav.Link>
                        <Nav.Link
                            className={
                                "navlink" +
                                (this.state.activeLink === "/biSamples"
                                    ? " active-navlink"
                                    : "")
                            }
                            onClick={() => this.handleOnClick("/biSamples")}
                        >
                            BI Samples
                        </Nav.Link>
                    </Nav>
                    <ThemeSwitch />
                </Navbar>
            </>
        );
    }
}

export default withRouter(Header);
