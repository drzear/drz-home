import React from "react";
import Home from "../Components/Pages/Home/Home";
import About from "../Components/Pages/About/About";
import BiSamples from "../Components/Pages/BiSamples/BiSamples";
import Contact from "../Components/Pages/Contact/Contact";
import CV from "../Components/Pages/CV/CV";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Header from "../Components/Pieces/Header/Header";

class MyRouter extends React.Component {
    render() {
        return (
            <>
                <BrowserRouter basename="/">
                    <Switch>
                        <Route
                            exact
                            path="/about"
                            component={DefaultContainer}
                        />
                        <Route
                            exact
                            path="/biSamples"
                            component={DefaultContainer}
                        />
                        <Route exact path="/cv" component={DefaultContainer} />
                        <Route
                            exact
                            path="/contact"
                            component={DefaultContainer}
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

const DefaultContainer = () => (
    <>
        <Header />
        <Route exact path="/about" component={About} />
        <Route exact path="/biSamples" component={BiSamples} />
        <Route exact path="/cv" component={CV} />
        <Route exact path="/contact" component={Contact} />
    </>
);

export default MyRouter;
