import React from "react";
import "./Header.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { withRouter } from "react-router-dom";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";

interface HeaderProps {
    history: any;
    onThemeSwitch?: Function;
}

interface HeaderState {
    activeLink: string;
    lightTheme: boolean;
    theme: string;
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
            theme: themeIsLight ? "light" : "dark",
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
        this.setState((state) => {
            return {
                activeLink: state.activeLink,
                lightTheme: themeIsLight,
                theme: themeIsLight ? "light" : "dark",
            };
        });
        if (this.props.onThemeSwitch) {
            this.props.onThemeSwitch(themeIsLight ? "light" : "dark");
        }
    };
    render() {
        return (
            <>
                <Navbar
                    collapseOnSelect
                    variant="dark"
                    expand="md"
                    className="navbar"
                >
                    <Navbar.Brand
                        onClick={() => this.handleOnClick("/")}
                        className="navlink"
                    >
                        DRZ
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
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
                                    (this.state.activeLink === "/dashboards"
                                        ? " active-navlink"
                                        : "")
                                }
                                onClick={() =>
                                    this.handleOnClick("/dashboards")
                                }
                            >
                                Dashboards
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
