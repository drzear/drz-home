import React from "react";
import Home from "../Components/Pages/Home/Home";
import About from "../Components/Pages/About/About";
import BiSamples from "../Components/Pages/BiSamples/BiSamples";
import Contact from "../Components/Pages/Contact/Contact";
import CV from "../Components/Pages/CV/CV";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Header from "../Components/Pieces/Header/Header";

interface Props {
    onThemeClick: Function;
}

interface State {
    theme: string;
}

class MyRouter extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        let themeForState: string;
        const existingTheme = localStorage.getItem("themeState");
        if (existingTheme) {
            themeForState = existingTheme;
        } else {
            themeForState = "dark";
        }
        this.state = {
            theme: themeForState,
        };
    }
    handleThemeClick = (themeInput: string) => {
        this.setState({
            theme: themeInput,
        });
    };
    render() {
        return (
            <>
                <BrowserRouter basename="/">
                    <Switch>
                        <Route
                            exact
                            path="/about"
                            render={(props) => (
                                <DefaultContainer
                                    {...props}
                                    onThemeSwitch={this.handleThemeClick}
                                    theme={this.state.theme}
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/dashboards"
                            render={(props) => (
                                <DefaultContainer
                                    {...props}
                                    onThemeSwitch={this.handleThemeClick}
                                    theme={this.state.theme}
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/cv"
                            render={(props) => (
                                <DefaultContainer
                                    {...props}
                                    onThemeSwitch={this.handleThemeClick}
                                    theme={this.state.theme}
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/contact"
                            render={(props) => (
                                <DefaultContainer
                                    {...props}
                                    onThemeSwitch={this.handleThemeClick}
                                    theme={this.state.theme}
                                />
                            )}
                        />
                        <Route exact path="/home" component={HomeContainer} />
                        <Route exact path="/" component={HomeContainer} />
                        <Route>
                            <Redirect to="/" />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </>
        );
    }
}

const HomeContainer = () => (
    <>
        <Route exact path="/home" component={Home} />
        <Route path="/" component={Home} />
    </>
);

const DefaultContainer = (props) => (
    <>
        <Header onThemeSwitch={props.onThemeSwitch} />
        <Route exact path="/about" component={About} />
        <Route
            exact
            path="/dashboards"
            render={(routerProps) => (
                <BiSamples {...routerProps} theme={props.theme} />
            )}
        />
        <Route exact path="/cv" component={CV} />
        <Route exact path="/contact" component={Contact} />
    </>
);

export default MyRouter;
