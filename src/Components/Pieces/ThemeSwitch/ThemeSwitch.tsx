import React from "react";
import Form from "react-bootstrap/Form";
import "./ThemeSwitch.css";

interface ThemeProps {
    onClick: Function;
}

interface ThemeState {
    themeState: string;
    themeLabel: string;
    checkedBool: boolean;
}

export default class ThemeSwitch extends React.Component<
    ThemeProps,
    ThemeState
> {
    constructor(props) {
        super(props);
        let themeForState: string;
        let labelForState: string;
        let checkedBoolForState: boolean;

        const existingTheme = localStorage.getItem("themeState");
        if (existingTheme) {
            themeForState = existingTheme;
            checkedBoolForState = themeForState === "light" ? false : true;
        } else {
            themeForState = "dark";
            checkedBoolForState = false;
        }
        labelForState = themeForState === "light" ? "🔌" : "💡";
        this.state = {
            themeState: themeForState,
            themeLabel: labelForState,
            checkedBool: checkedBoolForState,
        };
        localStorage.setItem("themeState", this.state.themeState);
        document.body.classList.add(this.state.themeState);
    }
    handleThemeClick = () => {
        const oldThemeState = this.state.themeState.repeat(1); // copy string (not reference)
        const themeState = this.state.themeState === "light" ? "dark" : "light";
        const themeLabel = themeState === "light" ? "🔌" : "💡";
        const checkedBool = themeState === "light" ? false : true;
        this.setState({
            themeState: themeState,
            themeLabel: themeLabel,
            checkedBool: checkedBool,
        });
        localStorage.setItem("themeState", themeState);
        document.body.classList.replace(oldThemeState, themeState);
        this.props.onClick();
    };
    render() {
        return (
            <Form className="switchForm">
                <Form.Check
                    type="switch"
                    id="light-switch"
                    className="custom-switch"
                    // label={this.state.themeLabel}
                    label=""
                    onClick={this.handleThemeClick}
                    checked={this.state.checkedBool}
                    readOnly
                />
            </Form>
        );
    }
}
