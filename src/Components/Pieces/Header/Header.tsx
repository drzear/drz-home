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
    lightTheme: boolean;
}

class Header extends React.Component<HeaderProps, HeaderState> {
    constructor(props) {
        super(props);
        // similar logic used in ThemeSwitch to determine theme
        const existingTheme = localStorage.getItem("themeState");
        let themeIsLight: boolean;
        if (existingTheme) {
            themeIsLight = existingTheme === "light" ? true : false;
        } else {
            themeIsLight = false;
        }
        this.state = {
            activeLink: this.props.history.location.pathname,
            lightTheme: themeIsLight,
        };
    }
    componentDidMount() {
        // get theme from ThemeSwitch and create boolean to use in variant in jsx
    }
    handleOnClick = (path: string) => {
        this.props.history.push(path);
        this.setState({ activeLink: this.props.history.location.pathname });
    };
    handleThemeOnClick = () => {
        const existingTheme = localStorage.getItem("themeState");
        let themeIsLight: boolean;
        if (existingTheme) {
            themeIsLight = existingTheme === "light" ? true : false;
        } else {
            themeIsLight = false;
        }
        this.setState({
            activeLink: this.state.activeLink,
            lightTheme: themeIsLight,
        });
    };
    render() {
        return (
            <>
                <Navbar
                    collapseOnSelect
                    // bg="dark"
                    variant={this.state.lightTheme ? undefined : "dark"}
                    expand="md"
                    className="navbar"
                >
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
                    <Navbar.Toggle
                        aria-controls="responsive-navbar-nav"
                        // className="navbar-collapse"
                    />
                    <Navbar.Collapse
                        id="responsive-navbar-nav"
                        className="navbar-collapse"
                    >
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
                        <ThemeSwitch
                            onClick={() => this.handleThemeOnClick()}
                        />
                    </Navbar.Collapse>
                </Navbar>
            </>
        );
    }
}

export default withRouter(Header);
